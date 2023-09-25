"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import Image from "next/image" 
import Banner from "../../public/undraw_chat_re_re1u.webp"
import axios from "axios"
import { useRouter } from 'next/navigation';

const Page = React.memo(() => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

      const Router = useRouter() 
      const submit_handler = async (e) => {
            try {
              e.preventDefault()
            if (gender === "") {
                setError("Please select a gender.")
                return
            }
            function convertDateFormat(dateString) {
                const parts = dateString.split("-");
                const year = parts[0];
                const month = parts[1];
                const day = parts[2];

                const dateObject = new Date(`${year}-${month}-${day}`);
                const formattedDate = `${String(dateObject.getDate()).padStart(2, '0')}-${String(dateObject.getMonth() + 1).padStart(2, '0')}-${dateObject.getFullYear()}`;

                return formattedDate
              }

              const newDate = convertDateFormat(date)
              const payload = {
                username: username,
                email: email,
                password: password,
                gender: gender,
                age: newDate
            }
            const request = await axios({
                method: "POST",
                url: `${process.env.URL}/sign-up`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(payload)   
            })

            if (request.status === 200) {
                Router.push("/login")
            }
            } catch (error) {
              if (error.request.status === 409) {
                setError("Username or email is already in use. Please choose a different one.")
              }
            }
        }
        
      return (
        <div>
            <div className='flex h-screen justify-start items-center'>
            <div className="flex min-h-full flex-1 flex-col w-6/12 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                 Register new account
              </h2>
            </div>      
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={submit_handler} className="space-y-6">
                
              <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                      Username
                    </label>                
                  </div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                <label htmlFor="countries" className="block text-sm font-medium text-gray-900">Select your Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option valeu="">Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="BornIn" className="block text-sm font-medium leading-6 text-gray-900">
                      Born In
                    </label>                
                  </div>
                  <div className="mt-2">
                    <input
                      id="BornIn"
                      name="BornIn"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
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
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                    <span className='text-sm font-semibold text-red-600'>{error}</span>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className='w-6/12'>
            <Image priority src={Banner} style={{width: "auto", height: "auto"}} width={600} height={600} alt="Banner"></Image>
          </div>
            </div>
        </div>
      )
})

export default Page