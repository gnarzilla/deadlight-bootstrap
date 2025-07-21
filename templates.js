// templates.js

export function renderTemplate(title, bodyContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/styles/theme.css" id="theme-stylesheet">
      <script>
        // Check for saved theme preference or default to 'dark'
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update stylesheet link immediately to prevent flash
        window.addEventListener('DOMContentLoaded', () => {
          const link = document.getElementById('theme-stylesheet');
          link.href = currentTheme === 'dark' ? '/styles/dark_min.css' : '/styles/light_min.css';
        });
      </script>
    </head>
    <body>
      <div class="theme-toggle-container">
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
      </div>
      ${bodyContent}
      <script>
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        function updateThemeIcon(theme) {
          if (theme === 'dark') {
            themeIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">' +
              '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>' +
              '</svg>';
          } else {
            themeIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">' +
              '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>' +
              '</svg>';
          }
        }

        // Set initial icon
        updateThemeIcon(localStorage.getItem('theme') || 'dark');
        
        themeToggle.addEventListener('click', () => {
          const currentTheme = localStorage.getItem('theme') || 'dark';
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          
          localStorage.setItem('theme', newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
          
          // Update stylesheet
          const link = document.getElementById('theme-stylesheet');
          link.href = newTheme === 'dark' ? '/styles/dark_min.css' : '/styles/light_min.css';
          
          updateThemeIcon(newTheme);
        });
      </script>
    </body>
    </html>
  `;
}

export function renderLoginForm() {
  return renderTemplate(
    'Login',
    `
    <div class="auth-container">
      <h1>Login</h1>
      <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  `
  );
}

export function renderAddUserForm() {
  return renderTemplate(
    'Add User',
    `
    <h1>Add New User</h1>
    <form action="/admin/add-user" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Add User</button>
      <a href="/">Cancel</a>
    </form>
  `
  );
}

export function renderAddPostForm() {
  return renderTemplate(
    'Add Post',
    `
    <h1>Add New Post</h1>
    <form action="/admin/add" method="POST">
      <input type="text" name="title" required placeholder="Title">
      <textarea name="content" required placeholder="Content"></textarea>
      <button type="submit">Add Post</button>
      <a href="/">Cancel</a>
    </form>
  `
  );
}

export function renderEditPostForm(post) {
  return renderTemplate(
    'Edit Post',
    `
    <h1>Edit Post</h1>
    <form action="/admin/edit/${post.id}" method="POST">
      <input type="text" name="title" value="${post.title}" required>
      <textarea name="content" required>${post.content}</textarea>
      <button type="submit">Update Post</button>
      <a href="/">Cancel</a>
    </form>
    `
  );
}
