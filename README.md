# Sanchari - React Travel App with Firebase

A modern travel planning application built with React and Firebase, featuring AI-powered trip suggestions and a beautiful user interface.

## 🚀 Features

- **Firebase Integration** - Complete backend with Authentication, Firestore, and Storage
- **AI-Powered Trip Planning** - Get personalized travel recommendations
- **Beautiful UI/UX** - Modern design with dark/light theme support
- **Responsive Design** - Works perfectly on all devices
- **Interactive Components** - Smooth animations and micro-interactions
- **Complete Travel Flow** - From planning to booking and management
- **Real-time Data** - Live updates with Firestore
- **User Authentication** - Secure login/signup with Firebase Auth
- **Cloud Storage** - Profile pictures and media with Firebase Storage

## 🛠️ Tech Stack

- **Frontend**: React 18 with JavaScript (JSX)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📱 Screens

- Welcome Onboarding
- Login/Signup with Firebase Auth
- Profile Setup
- Dashboard with real-time data
- Trip Planner
- Explore Destinations (Firebase data)
- AI Suggested Trips
- Trip Details
- Shopping Cart
- User Profile
- Settings
- Saved Items (Firestore)
- My Bookings (Firestore)

## 🔥 Firebase Collections

### Core Collections:
- **users** - User profiles and preferences
- **destinations** - Travel destinations and packages
- **bookings** - User trip bookings
- **savedItems** - User's saved/favorite items
- **carts** - Shopping cart data
- **reviews** - User reviews and ratings
- **notifications** - User notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Firebase project created
- Firebase configuration keys

### 1. Clone and Install

```bash
git clone <repository-url>
cd sanchari
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Get your Firebase config keys

### 3. Configure Firestore Security Rules

**IMPORTANT**: You must configure Firestore security rules before the app will work properly.

1. Go to your [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the default rules with the rules provided in the "Firebase Security Rules" section below
5. Click **Publish** to deploy the rules

### 4. Create Required Firestore Indexes

**IMPORTANT**: The app requires specific composite indexes to function properly.

#### Required Indexes:

1. **savedItems Collection Index**:
   - Go to **Firestore Database** → **Indexes** → **Composite**
   - Click **Create Index**
   - Collection ID: `savedItems`
   - Fields:
     - `userId` (Ascending)
     - `savedDate` (Descending)
   - Click **Create**

2. **notifications Collection Index**:
   - Collection ID: `notifications`
   - Fields:
     - `userId` (Ascending)
     - `read` (Ascending)
     - `createdAt` (Descending)
   - Click **Create**

3. **bookings Collection Index**:
   - Collection ID: `bookings`
   - Fields:
     - `userId` (Ascending)
     - `createdAt` (Descending)
   - Click **Create**

4. **reviews Collection Index**:
   - Collection ID: `reviews`
   - Fields:
     - `destinationId` (Ascending)
     - `createdAt` (Descending)
   - Click **Create**

**Note**: Index creation can take several minutes. The app may show errors until all indexes are built.

### 5. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### 6. Update Firebase Config

Edit `src/firebase/config.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

### 7. Seed Initial Data (Optional)

To populate your Firestore with sample destinations:

```javascript
// In browser console after app loads
import { seedAllData } from './src/utils/seedData'
seedAllData()
```

### 8. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:8080`

## 🔐 Authentication

The app uses Firebase Authentication with email/password. For demo purposes, you can:

1. Create a new account with any email/password
2. Use existing demo credentials (if seeded)

## 📦 Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── firebase/              # Firebase configuration and utilities
│   ├── config.js         # Firebase initialization
│   ├── auth.js           # Authentication functions
│   ├── firestore.js      # Firestore operations
│   └── storage.js        # Storage operations
├── components/           # React components (organized by feature)
│   ├── common/          # Shared components
│   ├── explore/         # Explore page components
│   ├── settings/        # Settings components
│   └── index.js         # Component exports
├── contexts/            # React contexts (Theme, Auth)
├── hooks/               # Custom hooks for Firebase operations
├── pages/               # Page components
├── utils/               # Utility functions and seed data
├── main.jsx            # App entry point
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## 🔧 Firebase Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read destinations
    match /destinations/{document} {
      allow read: if true;
      allow write: if false; // Only admins should write
    }
    
    // Users can read/write their own bookings
    match /bookings/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users can read/write their own saved items
    match /savedItems/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users can read/write their own cart
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own reviews
    match /reviews/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users can read/write their own notifications
    match /notifications/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Users can create their own activity tracking data
    match /userActivity/{document} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload their own profile pictures
    match /profile-pictures/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read destination images
    match /destinations/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only admins should write
    }
  }
}
```

## 🌟 Key Features

### Firebase Integration
- **Authentication**: Email/password login with Firebase Auth
- **Real-time Database**: Firestore for all app data
- **File Storage**: Firebase Storage for images
- **Security**: Proper security rules for data protection

### Frontend Features
- **Theme Switching**: Toggle between dark and light modes
- **Responsive Navigation**: Mobile-first design approach
- **Loading States**: Shimmer effects for better UX
- **Interactive Cards**: Hover effects and animations
- **Form Handling**: Multi-step forms with validation
- **State Management**: Context API + Firebase integration
- **Component Reusability**: Modular component architecture
- **Systematic Organization**: Clean folder structure for scalability

### Custom Hooks
- **useDestinations**: Fetch and filter destinations
- **useUserBookings**: Manage user bookings
- **useUserSavedItems**: Handle saved/favorite items
- **useUserCart**: Shopping cart management
- **useCollection/useDocument**: Generic Firestore hooks

## 🔄 Data Flow

1. **Authentication**: Firebase Auth manages user sessions
2. **User Data**: Stored in Firestore `/users` collection
3. **App Data**: Real-time sync with Firestore collections
4. **File Uploads**: Firebase Storage for media files
5. **State Management**: React Context + Firebase listeners

## 🚨 Important Notes

- **CRITICAL**: Configure Firestore security rules and create required indexes before running the app
- Ensure all required Firestore indexes are created (see setup instructions above)
- Ensure Firebase project has proper billing setup for production
- Set up proper error handling for offline scenarios
- Implement proper loading states for all Firebase operations
- Use Firebase emulators for local development

## 🔧 Troubleshooting

### Common Issues:

1. **"Missing or insufficient permissions" error**:
   - Ensure Firestore security rules are properly configured and published
   - Verify the user is authenticated before making requests

2. **"The query requires an index" error**:
   - Create the required composite indexes in Firebase Console
   - Wait for index creation to complete (can take several minutes)

3. **Authentication errors**:
   - Verify Firebase configuration in `.env` file
   - Ensure Authentication is enabled in Firebase Console
   - Check that Email/Password provider is enabled

4. **Data not loading**:
   - Check browser console for specific error messages
   - Verify Firestore security rules allow read access
   - Ensure required indexes are created and active

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, email support@sanchari.com or create an issue in the repository.