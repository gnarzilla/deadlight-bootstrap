// styles.js
export const darkMinCSS = `
  /* Base Styles */
  body {
    background-color: #000;
    color: #dcdcdc;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
  }
        
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Auth forms container */
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Header & Navigation */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #333;
  }

  header h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #fff;
  }

  nav a {
    margin-left: 1rem;
    color: #8ba3c7;  /* Slightly lighter for header */
  }

  /* Article/Post Styles */
  article {
    border-bottom: 1px solid #333;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  article h2 {
    color: #fff;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  time {
    color: #888;
    font-size: 0.9em;
    display: block;
    margin-bottom: 1rem;
  }

  .post-content {
    margin-bottom: 1rem;
  }

  /* Read more link */
  .post-content a[href^="/post/"] {
    color: #09f;
    font-weight: 500;
  }

  /* Forms */
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #333;
    background-color: #121212;
    color: #fff;
    font-size: 1em;
    border-radius: 4px;
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }

  /* Buttons */
  button {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #555;
  }

    /* Links - more subtle blue-grey */
  a {
    color: #b6a3c9ff;  /* dark grey */
    text-decoration: none;
  }

  a:hover {
    color: #ccc;  /* Lighter grey on hover */
    text-decoration: underline;
  }

  /* Delete button just darker grey */
  .delete-link button {
    background-color: #222;
    border: 1px solid #444;
  }

  .delete-link button:hover {
    background-color: #5a2020;
    border-color: #6a2525;
  }

  .delete-link {
    display: inline;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Messages */
  .success-message, .error-message {
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    font-size: 1.1em;
  }

  .success-message {
    background-color: #0a0;
    color: #fff;
  }

  .error-message {
    background-color: #a00;
    color: #fff;
  }

  /* Horizontal Rule */
  hr {
    border: 0;
    border-top: 1px solid #333;
    margin: 2rem 0;
  }

  /* Code blocks (if using markdown) */
  pre {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  code {
    background-color: #1a1a1a;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }
  /* Mobile Responsive */
  @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    
    .container {
      padding: 10px;
    }
    
    header {
      flex-direction: column;
      text-align: center;
    }
    
    nav {
      margin-top: 1rem;
    }
    
    nav a {
      margin: 0 0.5rem;
    }
  }

  /* Theme Toggle Button */
  .theme-toggle-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .theme-toggle {
    background-color: #333;
    border: 2px solid #555;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .theme-icon {
    font-size: 24px;
    line-height: 1;
  }

  /* For light theme, update the toggle button colors */
`;

export const lightMinCSS = `
  /* Base Styles */
  body {
    background-color: #f5f5f5;
    color: #333;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
  }
        
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Auth forms container */
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Header & Navigation */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  header h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #000;
  }

  nav a {
    margin-left: 1rem;
    color: #4a6a85;  /* Slightly darker for contrast */
  }

  /* Article/Post Styles - MATCHING DARK THEME */
  article {
    border-bottom: 1px solid #ddd;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  article h2 {
    color: #000;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  time {
    color: #666;
    font-size: 0.9em;
    display: block;
    margin-bottom: 1rem;
  }

  .post-content {
    margin-bottom: 1rem;
  }

  /* Read more link */
  .post-content a[href^="/post/"] {
    color: #007bb5;
    font-weight: 500;
  }

  /* Forms */
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    font-size: 1em;
    border-radius: 4px;
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }

  /* Buttons */
  button {
    background-color: #252027ff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2a2a2eff;
  }

  /* Delete button just lighter grey */
  .delete-link button {
    background-color: #888;
    border: 1px solid #666;
  }
  .delete-link button:hover {
    background-color: #b06060;
    border-color: #a05050;
  }

  .delete-link {
    display: inline;
  }

  /* Links */
  a {
    color: #666;  /* dark grey */
    text-decoration: none;
  }

  a:hover {
    color: #333;  /* darker grey */
    text-decoration: underline;
  }

  /* Messages */
  .success-message, .error-message {
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
    font-size: 1.1em;
  }

  .success-message {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  /* Horizontal Rule */
  hr {
    border: 0;
    border-top: 1px solid #ddd;
    margin: 2rem 0;
  }

  /* Code blocks (if using markdown) */
  pre {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    border: 1px solid #ddd;
  }

  code {
    background-color: #f4f4f4;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* Mobile Responsive */
  @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    
    .container {
      padding: 10px;
    }
    
    header {
      flex-direction: column;
      text-align: center;
    }
    
    nav {
      margin-top: 1rem;
    }
    
    nav a {
      margin: 0 0.5rem;
    }
  }

  /* Theme Toggle Button */
  .theme-toggle-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .theme-toggle {
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  .theme-icon {
    font-size: 24px;
    line-height: 1;
  }

`;