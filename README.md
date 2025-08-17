# Hotel Frontend

A modern, responsive hotel management frontend application built with React, Vite, and Tailwind CSS. This application provides a comprehensive solution for hotel booking, management, and administration.

## 🏨 Features

### User Features
- **Home Page** - Welcome page with hotel overview
- **Room Booking** - Browse and book hotel rooms and suites
- **Room Details** - Detailed view of individual rooms with amenities
- **Dining** - Restaurant information and dining options
- **Meetings & Events** - Conference rooms and event spaces
- **Gallery** - Photo gallery showcasing the hotel
- **About Us** - Hotel information and history
- **Contact** - Contact information and location details
- **User Authentication** - Login and registration system
- **My Bookings** - View and manage personal bookings
- **Booking Success** - Confirmation page after successful booking

### Admin Features
- **Dashboard** - Overview of hotel operations and statistics
- **User Management** - Manage user accounts and permissions
- **Room Management** - Add, edit, and manage hotel rooms
- **Booking Management** - View and manage all bookings
- **Dining Management** - Manage restaurant and dining options
- **Meetings & Events** - Manage conference rooms and events
- **Reviews Management** - Handle customer reviews and feedback
- **Availability Management** - Monitor room availability

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **State Management**: Zustand 5.0.7
- **HTTP Client**: Axios 1.11.0
- **Form Handling**: React Hook Form 7.62.0 + Yup 1.7.0
- **UI Components**: Heroicons React 2.2.0
- **Animations**: Framer Motion 12.23.12
- **Charts**: Chart.js 4.5.0 + React Chart.js 2 5.3.0
- **Date Handling**: Date-fns 4.1.0, React Date Range 2.0.1, React Datepicker 8.4.0
- **Notifications**: React Hot Toast 2.5.2
- **Icons**: React Icon 1.0.0

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hotel-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── admin/           # Admin-specific components and pages
│   ├── layout/      # Admin layout components
│   └── pages/       # Admin pages (dashboard, users, rooms, etc.)
├── api/             # API service functions
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # User-facing pages
├── store/           # Zustand state management
├── utils/           # Utility functions
├── App.jsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles
└── main.jsx         # Application entry point
```

## 🔐 Authentication

The application uses a protected route system with two user types:
- **Regular Users**: Can browse, book rooms, and manage their bookings
- **Admin Users**: Have access to the admin dashboard and management features

## 🎨 UI/UX Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional design using Tailwind CSS
- **Smooth Animations** - Enhanced user experience with Framer Motion
- **Interactive Charts** - Data visualization for admin dashboard
- **Toast Notifications** - User feedback for actions
- **Form Validation** - Comprehensive form validation with Yup schemas

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=Hotel Frontend
```

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration. The main configuration is in `tailwind.config.js`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
