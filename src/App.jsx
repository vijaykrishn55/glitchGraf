import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ARView from './pages/ARView';
import ProfilePage from './pages/ProfilePage';
import InstallButton from './components/InstallButton';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [currentLandmark, setCurrentLandmark] = useState(null);
  const { currentUser } = useAuth();

  // Navigation handlers
  const goToAR = (landmarkId) => {
    setCurrentLandmark(landmarkId);
    setPage('ar');
  };

  const goToProfile = () => setPage('profile');
  const goHome = () => setPage('home');

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <InstallButton />
      
      {/* Navigation Bar */}
      <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <button 
          onClick={goHome} 
          className="text-xl font-bold"
        >
          Reality Remix
        </button>
        
        <div className="flex items-center space-x-4">
          {currentUser && !currentUser.isAnonymous && (
            <span className="text-sm">
              {currentUser.email || currentUser.displayName}
            </span>
          )}
          <button 
            onClick={goToProfile}
            className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm"
          >
            Profile
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-0">
        {page === 'home' && (
          <HomePage onLandmarkSelect={goToAR} />
        )}
        
        {page === 'ar' && currentLandmark && (
          <ARView 
            landmarkId={currentLandmark} 
            onBack={goHome}
          />
        )}
        
        {page === 'profile' && (
          <ProfilePage onBack={goHome} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        © {new Date().getFullYear()} Reality Remix - AR Glitch Collective
      </footer>
    </div>
  );
}

export default App;