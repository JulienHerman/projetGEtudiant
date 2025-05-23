import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
