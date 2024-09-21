import React, { useState } from 'react'
import { Home, Music, Heart, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [activePage, setActivePage] = useState('HomePage')
  const navigate = useNavigate()

  const handleNavigation = (page) => {
    setActivePage(page)
  }

  const handleSignOut = () => {
    // Add your sign out logic here
    navigate('/') // Navigate to the SignIn page
  }

  const NavItem = ({ page, icon: Icon }) => (
    <button
      className={`flex items-center px-4 py-2 ${
        activePage === page ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      } rounded-md text-sm font-medium`}
      onClick={() => handleNavigation(page)}
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{page}</span>
    </button>
  )

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center space-x-4 w-1/4">
            <img
              src="/logo.png"
              alt="Market Sense Logo"
              className="w-8 h-8"
              style={{
                aspectRatio: "1/1",
                objectFit: "contain"
              }}
            />
            <span className="text-xl font-semibold">Market Sense</span>
          </div>
          <nav className="flex justify-center space-x-4 flex-1">
            <NavItem page="Dashboard" icon={Home} />
            <NavItem page="Saved" icon={Music} />
            <NavItem page="Bought" icon={Heart} />
            <NavItem page="My Preferences" icon={Settings} />
          </nav>
          <div className="flex items-center space-x-4 w-1/4 justify-end">
            <img
              alt="User avatar"
              className="w-8 h-8 rounded-full"
              src="/default_pfp.webp"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
            <div className="text-sm">
              <p className="font-medium">Tom Cook</p>
              <p className="text-gray-300">@tomcook</p>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-4 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="sr-only md:not-sr-only">Sign Out</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          {/* Content for the active page will be rendered here */}
          {activePage === 'Dashboard' && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
              {/* Add Dashboard-specific content here */}
            </div>
          )}
          {activePage === 'Saved' && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Saved Items</h1>
              {/* Add Saved Items-specific content here */}
            </div>
          )}
          {activePage === 'Bought' && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Purchased Items</h1>
              {/* Add Purchased Items-specific content here */}
            </div>
          )}
          {activePage === 'My Preferences' && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">My Preferences</h1>
              {/* Add Preferences-specific content here */}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}