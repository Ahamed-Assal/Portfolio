# Personal Portfolio Website

A responsive full-stack personal portfolio website for **Ahamed Assal** - IT Student & Aspiring Web Developer.

## 🚀 Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Built with Bootstrap 5 for a clean and professional look
- **Full-Stack Architecture**: Node.js backend with Express.js and PostgreSQL database
- **Contact Form**: Functional contact form with backend API integration
- **Multiple Pages**: Home, About Me, Skills, Projects, and Contact pages
- **Social Links**: Footer with links to Instagram, Facebook, LinkedIn, and Email

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom styles + Bootstrap 5.3.2)
- JavaScript (Vanilla JS)
- Bootstrap Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- Body Parser
- CORS

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── database.js          # PostgreSQL connection and queries
│   └── routes/
│       └── contact.js       # Contact form API routes
├── public/
│   ├── css/
│   │   └── style.css        # Custom CSS styles
│   ├── js/
│   │   ├── main.js          # General JavaScript functionality
│   │   └── contact.js       # Contact form handling
│   ├── index.html           # Home page
│   ├── about.html           # About Me page
│   ├── skills.html          # Skills page
│   ├── projects.html        # Projects page
│   └── contact.html         # Contact page
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── package.json             # Node.js dependencies
├── server.js                # Express server entry point
└── README.md                # This file
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
3. **npm** (comes with Node.js) or **yarn**

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project

Navigate to the project directory:
```bash
cd "path/to/portfolio"
```

### Step 2: Install Dependencies

Install all required Node.js packages:
```bash
npm install
```

### Step 3: Set Up PostgreSQL Database

1. **Start PostgreSQL service** (if not already running):
   ```bash
   # On macOS/Linux
   sudo service postgresql start
   
   # On Windows, start PostgreSQL service from Services
   ```

2. **Create a new database**:
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE portfolio_db;
   
   # Exit psql
   \q
   ```

   Alternatively, you can use pgAdmin or any PostgreSQL GUI tool to create the database.

### Step 4: Configure Environment Variables

1. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your PostgreSQL credentials:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=portfolio_db
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=3000
   ```

   Replace `your_postgres_password` with your actual PostgreSQL password.

### Step 5: Run the Application

1. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-reload (if nodemon is installed):
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 📊 Database Schema

The application automatically creates the `messages` table on first run. The schema is:

```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET `/api/contact`
Get all messages (for admin purposes).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

## 🎨 Customization

### Update Personal Information

1. **Name and Role**: Edit the HTML files in the `public/` directory
2. **Social Media Links**: Update the footer links in each HTML file
3. **Email**: Replace `ahamed.assal@example.com` with your actual email
4. **Education**: Update education details in `about.html`

### Styling

- Custom CSS is in `public/css/style.css`
- Bootstrap theme colors can be customized via CSS variables in `style.css`

### Adding Projects

Edit `public/projects.html` to add or modify project cards.

## 🔒 Security Notes

- **Environment Variables**: Never commit `.env` file to version control
- **Input Validation**: The contact form includes basic validation
- **SQL Injection**: Uses parameterized queries for database operations
- **CORS**: Currently allows all origins (restrict in production)

## 🐛 Troubleshooting

### Database Connection Issues

1. **Check PostgreSQL is running**:
   ```bash
   # On macOS/Linux
   sudo service postgresql status
   ```

2. **Verify database credentials** in `.env` file

3. **Test connection manually**:
   ```bash
   psql -U postgres -d portfolio_db
   ```

### Port Already in Use

If port 3000 is already in use, change the `PORT` in `.env` file.

### Module Not Found Errors

Run `npm install` again to ensure all dependencies are installed.

## 📝 Development

### Project Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (auto-reload)

### Code Structure

- **Backend**: Express.js routes and PostgreSQL database operations
- **Frontend**: Static HTML pages with Bootstrap and custom JavaScript
- **API**: RESTful API for contact form submissions

## 📄 License

This project is created for personal portfolio purposes.

## 👤 Author

**Ahamed Assal**
- IT Student at George Brown College, Canada
- Previous Education: ESOFT
- Aspiring Web Developer

## 🙏 Acknowledgments

- Bootstrap for the responsive framework
- Express.js community for excellent documentation
- PostgreSQL for robust database management

---

**Note**: Remember to update the social media links and email addresses in the HTML files with your actual profiles before deploying.
