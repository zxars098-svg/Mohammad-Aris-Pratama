import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { AuroraBackground } from './components/AuroraBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { syncDatabaseWithServer } from './services/db';

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    syncDatabaseWithServer().finally(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Premium Loading Screen */}
          <LoadingScreen />

          {/* Premium Custom Animated Cursor */}
          <CustomCursor />

          {/* Premium Animated Aurora Background */}
          <AuroraBackground />

          {/* App Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
