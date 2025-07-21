// admin.js

import { renderAddUserForm, renderAddPostForm, renderEditPostForm } from './templates.js';
import { hashPassword } from './auth.js';
import { verifyJWT } from './jwt.js';
import { parseCookies } from './utils.js';

export async function addUser(env, username, password) {
  try {
    const { hash, salt } = await hashPassword(password);

    await env.DB.prepare(
      `INSERT INTO users (username, password, salt) VALUES (?, ?, ?)`
    )
      .bind(username, hash, salt)
      .run();

    return new Response(`User ${username} added successfully!`, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(`Error adding user: ${error.message}`, {
      status: 500,
    });
  }
}

export async function handleAdminRequest(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Route to add a new post (GET)
  if (pathname === '/admin/add' && method === 'GET') {
    return new Response(renderAddPostForm(), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Route to add a new post (POST)
  if (pathname === '/admin/add' && method === 'POST') {
    try {
     // Parse cookies and verify JWT
     const cookies = parseCookies(request);
     const token = cookies.token;

     if (!token) {
       return new Response('Unauthorized', { status: 401 });
     }

     const user = await verifyJWT(token, env.JWT_SECRET);

     if (!user) {
        return new Response('Unauthorized', { status: 401 });
      }

      const userId = user.id; // Extract userId from JWT payload
      console.log('User ID:', userId);

      // Get form data
      const formData = await request.formData();
      const title = formData.get('title');
      const content = formData.get('content');

      // Validate data
      if (!title || !content || !userId) {
        console.error('Missing data:', { title, content, userId });
        return new Response('Missing data', { status: 400 });
      } 

      // Insert the new post into the database with user_id
      await env.DB.prepare(
        `INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`
      )
        .bind(title, content, userId)
        .run();

      // Redirect back to the homepage
      return Response.redirect(url.origin + '/', 303);
    } catch (error) {
      console.error('Error adding post:', error);
      return new Response(`Error adding post: ${error.message}`, {
      status: 500,
      });
    }
  }     


  // Route to edit a post (GET)
  if (pathname.startsWith('/admin/edit/') && method === 'GET') {
    const postId = pathname.split('/').pop();

    // Fetch the post from the database
    const postResult = await env.DB.prepare(
      `SELECT * FROM posts WHERE id = ?`
    )
      .bind(postId)
      .first();

    if (!postResult) {
      return new Response('Post not found', { status: 404 });
    }

    // Render the edit post form
    return new Response(renderEditPostForm(postResult), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Route to edit a post (POST)
  if (pathname.startsWith('/admin/edit/') && method === 'POST') {
    try {
      // Parse cookies and verify JWT
      const cookies = parseCookies(request);
      const token = cookies.token;

      if (!token) {
        return new Response('Unauthorized', { status: 401 });
      }

      const user = await verifyJWT(token, env.JWT_SECRET);

      if (!user) {
        return new Response('Unauthorized', { status: 401 });
      }

      const postId = pathname.split('/').pop();

      // Get form data
      const formData = await request.formData();
      const title = formData.get('title');
      const content = formData.get('content');

      // Update the post in the database
      await env.DB.prepare(
        `UPDATE posts SET title = ?, content = ? WHERE id = ?`
      )
        .bind(title, content, postId)
        .run();
      return Response.redirect(url.origin + '/', 303);

    } catch (error) {
      return new Response(`Error updating post: ${error.message}`, {
        status: 500,
      });
    }
  }

  // Route to delete a post
  if (pathname.startsWith('/admin/delete/') && method === 'POST') {
    try {
      // Parse cookies and verify JWT
      const cookies = parseCookies(request);
      const token = cookies.token;

      if (!token) {
        return new Response('Unauthorized', { status: 401 });
      }

      const user = await verifyJWT(token, env.JWT_SECRET);

      if (!user) {
        return new Response('Unauthorized', { status: 401 });
      }

      const postId = pathname.split('/').pop();

      // Delete the post from the database
      await env.DB.prepare(`DELETE FROM posts WHERE id = ?`)
        .bind(postId)
        .run();
        return Response.redirect(url.origin + '/', 303);
      
    } catch (error) {
      return new Response(`Error deleting post: ${error.message}`, {
        status: 500,
      });
    }
  }

  // Route to add a new user (GET)
  if (pathname === '/admin/add-user' && method === 'GET') {
    // ADD THESE LINES:
    const cookies = parseCookies(request);
    const token = cookies.token;
    if (!token) return new Response('Unauthorized', { status: 401 });
    const user = await verifyJWT(token, env.JWT_SECRET);
    if (!user) return new Response('Unauthorized', { status: 401 });
    
    return new Response(renderAddUserForm(), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Route to add a new user (POST)
  if (pathname === '/admin/add-user' && method === 'POST') {
    // ADD AUTH CHECK HERE TOO
    const cookies = parseCookies(request);
    const token = cookies.token;
    if (!token) return new Response('Unauthorized', { status: 401 });
    const user = await verifyJWT(token, env.JWT_SECRET);
    if (!user) return new Response('Unauthorized', { status: 401 });
    
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    // Also add redirect after user creation:
    await addUser(env, username, password);
    return Response.redirect(url.origin + '/', 303);
  }

  // Default response for unknown routes
  return new Response('Not found', { status: 404 });
}

