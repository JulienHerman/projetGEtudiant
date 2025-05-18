import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProtectedLayout from './layouts/ProtectedLayout';

import UserList from './pages/User/UserList';
import UserAdd from './pages/User/UserAdd';
import UserEdit from './pages/User/UserEdit';
import StudentList from './pages/StudentList/StudentList';
import StudentAdd from './pages/StudentList/StudentAdd';
import StudentEdit from './pages/StudentList/StudentEdit';
import Statistics from './pages/Statistics/Statistics';
import About from './pages/Settings/About';
import Profile from './pages/User/Profile';
import Login from './pages/AuthPage/Login';
import Logout from './pages/AuthPage/Logout';
import Register from './pages/AuthPage/Register';
import Dashboard from './pages/DashboardOverview/Dashboard';
import { ThemeProvider } from './hooks/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedLayout>
              <Routes>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/** Utilisateurs */}
                <Route path="/register" element={<Register />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/add" element={<UserAdd />} />
                <Route path="users/edit/:id" element={<UserEdit />} />

                {/* Étudiants */}
                <Route path="students" element={<StudentList />} />
                <Route path="students/add" element={<StudentAdd />} />
                <Route path="students/edit/:id" element={<StudentEdit />} />

                <Route path="statistics" element={<Statistics />} />
                <Route path="about" element={<About />} />
                <Route path="profile" element={<Profile />} />
                <Route path="logout" element={<Logout />} />

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </ProtectedLayout>
          }
        />
      </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
