import React from 'react'

function MovieCardSkeleton() {
  return (
    <div className='animate-pulse bg-gray-800 rounded overflow-hidden'>
      <div className='h-40 bg-gray-700'>
        <div className="p-2">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
