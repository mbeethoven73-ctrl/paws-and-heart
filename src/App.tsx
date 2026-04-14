/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import Landing from './screens/Landing';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Search from './screens/Search';
import VerifyEmail from './screens/VerifyEmail';
import PetDetails from './screens/PetDetails';
import ApplicationForm from './screens/ApplicationForm';
import ApplicationReview from './screens/ApplicationReview';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';

import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (screen: string) => {
    window.scrollTo(0, 0);

    if (screen === 'landing') navigate('/');
    else if (screen === 'details') navigate('/1/petDetails');
    else navigate(`/${screen}`);
  };

  const currentScreen =
    location.pathname === '/' ? 'landing' : location.pathname.split('/')[1];

  return (
    <ToastProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-on-surface font-body pb-24">

          <Routes>
            <Route path="/" element={<Landing onNavigate={handleNavigate} />} />
            <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
            <Route path="/signup" element={<SignUp onNavigate={handleNavigate} />} />
            <Route path="/verify-email" element={<VerifyEmail onNavigate={handleNavigate} />} />
            <Route path="/home" element={<Home onNavigate={handleNavigate} />} />
            <Route path="/search" element={<Search onNavigate={handleNavigate} />} />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites onNavigate={handleNavigate} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/:id/petDetails"
              element={<PetDetails onNavigate={handleNavigate} />}
            />

            <Route
              path="/details"
              element={<PetDetails onNavigate={handleNavigate} />}
            />

            <Route
              path="/application"
              element={
                <ProtectedRoute>
                  <ApplicationForm onNavigate={handleNavigate} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/application-review"
              element={
                <ProtectedRoute>
                  <ApplicationReview onNavigate={handleNavigate} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile onNavigate={handleNavigate} />
                </ProtectedRoute>
              }
            />
          </Routes>

          {['home', 'search', 'favorites', 'profile'].includes(currentScreen) && (
            <BottomNav
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
            />
          )}

        </div>
      </AuthProvider>
    </ToastProvider>
  );
}