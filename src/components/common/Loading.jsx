import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
      <p className="text-white text-lg"></p>
    </div>
  )
}

export default Loading;