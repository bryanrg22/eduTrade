import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const questions = [
  { id: 1, text: "Please restate your username:", type: "text" },
  { id: 2, text: "Please restate your Password:", type: "password" },
  { id: 3, text: "What is your name?", type: "text" },
  { id: 4, text: "What is your age?", type: "number" },
  { id: 5, text: "What is your email?", type: "email" },
  { id: 6, text: "What is your Portfolio Initial Limit you would like to have? (asking for money amount)", type: "number" },
  { id: 7, text: "What is your likely retirement age?", type: "number" }
]

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      await sendAllAnswers()
      navigate('/HomePage')
    }
  }

  const sendAllAnswers = async () => {
    setLoading(true)
    try {
      const userData = {
        username: answers[0],
        password: answers[1],
        name: answers[2],
        age: parseInt(answers[3]),
        email: answers[4],
        portfolio_initial: parseFloat(answers[5]),
        retirement_age: parseInt(answers[6])
      }

      await axios.post('http://localhost:5173/api/create_user', userData)
    } catch (error) {
      console.error('Error sending user data:', error)
      // You might want to add some user feedback here
    } finally {
      setLoading(false)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <img
            src="/logo.png"
            alt="Market Sense Logo"
            className="w-8 h-8 mr-2"
            style={{
              aspectRatio: "1/1",
              objectFit: "contain"
            }}
          />
          <span className="text-xl font-semibold">eduTrade</span>
        </div>
      </header>
      <div className="bg-blue-600 text-white py-2 text-center">
        <p className="text-sm font-semibold">For Beginners. By Beginners</p>
      </div>
      <div className="bg-gray-800 text-white py-4 px-4 text-center">
        <p className="text-sm max-w-3xl mx-auto mb-2">
          Why we need this information: We use this data to provide personalized stock recommendations tailored to your specific situation and goals. This helps us create a diversified portfolio that aligns with your retirement plans and investment capacity.
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 max-w-3xl mx-auto">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-4">
              <input
                type={questions[currentQuestion].type}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Enter your answer"
              />
            </div>
            <div className="mt-8 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleNext}
                disabled={!answers[currentQuestion] || loading}
              >
                {loading ? 'Sending...' : currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}