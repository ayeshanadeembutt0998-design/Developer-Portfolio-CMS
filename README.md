# 💻 Developer Portfolio CMS

A responsive and interactive **Developer Portfolio CMS** that allows developers to create, manage, customize, and preview their personal portfolio through an easy-to-use dashboard.

The project is built using **HTML5, CSS3, and Vanilla JavaScript**, with data stored in the browser using **LocalStorage**.

---

## 📌 Project Overview

The Developer Portfolio CMS is divided into two main parts:

### 🛠️ Portfolio Builder

The Portfolio Builder works as the private dashboard where the portfolio owner can manage all portfolio information.

It allows the user to:

- Add and update personal information
- Manage projects
- Manage technical skills
- Add work experience
- Upload a resume
- Manage contact information
- Switch between light and dark themes
- Reset portfolio data
- Preview the portfolio

### 🌐 Portfolio Preview

The Portfolio Preview is the final public-facing portfolio website.

It dynamically displays the information saved through the Portfolio Builder, including:

- Hero section
- Personal information
- Profile image
- Statistics
- About Me
- Projects
- Skills
- Experience
- Resume
- Contact information
- Social links
- Theme support

---

## ✨ Features

### 🛠️ Portfolio Builder

The dashboard provides a sidebar navigation system for managing different sections of the portfolio.

#### 👤 About Me

Users can manage:

- Full Name
- Profession
- Short Bio
- Profile Image
- GitHub Profile
- LinkedIn Profile
- Email Address

The information is saved in LocalStorage and can be updated whenever required.

---

### 📁 Projects Management

The Projects section allows users to create and manage portfolio projects.

Each project can contain:

- Project Image
- Project Title
- Technologies Used
- GitHub Repository
- Live Demo
- Project Description

Projects are dynamically generated as cards.

The section supports basic CRUD functionality such as:

- Create projects
- Read/display projects
- Update projects
- Delete projects

---

### ⭐ Skills Management

Users can add and manage their technical skills.

Each skill can contain:

- Skill Name
- Category
- Skill Level
- Skill Icon

Skills are displayed dynamically using skill cards with progress indicators.

---

### 💼 Experience Management

The Experience section allows users to add professional or learning experience.

Experience information includes:

- Job/Role Title
- Company/Organization
- Start Date
- End Date
- Description

Experience entries are dynamically displayed in the portfolio.

---

### 📄 Resume Management

The Resume section allows users to upload a PDF resume.

Features include:

- PDF file validation
- File size validation
- Resume preview
- Resume deletion
- Resume download

The uploaded resume is stored and managed through browser storage.

---

### 📞 Contact Management

The Contact section allows the portfolio owner to manage their contact information.

It includes:

- Email
- Phone Number
- Contact form
- Message field

Form validation is applied to ensure that users enter valid information.

---

### 🎨 Theme Switcher

The CMS includes a **Light/Dark Theme Switcher**.

CSS custom properties are used to manage the colors of the application.

The selected theme is saved so that it can be maintained when the page is refreshed.

---

### 🔄 Reset Portfolio

A Reset Portfolio option is available inside the dashboard.

It allows the portfolio owner to clear saved portfolio data and start again.

---

### 👀 Live Portfolio Preview

The Portfolio Builder includes a **Preview Portfolio** option.

It allows the user to view the final portfolio website using the information stored in the CMS.

---

## 🌐 Portfolio Preview

The Portfolio Preview is designed as a clean and responsive developer portfolio.

### 🏠 Hero Section

The hero section displays:

- Developer name
- Profession
- Short introduction
- Profile image
- Call-to-action buttons

---

### 📊 Statistics

The statistics section displays important portfolio information such as:

- Number of Projects
- Number of Skills
- Experience
- Other portfolio-related statistics

The values can be generated dynamically from the saved portfolio data.

---

### 👤 About Me

The About Me section presents the developer's personal introduction along with their profile information and image.

---

### 📁 Projects

Projects saved from the Portfolio Builder are displayed dynamically in the Portfolio Preview.

Each project card contains:

- Project image
- Project title
- Technologies
- Description
- GitHub link
- Live demo link

---

### ⭐ Skills

Saved skills are displayed dynamically as skill cards.

Each card can show:

- Skill icon
- Skill name
- Skill category
- Skill level
- Progress bar

---

### 💼 Experience

The Experience section displays the user's professional or learning experience in an organized layout.

---

### 📄 Resume

The portfolio provides a Resume section where visitors can access and download the developer's resume.

---

### 📞 Contact

The Contact section provides visitors with the developer's contact information and a contact form.

---

## 📱 Responsive Design

The website is designed to work across different screen sizes including:

- 💻 Desktop
- 🖥️ Large screens
- 📱 Tablets
- 📱 Mobile devices

The Portfolio Builder uses a responsive sidebar.

On smaller screens:

- The sidebar is hidden by default.
- A hamburger menu appears.
- Clicking the hamburger opens the sidebar.
- Clicking a navigation item moves to the selected section.
- The sidebar closes automatically after selecting a section.
- Clicking outside the sidebar also closes it.

The Portfolio Preview also adapts its layout for smaller screens using responsive CSS.

---

## 💾 Data Storage

This project uses **LocalStorage** for client-side data persistence.

Portfolio information such as:

- About information
- Projects
- Skills
- Experience
- Contact information
- Theme preference
- Resume data

can be stored in the browser.

This means the information remains available after refreshing the page on the same browser.

> This project does not use a traditional backend database.

---

## 🧠 JavaScript Concepts Used

This project was created to practice and apply important JavaScript concepts, including:

- Variables and constants
- Arrays and objects
- Functions
- Arrow functions
- DOM manipulation
- Event listeners
- Conditional statements
- Loops
- Array methods
- Template literals
- Form handling
- Form validation
- LocalStorage
- JSON
- FileReader API
- File handling
- Dynamic HTML generation
- CRUD operations
- Responsive navigation
- Theme management

---

## 🎨 Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Libraries

- Remix Icon

### Browser APIs

- LocalStorage API
- FileReader API

---


