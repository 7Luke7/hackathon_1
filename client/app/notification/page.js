"use client"
import React, { useEffect, useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import Header from '../main_page_comps/Header'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Page = () => {

  const [notifications, setNotifications] = useState([])
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)
  const [reacted, setReacted] = useState(false)
  const Router = useRouter()

  const token = localStorage.getItem("accessToken")

  if (!token) {
    Router.replace("/new_user")
  } else {
    setLoading(true)
  }

  const request_notifications = async () => {
    try {
      const request = await axios.get(`${process.env.URL}/get_connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      console.log(request.data)
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
    notifications.forEach((n) => {
        const formattedDate = formatRelativeDate(n.timestamp)
        setTime(formattedDate)
    })
  }, [notifications])

  useEffect(() => {
    if (loading) {
      request_notifications()
      setReacted(false)
    } else {
      return
    }
  }, [loading, reacted])

  const decline_connection = async (id) => {
    try {
      const request = await axios.delete(`${process.env.URL}/delete_connection/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (request.status === 200) {
        setReacted(true)
        alert("deleted.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const accept_connection = async (id) => {
    try {
      const request = await axios.put(`${process.env.URL}/${id}`, {status: "accepted"}, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (request.status === 200) {
        setReacted(true)
        alert("accepted.")
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
    <div class="max-w-lg pt-10 mx-auto items-center min-h-screen">
    {notifications.map((n) => {
      return <div class="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
      <div class="relative w-16 h-16 rounded-full">
          <div class="absolute top-1/2 left-1/2 transform flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
            <BsPerson color="rgb(55 65 81)" size={31}></BsPerson>
          </div>
      </div>
      <div>
          <span class="font-mono"><Link className='text-blue-500 underline' href={`/profile/${n.sender._id}`}>{n.sender.username}</Link> would like to connect with you</span>
      </div>
      <div class="flex flex-col gap-2">
      <div>
      <span className='text-[10px]'>{time}</span>
      </div>
          <div className='flex gap-5 items-center'>
          <button onClick={() => accept_connection(n._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="rgb(34 197 94)">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
          </button>
          <button onClick={() => decline_connection(n._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="rgb(239 68 68)">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
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