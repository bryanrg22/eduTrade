import React, { useState } from 'react'
import { Home, Music, Heart, Settings, User } from 'lucide-react'

export default function HomePage() {
  const [activePage, setActivePage] = useState('Dashboard')

  const handleNavigation = (page) => {
    setActivePage(page)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-start h-16 px-4">
          <svg
            className="w-8 h-8 text-indigo-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span className="ml-2 text-xl font-semibold">workflow</span>
        </div>
        <nav className="mt-5">
          <a
            className={`flex items-center px-4 py-2 ${
              activePage === 'Dashboard' ? 'bg-gray-700' : ''
            }`}
            href="#"
            onClick={() => handleNavigation('Dashboard')}
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </a>
          <a
            className={`flex items-center px-4 py-2 mt-2 ${
              activePage === 'Tracklist' ? 'bg-gray-700' : ''
            }`}
            href="#"
            onClick={() => handleNavigation('Tracklist')}
          >
            <Music className="w-5 h-5 mr-3" />
            <span>Tracklist</span>
          </a>
          <a
            className={`flex items-center px-4 py-2 mt-2 ${
              activePage === 'Wishlist' ? 'bg-gray-700' : ''
            }`}
            href="#"
            onClick={() => handleNavigation('Wishlist')}
          >
            <Heart className="w-5 h-5 mr-3" />
            <span>Wishlist</span>
          </a>
          <a
            className={`flex items-center px-4 py-2 mt-2 ${
              activePage === 'My Preferences' ? 'bg-gray-700' : ''
            }`}
            href="#"
            onClick={() => handleNavigation('My Preferences')}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>My Preferences</span>
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 bg-gray-900">
          <a className="flex items-center text-sm" href="#">
            <img
              alt="Tom Cook"
              className="w-8 h-8 rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="ml-3">Tom Cook</span>
          </a>
        </div>
      </aside>
      <main className="flex-1 p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-semibold">{activePage}</h1>
        {/* Add your page content here */}
      </main>
    </div>
  )
}