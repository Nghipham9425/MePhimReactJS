import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  HeartIcon,
  ClockIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const UserActions = ({ user, onProfileClick, onLogout, isUserMenuOpen, onUserMenuToggle }) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-3">
      {/* Notification */}
      <button className="relative p-2 text-white hover:text-red-500 transition-colors rounded-lg hover:bg-gray-800/50">
        <BellIcon className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium animate-pulse">
          3
        </span>
      </button>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={onUserMenuToggle}
          className="flex items-center gap-2 hover:bg-gray-800/50 rounded-lg p-1.5 transition-all duration-300 group"
        >
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-red-500 object-cover group-hover:border-red-400 transition-colors"
          />
          <div className="hidden lg:block text-left">
            <div className="text-white text-sm font-medium">
              {user.name.split(' ').slice(-1)[0]}
            </div>
          </div>
          <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-white ${isUserMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 py-2 z-40">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{user.name}</div>
                  <div className="text-gray-400 text-sm truncate">{user.email}</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <MenuItem onClick={onProfileClick} icon={UserIcon} label="Hồ sơ cá nhân" />
              <MenuItem onClick={() => navigate('/favorites')} icon={HeartIcon} label="Phim yêu thích" />
              <MenuItem onClick={() => navigate('/history')} icon={ClockIcon} label="Lịch sử xem" />
              <MenuItem onClick={() => navigate('/settings')} icon={CogIcon} label="Cài đặt" />
            </div>

            <hr className="border-gray-700 my-2" />

            <MenuItem
              onClick={onLogout}
              icon={ArrowRightOnRectangleIcon}
              label="Đăng xuất"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const MenuItem = ({ onClick, icon: Icon, label, className = "text-white hover:text-red-400 hover:bg-gray-800/50" }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2.5 text-left transition-all duration-200 flex items-center gap-3 ${className}`}
  >
    <Icon className="w-4 h-4 flex-shrink-0" />
    <span className="font-medium">{label}</span>
  </button>
)

export default UserActions