import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dashbord from './Dashbord';

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
     <div className="w-50 h-screen fixed flex flex-col items-start z-20 ">


<ul className="mt-20 w-full">
  <li className={`p-3 w-full text-lg ${location.pathname === '/' ? ' text-purple-700' : ''}`}>
    <Link to="/overview" className="flex items-center">
      <i className="fas fa-th-large mr-3"></i>
      Overview
    </Link>
  </li>
  <li className={`p-3 w-full text-lg ${location.pathname === '/people-directory' ? ' text-purple-700' : ''}`}>
    <Link to="/people-directory" className="flex items-center">
      <i className="fas fa-users mr-3"></i>
      People Directory
    </Link>
  </li>
</ul>
</div></>
   
  );
};

export default Sidebar;
