import React, { useCallback, useState } from 'react'
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
//import { X, User, HelpCircle, Settings, CreditCard, Library, Shield, LogOut } from 'lucide-react';
import { X, User, HelpCircle, Settings, CreditCard, Library, Shield,Menu } from 'lucide-react';

export default function Layout() {
    const [isMenuOpen,setIsMenuOpen]=useState(true);
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = useCallback(() => {
        logout()
        navigate('/login')
    }, [logout, navigate])


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-fuchsia-100">
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-purple-600">Menu</h3>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            {/* {isLoggedIn && (
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
                <User className="w-5 h-5 text-purple-600" />
                <span>Edit Profile</span>
              </button>
            )} */}
            {
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
                <User className="w-5 h-5 text-purple-600" />
                <span>Edit Profile</span>
              </button>
            }
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span>Ask Doubt</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
              <Settings className="w-5 h-5 text-purple-600" />
              <span>Customer Support</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Subscription</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
              <Library className="w-5 h-5 text-purple-600" />
              <span>E-Library</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg transition">
              <Shield className="w-5 h-5 text-purple-600" />
              <span>Privacy Policy</span>
            </button>
            {/* {(isLoggedIn || isGuest) && (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsGuest(false);
                  setCurrentPage('welcome');
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition text-red-600"
              >
                //<LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
                          <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
                        <Link to="/" className="font-bold text-xl text-fuchsia-600">EMS</Link>
                        <nav className="flex flex-wrap items-center gap-1 text-gray-700">
                            <NavLink
                                to="/employees"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Employees</NavLink>
                            <NavLink
                                to="/attendance"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Attendance</NavLink>
                            <NavLink
                                to="/reports"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Reports</NavLink>
                            <NavLink
                                to="/departments"
                                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded-md text-sm ${isActive ? 'bg-fuchsia-50 text-fuchsia-700' : 'hover:bg-gray-100'}`}
                            >Departments</NavLink>
                            <button onClick={handleLogout} className="ml-2 sm:ml-3 px-2 sm:px-3 py-2 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50 text-sm">Logout</button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    )
}