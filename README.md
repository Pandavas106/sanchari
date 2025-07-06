# Sanchari - React Travel App

A modern travel planning application built with React, featuring AI-powered trip suggestions and a beautiful user interface.

## 🚀 Features

- **AI-Powered Trip Planning** - Get personalized travel recommendations
- **Beautiful UI/UX** - Modern design with dark/light theme support
- **Responsive Design** - Works perfectly on all devices
- **Interactive Components** - Smooth animations and micro-interactions
- **Complete Travel Flow** - From planning to booking and management

## 🛠️ Tech Stack

- **React 18** with JavaScript (JSX)
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for development and building

## 📱 Screens

- Welcome Onboarding
- Login/Signup
- Profile Setup
- Dashboard
- Trip Planner
- Explore Destinations
- AI Suggested Trips
- Trip Details
- Shopping Cart
- User Profile
- Settings
- Saved Items
- My Bookings

## 🎨 Design Features

- **Dark/Light Theme** with persistent storage
- **Glass Morphism** effects
- **Gradient Backgrounds**
- **Smooth Animations** with Framer Motion
- **Apple-level Design** aesthetics
- **Consistent Color System**

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8080`

## 📦 Build for Production

```bash
npm run build
```

## 🎯 Project Structure

```
src/
├── components/             # React components (organized by feature)
│   ├── common/            # Shared components
│   │   ├── Navbar.jsx
│   │   ├── BottomNavbar.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SearchModal.jsx
│   │   └── NotificationCenter.jsx
│   ├── explore/           # Explore page components
│   │   ├── DestinationCard.jsx
│   │   ├── FilterModal.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── TrendingCard.jsx
│   │   ├── SortDropdown.jsx
│   │   └── ViewToggle.jsx
│   ├── dashboard/         # Dashboard components (to be added)
│   ├── cart/             # Cart components (to be added)
│   ├── profile/          # Profile components (to be added)
│   ├── settings/         # Settings components (to be added)
│   ├── bookings/         # Bookings components (to be added)
│   ├── saved/            # Saved items components (to be added)
│   ├── tripDetails/      # Trip details components (to be added)
│   ├── auth/             # Authentication components (to be added)
│   ├── onboarding/       # Onboarding components (to be added)
│   └── index.js          # Component exports
├── contexts/             # React contexts (Theme)
├── pages/                # Page components
├── main.jsx             # App entry point
├── App.jsx              # Main app component
└── index.css            # Global styles
```

## 🏗️ Component Organization

The components are now systematically organized into folders based on their page associations:

### Common Components
- **Navbar** - Main navigation bar for desktop and mobile
- **BottomNavbar** - Mobile bottom navigation
- **LoadingSpinner** - Reusable loading component
- **SearchModal** - Global search functionality
- **NotificationCenter** - Notification management

### Explore Components
- **DestinationCard** - Display destination information
- **FilterModal** - Advanced filtering options
- **CategoryFilter** - Category selection chips
- **TrendingCard** - Trending destination cards
- **SortDropdown** - Sorting options
- **ViewToggle** - Grid/List view toggle

### Future Component Folders
- **dashboard/** - Dashboard-specific components
- **cart/** - Shopping cart components
- **profile/** - User profile components
- **settings/** - Settings page components
- **bookings/** - Booking management components
- **saved/** - Saved items components
- **tripDetails/** - Trip details components
- **auth/** - Authentication components
- **onboarding/** - Onboarding flow components

## 🌟 Key Features

- **Theme Switching** - Toggle between dark and light modes
- **Responsive Navigation** - Mobile-first design approach
- **Loading States** - Shimmer effects for better UX
- **Interactive Cards** - Hover effects and animations
- **Form Handling** - Multi-step forms with validation
- **State Management** - Context API for global state
- **Component Reusability** - Modular component architecture
- **Systematic Organization** - Clean folder structure for scalability

## 📄 License

This project is licensed under the MIT License.