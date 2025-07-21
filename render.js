// render.js

import { renderTemplate } from './templates.js';
import { escapeHtml } from './utils.js';
import { marked } from 'marked';
import { filterXSS } from 'xss'; 

function getExcerpt(content, maxLength = 300) {
  // Strip markdown formatting for clean excerpt
  const plainText = content
    .replace(/[#*`_~()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (plainText.length <= maxLength) return content; // Return full content if short
  
  // Find the last space before maxLength to avoid cutting words
  const lastSpace = plainText.lastIndexOf(' ', maxLength);
  const cutoff = lastSpace > -1 ? lastSpace : maxLength;
  
  return plainText.substring(0, cutoff) + '...';
}

// Function to render individual posts
export function renderPost(post, user) {
  const timestamp = post.created_at
    ? new Date(post.created_at).toLocaleString()
    : 'Unknown date';

  let adminLinks = '';
  if (user) {
    adminLinks = `
    <button onclick="window.location.href='/admin/edit/${post.id}'">Edit</button>
    <form action="/admin/delete/${post.id}" method="POST" style="display:inline;" class="delete-link">
      <button type="submit" onclick="return confirm('Are you sure you want to delete this post?');">Delete</button>
    </form>
    `;
  }

  // Convert Markdown content to HTML
  const htmlContent = marked.parse(post.content);
  // Sanitize the HTML content  
  const sanitizedContent = filterXSS(htmlContent);

  return `
    <article>
      <h2>${escapeHtml(post.title)}</h2>
      <time datetime="${post.created_at}" class="timestamp">Posted on: ${timestamp}</time>
      <div class="post-content">${sanitizedContent}</div>
      ${adminLinks}
    </article>
    <hr>
  `;
}

// Function to render the main blog page
export function renderBlogPage(postsHtml, authLink) {
  return renderTemplate('deadlight.boo', `
    <header>
      <h1>deadlight.boo</h1>
      <nav>${authLink}</nav>
    </header>
    <main>
      ${postsHtml}
    </main>
  `);
}

