import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { UserProvider } from '../hooks/UserContext';
import { ThemeProvider, useTheme } from '../hooks/ThemeContext';
import ProtectedRoute from '../routes/ProtectedRoute';

export default function ProtectedLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { darkMode } = useTheme();

  return (
    <ProtectedRoute>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div
          className="main-content-area"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Header isSidebarOpen={isSidebarOpen} />

          <main
            className={`content ${darkMode ? 'bg-dark' : ''}`}
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              marginLeft: isSidebarOpen ? '250px' : '0',
              transition: 'margin-left 0.3s ease',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}