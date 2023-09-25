import Link from 'next/link'
import React from 'react'

const page = () => {
  return  <div className="bg-gray-900 flex pb-40 items-center justify-center h-screen">
      <div className="w-6/12 flex flex-col">
      <h2 className="text-slate-200 text-5xl font-semibold text-left">Welcome  &#128075;</h2>
      <p className="text-white text-lg pt-5 pb-5">
      Hello! To get started, please proceed to the login page. Once you've set up your account, you can match with people from around the world, engage in conversations, share experiences, learn, and much more!
      </p>
      <Link href="/login" className="text-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
      </Link>
      </div>
    </div>
  
}

export default page