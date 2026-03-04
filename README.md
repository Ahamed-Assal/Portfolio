# Personal Portfolio Website

A responsive, modern personal portfolio website for **Ahamed Assal** – IT Student & Aspiring Web Developer.

## 🚀 Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Built with Bootstrap 5 and custom CSS for a clean, professional look
- **Static Hosting Friendly**: Pure frontend project that can be deployed to GitHub Pages, Netlify, Vercel, or any static host
- **Contact Form**: Functional contact form powered by Formspree (no custom backend required)
- **Multiple Pages**: Home, About Me, Skills, Projects, and Contact pages
- **Social Links**: Footer with links to Instagram, Facebook, LinkedIn, and Email

## 🛠️ Technologies Used

- HTML5  
- CSS3 (Custom styles + Bootstrap 5.3.2)  
- JavaScript (Vanilla JS)  
- Bootstrap Icons  
- Formspree (for contact form handling)

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── css/
│   │   └── style.css        # Custom CSS styles
│   ├── js/
│   │   ├── main.js          # General JavaScript functionality and animations
│   │   └── contact.js       # Contact form handling (Formspree)
│   ├── about.html           # About Me page
│   ├── skills.html          # Skills page
│   ├── projects.html        # Projects page
│   └── contact.html         # Contact page
├── index.html               # Home page (entry point)
├── .gitignore               # Git ignore file
├── package.json             # Optional Node metadata (no backend server)
└── README.md                # This file
```

## 🔧 Running the Project

Because this is a static site, you have two simple options:

1. **Open directly in a browser**
   - Double‑click `index.html` in your file explorer, or  
   - Right‑click `index.html` → "Open With" → your browser

2. **Serve with any static file server (optional)**
   - From the project root:
     ```bash
     # Example using npx (no install)
     npx serve .
     ```
   - Then open the URL printed in the terminal (for example `http://localhost:3000`).

No database, environment variables, or custom Node.js backend are required.

## ✉️ Contact Form

The contact form on `public/contact.html` uses **Formspree**:

- Submissions are sent to a configured Formspree endpoint.
- If the request fails, the user sees a clear error message with your direct email address.

To use your own Formspree setup, update the endpoint URL in `public/js/contact.js`.

## 🎨 Customization

- **Personal details**: Update text content in `index.html`, `public/about.html`, `public/skills.html`, and `public/projects.html`.
- **Social links & email**: Update footer links and email addresses in each HTML file.
- **Styling**:
  - Main styles live in `public/css/style.css`.
  - Colors, gradients, and effects are controlled through CSS variables at the top of `style.css`.
- **Projects**: Add or edit project cards directly in `public/projects.html`.

## 📝 Development Notes

- All animations and interactions are implemented in plain JavaScript (`public/js/main.js` and `public/js/contact.js`).
- There is intentionally **no backend** or **database** in this version to keep deployment simple and secure.

## 📄 License

This project is created for personal portfolio purposes.

## 👤 Author

**Ahamed Assal**  
- IT Student at George Brown College, Canada  
- Previous Education: ESOFT Metro Campus, Sri Lanka  
- Aspiring Web Developer

---

**Note**: Before deploying, review and update social media links, email address, and project descriptions so they accurately reflect your latest work.
