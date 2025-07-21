// blog.js

import { renderPost, renderBlogPage } from './render.js';
import { filterXSS } from 'xss';
import { handleAdminRequest } from './admin.js';
import { renderLoginForm, renderTemplate } from './templates.js';
import { verifyPassword } from './auth.js';
import { createJWT, verifyJWT } from './jwt.js';
import { darkMinCSS, lightMinCSS } from './styles.js';
import { marked } from 'marked';
import { parseCookies } from './utils.js';
import { escapeHtml } from './utils.js';
import { hashPassword } from './auth.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;

    // Serve Dark CSS
    if (pathname === '/styles/dark_min.css') {
      return new Response(darkMinCSS, {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=3600'
        },
      });
    }

    // Serve Light CSS
    if (pathname === '/styles/light_min.css') {
      return new Response(lightMinCSS, {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=3600'
        },
      });
    }

    // Add default theme route (for initial load)
    if (pathname === '/styles/theme.css') {
      // Default to dark theme
      return new Response(darkMinCSS, {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=3600'
        },
      });
    }

    // Serve Login Page
    if (pathname === '/login' && method === 'GET') {
      return new Response(renderLoginForm(), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Handle Login Submission
    if (pathname === '/login' && method === 'POST') {
      try {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        const userRecord = await env.DB.prepare(
          `SELECT * FROM users WHERE username = ?`
        )
          .bind(username)
          .first();

        if (!userRecord) {
          return new Response('Invalid username or password', { status: 401 });
        }

        const isValidPassword = await verifyPassword(
          password,
          userRecord.password,
          userRecord.salt
        );

        if (!isValidPassword) {
          return new Response('Invalid username or password', { status: 401 });
        }

        // Ensure you're using 'id' as the key
        const token = await createJWT({ id: userRecord.id }, env.JWT_SECRET);

        // Determine if the connection is secure
        const isSecure = request.url.startsWith('https://');
        const secureAttribute = isSecure ? 'Secure; ' : '';

        // Set the token in the cookie and redirect
        const headers = new Headers();
        // In login handler, update line 66:
        headers.append('Set-Cookie', `token=${token}; HttpOnly; ${secureAttribute}Path=/`);
        headers.append('Location', url.origin + '/'); // Use absolute URL for redirect

        // Return a response with the redirect and cookie
        return new Response(null, {
          status: 303, // Use 303 for the redirect
          headers: headers,
        });

      } catch (error) {
        // Correcting this block
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
    // Handle Logout
    if (pathname === '/logout' && method === 'GET') {
      const headers = new Headers();
      headers.append('Set-Cookie', `token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
      headers.append('Location', '/');
      
      return new Response(null, {
        status: 303,
        headers: headers,
      });
    }

    // Handle Admin Routes
    if (pathname.startsWith('/admin')) {
      const cookies = parseCookies(request);
      const token = cookies.token;
      
      let user = null;
      if (token) {
	      user = await verifyJWT(token, env.JWT_SECRET);
      }
      
      //if (!token) {
       // return new Response('Unauthorized', { status: 401 });
      //}

      //const user = await verifyJWT(token, env.JWT_SECRET);

      if (!user) {
        return new Response('Unauthorized', { status: 401 });
      }

      return await handleAdminRequest(request, env);
    }

    // Main Blog Route
    if (pathname === '/') {
      try {
        // Fetch posts from the database
        const postsResult = await env.DB.prepare(
          `SELECT * FROM posts ORDER BY created_at DESC`
        ).all();

        const posts = postsResult.results;

        // Check if user is authenticated
        const cookies = parseCookies(request);
        const token = cookies.token;
        let user = null;
        if (token) {
          user = await verifyJWT(token, env.JWT_SECRET);
        }

        let postsHtml = '';

        if (posts && posts.length > 0) {
          posts.forEach((post) => {
	    postsHtml += renderPost(post, user);
          });
        } else {
          postsHtml = `<p>No posts available.</p>`;
        }

        // Show login/logout link based on authentication status
        let authLinks = '';
        if (user) {
          authLinks = `<a href="/admin/add">Create New Post</a> | <a href="/logout">Logout</a>`;
        } else {
          authLinks = `<a href="/login">Login</a>`;
        }

        const html = renderBlogPage(postsHtml, authLinks);

        return new Response(html, {
          headers: { 'Content-Type': 'text/html' },
        });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
  }
};

