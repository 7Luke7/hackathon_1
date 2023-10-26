"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import Banner from "../../public/undraw_chatting_re_j55r.webp"
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPasswrod] = useState("")
  const [error, setError] = useState("")
  const [keepLogged, setKeepLogged] = useState(false)

  useEffect(() => {
    const cookieToken = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1]
    if (cookieToken) {
      document.cookie = `accessToken=${cookieToken}; SameSite=lax; Secure; max-age=0`;
    } else {  
      sessionStorage.clear()
    }
  })

  const Router = useRouter()
    const submit_handler = async (e) => {
      try {
        e.preventDefault()
        const payload = {
          email: email,
          password: password,
        }
      const request = await axios({
          method: "POST",
          url: `${process.env.URL}/sign-in`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(payload)   
      })

      if (request.status === 200) {
          const three_day = 24 * 60 * 60 * 3
          if (keepLogged) {
            document.cookie = `accessToken=${request.data.token}; SameSite=lax; Secure; max-age=${three_day};`;
          } else {
            sessionStorage.setItem("accessToken", request.data.token)
          }

          Router.push("/setup")
      }
      } catch (error) {
          if (error.request?.status === 404) {
            setError(error.response.data.message)
            return
          }
          if (error.request?.status === 401) {
            setError(error.response.data.message)
            return
          }
        console.error(error) 
      }
    }

    const handleCheckbox = (e) => {
      setKeepLogged(e.target.value)
    }
    
  return (
    <div>
        <div className='flex h-screen justify-center items-center'>
        <div className="flex min-h-full w-6/12 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submit_handler} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPasswrod(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='flex items-center gap-1'>
            <label className='text-xs font-light'>Stay logged in:</label>
            <input type="checkbox" value={keepLogged} onChange={(e) => handleCheckbox(e)}></input>
            </div>
            <div>
            <span className='text-sm font-semibold text-red-600'>{error}</span>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? 
            <Link href="/register" className="font-semibold pl-1 leading-6 text-indigo-600 hover:text-indigo-500">
            Register
            </Link>
          </p>
        </div>
      </div>
      <div className='container w-6/12'>
            <Image loading='lazy' src={Banner} alt="Banner"></Image>
        </div>
        </div>
    </div>
  )
}

export default Page