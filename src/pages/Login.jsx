import React, { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', formData)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[url('https://images.unsplash.com/photo-1755429518361-1d6060edcf3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='mx-auto h-12 w-auto flex items-center justify-center'>
          <h1 className='text-3xl font-extrabold text-red-600 tracking-widest'>MePhim</h1>
        </div>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Địa chỉ email
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder='Nhập email của bạn'
                className='block w-full rounded-md bg-zinc-800 border border-gray-700 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>
                Mật khẩu
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                className="block w-full rounded-md bg-zinc-800 border border-gray-700 px-3 py-2 pr-10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3-3l6.364 6.364M21 21l-6.364-6.364" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className='text-sm text-right pr-4'>
            <a href='#' className='font-semibold text-red-600 hover:text-red-300'>
              Quên mật khẩu?
            </a>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors'
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-white">
          Chưa có tài khoản?{' '}
          <a href="/register" className="font-semibold text-red-600 hover:text-red-300">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login