import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthButtons = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate('/login')}
        className="text-white hover:text-red-400 transition-colors px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800/50"
      >
        Đăng nhập
      </button>
      <button
        onClick={() => navigate('/register')}
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-red-500/25"
      >
        Đăng ký
      </button>
    </div>
  )
}

export default AuthButtons