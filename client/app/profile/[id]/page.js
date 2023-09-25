"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../main_page_comps/Header'
import { BsPerson } from 'react-icons/bs'
import axios from 'axios'

const Page = ({params}) => {
    const [user, setUser] = useState([])

    const get_user_data = async () => {
        try {
            const request = await axios.get(`${process.env.URL}/get_user/${params.id}`, {
        headers: {
          "Content-Type": "application/json"
        }
        })

        console.log(request.data)
        setUser(request.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        get_user_data()
    }, [])
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
            return <div className='p-2 font-medium rounded-md' style={{color: "rgb(31,79,192)", backgroundColor: "rgb(219,234,254)"}}>
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
  </div>
}

export default Page