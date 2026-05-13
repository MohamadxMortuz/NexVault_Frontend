# NexVault — Frontend

React frontend for NexVault, a secure file sharing system with encrypted uploads, shareable links, download history, and a dark neon UI.

---

## Tech Stack

- **Framework:** React 19
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Icons:** Lucide React + React Icons (brand icons)
- **Auth State:** React Context API

---

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Authenticated navbar
│   │   ├── PublicNavbar.jsx   # Public navbar
│   │   ├── Footer.jsx         # Authenticated footer
│   │   ├── PublicFooter.jsx   # Public footer
│   │   └── Sidebar.jsx        # Sidebar component
│   ├── context/
│   │   ├── AuthContext.jsx    # Auth state (login, logout, user)
│   │   └── ThemeContext.jsx   # Theme state
│   ├── pages/
│   │   ├── Homepage.jsx       # Landing page
│   │   ├── About.jsx          # About page with real team members
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Register page
│   │   ├── Upload.jsx         # File upload with upload history (protected)
│   │   ├── Download.jsx       # File download with download history (protected)
│   │   ├── Profile.jsx        # User profile (protected)
│   │   └── Contact.jsx        # Contact page with real links (protected)
│   ├── App.jsx                # Routes & layout
│   ├── index.js               # Entry point
│   └── index.css              # Global styles + dark select styling
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Backend running on `http://localhost:5001`

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

App runs on `http://localhost:3000`

---

## Routes

| Path        | Page       | Access     |
|-------------|------------|------------|
| `/`         | Homepage   | Public     |
| `/about`    | About      | Public     |
| `/login`    | Login      | Guest only |
| `/register` | Register   | Guest only |
| `/upload`   | Upload     | Protected  |
| `/download` | Download   | Protected  |
| `/profile`  | Profile    | Protected  |
| `/contact`  | Contact    | Protected  |

- **Protected** routes redirect to `/login` if not authenticated
- **Guest only** routes redirect to `/` if already logged in

---

## Key Features

### Upload Page
- Drag & drop or browse file upload up to 30 GB
- AES-256 encryption on every file
- Expiry options: after download, 24h, 7 days, or keep indefinitely
- Real-time upload progress with speed indicator
- **Upload History** section showing all previously uploaded files with delete button

### Download Page
- Download by pasting a share link
- **My Uploaded Files** section with Share, Delete, and Download buttons
- Real-time download progress with speed indicator
- Auto-deletes file from DB and GridFS after download if `deleteAfterDownload` is set
- **Download History** section showing last 50 downloaded files with timestamps

### About Page
- Real team members: Mohamad Mortuz, Shivesh Srivastava, Arnav Sharma, Himanshu Raghwa, Ayush Sharma
- Profile icons instead of initials

### Contact Page
- Real contact links: Gmail, GitHub, LinkedIn
- Clickable icons with brand styling

### Footer
- Real social links: LinkedIn, GitHub, Gmail with brand icons

---

## Auth Flow

1. User registers or logs in via the backend API
2. JWT token is stored and managed via `AuthContext`
3. Token is sent as `Authorization: Bearer <token>` on every protected API request
4. On logout, token is cleared from context

---

## Connecting to Backend

The frontend communicates with the backend at `http://localhost:5001`. Make sure the backend is running before starting the frontend.

---

## Build for Production

```bash
npm run build
```

Output will be in the `build/` folder, ready to be served statically.
