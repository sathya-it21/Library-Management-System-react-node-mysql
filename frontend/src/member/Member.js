import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookSearch from './BookSearch';
import ViewHistory from './ViewHistory';
import NavBar from './NavBar';
import MemberDashboard from './MemberDashboard.js';

const Member = () => {
  return (
    <div className="dashboard-container">
      <NavBar/>
      <div className="content">
        <Routes>
            <Route path="dashboard" element={<MemberDashboard/>}/>
          <Route path="request-book" element={<BookSearch />} />
          <Route path="view-history" element={<ViewHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Member;
