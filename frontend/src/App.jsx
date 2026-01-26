import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-400">
        Tailwind v4 is working 🚀
      </h1>
    </div>
)}

console.log("API URL:", import.meta.env.VITE_API_URL);
