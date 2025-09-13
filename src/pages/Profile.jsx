import React, { useState } from 'react'
import {
  HeartIcon,
  ClockIcon,
  CogIcon,
  PencilIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  CameraIcon,
  FilmIcon
} from '@heroicons/react/24/outline'

function Profile() {
  const [user, setUser] = useState({
    id: 1,
    fullname: 'Phạm Trung Nghị',
    email: 'nghi45397@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1611931960487-4932667079f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    joinDate: '2024-01-15',
    totalMoviesWatched: 25,
    totalFavorites: 8
  })

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700">
          <div className="flex flex-col lg:flex-row items-center gap-8">

            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <img
                src={user.avatar}
                alt="Avatar"
                className="relative w-40 h-40 rounded-full object-cover border-4 border-red-500 shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute bottom-2 right-2 bg-gradient-to-r from-red-600 to-red-500 rounded-full p-3 hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25">
                <CameraIcon className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {user.fullname}
              </h1>
              <p className="text-gray-300 mb-2 text-lg flex items-center justify-center lg:justify-start gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                {user.email}
              </p>
              <p className="text-sm text-gray-400 mb-6 flex items-center justify-center lg:justify-start gap-2">
                <CalendarIcon className="w-4 h-4" />
                Tham gia từ {user.joinDate}
              </p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${isEditing
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                  : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg hover:shadow-red-500/25'
                  }`}
              >
                {isEditing ? (
                  <>
                    <XMarkIcon className="w-4 h-4" />
                    Hủy
                  </>
                ) : (
                  <>
                    <PencilIcon className="w-4 h-4" />
                    Chỉnh sửa hồ sơ
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:from-red-900/20 hover:to-red-800/20 transition-all duration-300 border border-gray-700 hover:border-red-500/30">
                <FilmIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400 mb-1">{user.totalMoviesWatched}</div>
                <div className="text-sm text-gray-300 font-medium">Đã xem</div>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:from-red-900/20 hover:to-red-800/20 transition-all duration-300 border border-gray-700 hover:border-red-500/30">
                <HeartIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400 mb-1">{user.totalFavorites}</div>
                <div className="text-sm text-gray-300 font-medium">Yêu thích</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center lg:text-left flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-red-500" />
              Chỉnh sửa thông tin
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={user.fullname}
                  onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white border border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white border border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setIsEditing(false)
                  alert('Đã lưu thông tin!')
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
              >
                <CheckIcon className="w-4 h-4" />
                Lưu thay đổi
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              >
                <XMarkIcon className="w-4 h-4" />
                Hủy bỏ
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:from-red-900/10 hover:via-red-800/5 hover:to-red-900/10 transition-all duration-500 cursor-pointer border border-gray-700 hover:border-red-500/30 shadow-lg hover:shadow-2xl hover:shadow-red-500/10">
            <HeartIcon className="w-16 h-16 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-xl mb-3 text-gray-100 group-hover:text-white transition-colors">Phim yêu thích</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Xem danh sách {user.totalFavorites} phim đã lưu</p>
            <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"></div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:from-blue-900/10 hover:via-blue-800/5 hover:to-blue-900/10 transition-all duration-500 cursor-pointer border border-gray-700 hover:border-blue-500/30 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
            <ClockIcon className="w-16 h-16 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-xl mb-3 text-gray-100 group-hover:text-white transition-colors">Lịch sử xem</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Tiếp tục xem phim dang dở</p>
            <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"></div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:from-green-900/10 hover:via-green-800/5 hover:to-green-900/10 transition-all duration-500 cursor-pointer border border-gray-700 hover:border-green-500/30 shadow-lg hover:shadow-2xl hover:shadow-green-500/10">
            <CogIcon className="w-16 h-16 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-bold text-xl mb-3 text-gray-100 group-hover:text-white transition-colors">Cài đặt</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Thay đổi mật khẩu, thông báo</p>
            <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile  