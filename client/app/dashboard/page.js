"use client"
import  { useEffect, useState } from 'react'
import Header from '../main_page_comps/Header'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { check_access_token } from '../check_token'

  const Page = () => {
      const [user, setUser] = useState([])
      const [loading, setLoading] = useState(false)

      const Router = useRouter()
      useEffect(() => {
        check_access_token(setLoading, Router)
        get_user_data()
      }, [loading])
  
      const get_user_data = async () => {
          try {
            let token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")

            const request = await axios.get(`${process.env.URL}/dashboard`, {
              
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });

          setUser(request.data)
          } catch (error) {
              console.log(error)
          }
      }

      const handle_account_delete = async () => {
        try {
          const request = await axios.delete(`${process.env.URL}/delete_account`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

      useRouter.replace("/login")
      } catch (error) {
          console.log(error)
      }
      }

      const handler_log_out = () => {        
        Router.replace("/login")
      }
  return<>
     {loading && <div style={{height: "80vh"}}>
  <Header></Header>
  <div className="flex flex-col h-full justify-center items-center">
    <div className="block max-w-[50rem] rounded-lg border border-neutral-200 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="border-b-2 flex flex-col items-center border-[#0000002d] px-6 py-3 text-neutral-600">
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512">
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
      </svg>
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
                {Number(new Date(user.createdAt).getMonth()) + 1 < 10 ? "0" + Number(new Date(user.createdAt).getMonth() + 1) : Number(new Date(user.createdAt).getMonth() + 1)}
                -
                {new Date(user.createdAt).getDate() < 10 ? "0" + new Date(user.createdAt).getDate() : new Date(user.createdAt).getDate()}
            </span>
            </div>
      </div>
      <div className="p-6 gap-5 flex justify-evenly">
        <div className='flex flex-col justify-center items-center'>
        <p className="text-black">
          Gender
        </p>
        <span className='text-xs'>|</span>
        <span className='text-gray-800'>{user.gender}</span>
        </div>

        <div  className='flex flex-col justify-center items-center'>
        <p className="text-black">
          Age
        </p>
        <span className='text-xs'>|</span>
        <span className='text-gray-800'>{user.age}</span>
        </div>
      </div>
    </div>
    
    <button onClick={handler_log_out} type="button" className="focus:outline-none mt-10 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
      Log out
      </button>

    <div className='flex justify-evenly'>

    <div className='mb-10 w-5/12 mt-16 bg-white shadow-xl'>
      <div className="">
        <div className='pl-5 pt-5'>
          <h2 className='font-extralight'>
            Hobbies
          </h2>
        </div>
        <div className="p-6">
        <div className='flex flex-wrap gap-5 bg-green'>
          {user.interests?.map((hobbie, i) => {
            return <p key={i} className='p-2 font-medium rounded-md' style={{color: "rgb(85,94,63)", backgroundColor: "rgb(222,247,236)"}}>{hobbie}</p>
          })}
          </div>
        </div>
      </div>
    </div>


    <div className='mb-10 w-5/12 mt-16 bg-white shadow-xl'>
      <div className="">
        <div className='pl-5 pt-5'>
          <h2 className='font-extralight'>
            Languages
          </h2>
        </div>
        <div className="p-6">
        <div className='flex flex-wrap gap-5 bg-green'>
          {user.languagesLearning?.map((lang, i) => {
            return <div key={i} className='p-2 font-medium rounded-md' style={{color: "rgb(31,79,192)", backgroundColor: "rgb(219,234,254)"}}>
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

    <div className='flex items-center justify-center'>
    <Link href="/setup">
    <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          Edit Account
    </button>
    </Link>
    <button onClick={handle_account_delete} type="button" className="focus:outline-none text-white bg-red-800 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
        Delete Account
      </button>
    </div>
  </div> }
  </>
}

export default Page
