"use client"
import React, { useEffect, useState } from 'react'
import Header from '../main_page_comps/Header'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const page = () => {
    const [user, setUser] = useState([])

    const token = localStorage.getItem("accessToken")
    if (!token) {
        useRouter().replace("/login")
    }
 
    const get_user_data = async () => {
        try {
            const request = await axios.get("http://localhost:5000/api/v1/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        })

        setUser(request.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        get_user_data()
    }, [])

    const handle_account_delete = async () => {
      try {
        const request = await axios.delete("http://localhost:5000/api/v1/delete_account", {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    })

    localStorage.removeItem("accessToken")
    useRouter().replace("/login")
    } catch (error) {
        console.log(error)
    }
    }
  return <div style={{height: "80vh"}}>
  <Header></Header>
  <div className="flex flex-col h-full justify-center items-center">
    <div className="block max-w-[50rem] rounded-lg border border-neutral-200 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-neutral-300 dark:bg-neutral-600">
      <div className="border-b-2 flex flex-col items-center border-[#0000002d] px-6 py-3 text-neutral-600 dark:text-neutral-50">
        <BsPerson color="rgb(55 65 81)" size={31}></BsPerson>
            <h1>
            {user.username}
            </h1>
            <div className='flex gap-1'>
            <span>
                joined in: 
            </span>
            <span>
            {new Date(user.createdAt).getFullYear()}
                -
                {new Date(user.createdAt).getMonth() < 10 ? "0" + new Date(user.createdAt).getMonth() : new Date(user.createdAt).getMonth()}
                -
                {new Date(user.createdAt).getDay() < 10 ? "0" + new Date(user.createdAt).getDay() : new Date(user.createdAt).getDay()}
            </span>
            </div>
      </div>
      <div className="p-6 gap-5 flex justify-evenly">
        <div className='flex flex-col justify-center items-center'>
        <p className="text-black dark:text-neutral-50">
          Gender
        </p>
        <span className='text-xs'>|</span>
        <span>{user.gender}</span>
        </div>

        <div  className='flex flex-col justify-center items-center'>
        <p className="text-black dark:text-neutral-50">
          Age
        </p>
        <span className='text-xs'>|</span>
        <span>{user.age}</span>
        </div>
      </div>
    </div>
    

    <div className='mb-10 w-5/12 mt-16 bg-white shadow-xl'>
      <div className="">
        <div className='pl-5 pt-5'>
          <h2 className='font-thin'>
            Hobbies
          </h2>
        </div>
        <div className="p-6">
        <div className='flex flex-wrap gap-5 bg-green'>
          {user.interests?.map((hobbie) => {
            return <p className='p-2 font-medium rounded-md' style={{color: "rgb(85,94,63)", backgroundColor: "rgb(222,247,236)"}}>{hobbie}</p>
          })}
          </div>
        </div>
      </div>
    </div>


    <div className='mb-10 w-5/12 mt-16 bg-white shadow-xl'>
      <div className="">
        <div className='pl-5 pt-5'>
          <h2 className='font-thin'>
            Languages
          </h2>
        </div>
        <div className="p-6">
        <div className='flex flex-wrap gap-5 bg-green'>
          {user.languagesLearning?.map((lang) => {
            return <div className='p-2 font-medium rounded-md' style={{color: "rgb(85,94,63)", backgroundColor: "rgb(222,247,236)"}}>
              <p>{lang.language}</p>
              <hr className='border-t-1 border-green-800'/>
              <p>{lang.proficiency}</p>
            </div>
          })}
          </div>
        </div>
      </div>
    </div>

    </div>

    <div className='flex items-center justify-center'>
    <Link href="/setup">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Edit Account
    </button>
    </Link>
    <button onClick={handle_account_delete} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete Account
      </button>
    </div>
  </div>
}

export default page