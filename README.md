# Deadlight Edge Bootstrap - Cloudflare Workers Blog/Site Framework

A lightweight, edge-first web framework built on Cloudflare Workers with authentication, D1 database, and a clean dark UI. Deploy a blog or small site globally in under 5 minutes.

🌐 **[Live Demo](https://v1.deadlight.boo)**

Matured branch of this project has been moved to [blog.deadlight][https://github.com/gnarzilla/blog.deadlight) | [V3 Live Demo](https://deadlight.boo)

<img width="2216" height="1222" alt="image" src="https://github.com/user-attachments/assets/29f4f329-e748-43c4-94ca-193bf2208846" />

<img width="999" height="904" alt="image" src="https://github.com/user-attachments/assets/c4ae83e6-168b-4191-b7aa-748057a97141" />

<img width="2249" height="1218" alt="image" src="https://github.com/user-attachments/assets/0595d9cd-9750-46e2-95c3-e9198f7fb84d" />

## Features

- 🚀 **Zero cold starts** - Runs on Cloudflare Workers edge network
- 🔐 **Authentication built-in** - JWT-based auth with secure sessions
- 📝 **Markdown support** - Write posts in Markdown, rendered safely
- 🌓 **Dark/Light themes** - Smooth theme switching with localStorage
- 💾 **D1 Database** - SQLite at the edge for your content
- ⚡ **Fast** - Under 150KB total, loads instantly worldwide
- 🛡️ **Secure** - XSS protection, CSRF safe, proper password hashing

<img width="2226" height="1222" alt="image" src="https://github.com/user-attachments/assets/bd253f60-4818-4094-aeda-0320a43f0943" />

## Quick Start

### Prerequisites
- Cloudflare account (free tier works)
- Node.js 16+
- Wrangler CLI (`npm install -g wrangler`)

### Deploy in 5 minutes

1. Clone and install:

~~~
git clone https://github.com/gnarzilla/deadlight-bootstrap.git
cd deadlight-bootstrap
npm install
~~~

2. Create your D1 database:

wrangler d1 create blog_content

3. Create the database ID to wrangler.toml:

[[d1_databases]]

binding = "DB"
database_name = "blog_content"
database_id = "your-database-id-here" 

4. Initialize the database:

wrangler d1 execute blog_content --file=schema.sql

5. Configure your domain in wrangler.toml:

[[routes]]

pattern = "yourdomain.com/*"
zone_id = "your-zone-id"

6. Deploy:

wrangler deploy

7. Create your admin user:

- Visit https://yourdomain.com/admin/add-user
- Note the credentials
- Remove the setup route from blog.js for security


## Project Structure

~~~
deadline-bootstrap/
├── blog.js          # Main router and request handler
├── admin.js         # Admin routes (create/edit/delete)
├── auth.js          # Authentication logic
├── jwt.js           # JWT token handling
├── render.js        # Page rendering functions
├── templates.js     # HTML templates
├── styles.js        # CSS (dark/light themes)
├── utils.js         # Utility functions
├── schema.sql       # Database schema
└── wrangler.toml    # Cloudflare configuration
~~~

## Common Issues

### DNS Error 1016

Add an A record pointing to 192.0.2.1 (dummy IP) with proxy enabled.

### Redirects not working

Make sure to use url.origin in redirects, not relative paths.


## Customization

### Change Styles

Edit styles.js - both darkMinCSS and lightMinCSS are fully customizable.

### Add Pages 

Add new routes in blog.js following the existing pattern.

### Modify Templates
Edit templates.js for layout changes


## Roadmap / Future Features

### Coming Soon
- 📄 Individual post pages with permalinks
    - Post excerpts on homepage
- 📰 RSS feed generation
- 🏷️ Tags and categories
- 🔍 Search functionality
- 📅 Draft/scheduled posts
- 💬 Comments (considering privacy-first approach)

### Under Consideration  
- 🖼️ Image uploads via R2 (with content safety measures)
- 📊 Analytics (privacy-respecting, no Google)
- 🔔 Email notifications for new posts
- 🌐 i18n/multi-language support
- 🎨 Theme marketplace
- 📱 PWA support

### Plugin Architecture
- Extensible with Workers modules
- Custom themes beyond dark/light
- Webhook integrations

### Contributing

This is a personal project shared for others to use and learn from. Feel free to:

- Fork it for your own use
- Submit PRs for bug fixes
- Open issues for major bugs
- Share what you build!

Note: I'm moving on to other projects, so response time may vary.

## License

MIT - Use this however you want!

## Acknowledgments

- Built to learn Cloudflare Workers
- Inspired by the need for simple, fast, edge-native websites
- Special thanks to LLMs and vibe coding; Use the tools that you have at hand.

Built by @gnarzilla at deadlight.boo 
[Support is greatly appreciated!  Buy me a coffee](coff.ee/gnarzillah)




