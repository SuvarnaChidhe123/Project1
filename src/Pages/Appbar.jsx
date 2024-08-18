import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Appbar() {
  return (
    <>
      <nav className="p-4 w-full fixed top-0 left-0 right-0 border-b border-gray-300 bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left-aligned logo */}
          <div className="text-4xl font-bold">
            <h1 className="text-4xl text-purple-700">PEOPLE.CO</h1>
          </div>

          {/* Right-aligned notification icon */}
          <div className="text-xl flex items-center space-x-3">
            <FontAwesomeIcon icon={faBell} className="text-gray-700 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
}
