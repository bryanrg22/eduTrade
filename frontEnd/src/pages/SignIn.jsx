import React, { useState } from 'react'
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [isNewUser, setIsNewUser] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isNewUser) {
      // Add your registration logic here
      console.log('Registration attempt with:', { email, password, confirmPassword })
      navigate('/HomePage') // Navigate to HomePage after registration
    } else {
      // Add your sign-in logic here
      console.log('Sign in attempt with:', { username, password })
      navigate('/HomePage') // Navigate to HomePage after sign-in
    }
  }

  const toggleNewUser = () => {
    setIsNewUser(!isNewUser)
    setUsername('')
    setPassword('')
    setEmail('')
    setConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center text-white mb-12">
          <img
            src="/logo.png"
            alt="Market Sense Logo"
            className="w-28 h-28 mx-auto mb-4"
            style={{
              aspectRatio: "1/1",
              objectFit: "contain"
            }}
          />
          <h1 className="text-3xl font-bold">Market Sense</h1>
          <p className="text-xl text-gray-300 mt-2">The Stock Market Made to Make Sense</p>
        </div>
        <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-10">
            <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
              {isNewUser ? "Create Account" : "Welcome Back"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isNewUser && (
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              {!isNewUser && (
                <div className="relative">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {isNewUser && (
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  {isNewUser ? "Create Account" : "Sign In"}
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <button onClick={toggleNewUser} className="text-sm text-blue-400 hover:text-blue-300">
                {isNewUser ? "Already a user?" : "New user?"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-gray-400">
        <p>&copy; 2024 Market Sense. All rights reserved.</p>
      </footer>
    </div>
  )
}