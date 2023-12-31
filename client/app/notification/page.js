"use client"
import React, { useEffect, useState } from 'react'
import Header from '../main_page_comps/Header'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { check_access_token } from '../check_token'

const Page = () => {

  const [notifications, setNotifications] = useState([])
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const Router = useRouter()

  useEffect(() => {
    check_access_token(setLoading, Router)
    request_notifications()
  }, [Router])

  const request_notifications = async () => {
    try {
      let token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")

      const request = await axios.get(`${process.env.URL}/get_connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      setNotifications(request.data)
    } catch (error) {
      console.log(error)
    }
  } 

    useEffect(() => {
      function formatRelativeDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
    
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        
        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    function updateNotifications() {
      notifications.forEach((n) => {
        const formattedDate = formatRelativeDate(n.createdAt);
        setTime(formattedDate);
      });
    }
    

    updateNotifications();

    const interval = setInterval(updateNotifications, 60000);

    return () => clearInterval(interval);
    }, [notifications])

  useEffect(() => {
    if (loading) {
      request_notifications()
    } else {
      return
    }
  }, [loading])  

  const decline_connection_request = async (id) => {
    try {
      let token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")

      const request = await axios.delete(`${process.env.URL}/delete_connection_request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (request.status === 200) {
        request_notifications()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const accept_connection = async (id) => {
    try {
      const request = await axios.put(`${process.env.URL}/accept_connection/${id}`)

      if (request.status === 200) {
        await request_notifications()
        setMessage(request.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    {
      loading && <div>
      <Header></Header>
    <div className='bg-slate-200 m-auto w-2/6'>
    <div className="max-w-lg pt-10 mx-auto items-center min-h-screen">
      <div className='text-center'>
      <span className='text-green-500 text-sm font-medium'>
        {message ? message : ""}
      </span>
      </div>
    {notifications.map((n, i) => {
      return <div key={i} className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
      <div className="relative w-16 h-16 rounded-full">
          <div className="absolute top-1/2 left-1/2 transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 448 512">
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
      </svg>
          </div>
      </div>
      <div>
        <span className="font-mono"><Link className='text-blue-500 underline' href={`/profile/${n.sender._id}`}>{n.sender.username}</Link> would like to connect with you</span>
      </div>
      <div className="flex flex-col gap-2">
      <div>
      <span className='text-[10px]'>{time}</span>
      </div>
          <div className='flex gap-5 items-center'>
          <button onClick={() => accept_connection(n._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="rgb(34 197 94)">
                  <path  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
          </button>
          <button onClick={() => decline_connection_request(n._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="rgb(239 68 68)">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
          </button>
          </div>
      </div>
  </div>
    })}
</div>
    </div>
    </div>
  
    }
  </>
}

export default Page