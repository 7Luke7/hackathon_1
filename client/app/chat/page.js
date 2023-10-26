"use client"
import { FriendsContext } from './chatcontext'
import { cloneElement, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './sidebar/Sidebar'
import ChatWindow from './chatw/Chatw'
import { io } from 'socket.io-client'
import SocketContext from '../socket'
import Link from 'next/link'

const Page = () => {
    const [friends, setFriends] = useState([])
    const [update, setUpdate] = useState(false)
    const [socket, setSocket] = useState(null);

    const [currentUser, setCurrentUser] = useState({
            userId: "",
            username: "",
            conversationId: ""
        })

        useEffect(() => {
            const user = sessionStorage.getItem("ucw")
            
            console.log(user)
            const get_friends = async () => {
                try {
                    const token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")

                    const request = await axios.get(`${process.env.URL}/get_friends`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                    
                    console.log(request.data)
                    setFriends([...request.data])
                } catch (error) {
                    console.log(error)
                }
            }
            get_friends()       
            if (!user) {
                return 
            }

            setCurrentUser((prev) => {
                return {
                    userId: user.userId,
                    username: user.username,
                    conversationId: user.conversationId
                }
            })
            const newSocket = io();
            setSocket(newSocket);
    }, [])
    
    const save_user_to_session = async (user) => {
        sessionStorage.setItem("ucw", JSON.stringify({userId: user.id, conversationId: user.conversationId, username: user.username}))   
        setCurrentUser(() => {
            return {
                userId: user.id,
                username: user.username,
                conversationId: user.conversationId
            }
        })
        setUpdate(true)
    }

    console.log(friends)
    return <SocketContext.Provider value={socket}>
        <FriendsContext.Provider value={friends}>
        <div className="w-full h-32" style={{backgroundColor: "#449388"}}>
        <div className='pl-16 pt-12'>
            <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" className='text-red-100 cursor-pointer' height="42" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            </Link>
        </div>
        </div>
        <div className="container mx-auto" style={{marginTop: "-128px"}}>
            <div className="py-6 h-screen">
                <div className="flex border border-grey rounded shadow-lg h-full">
                    {cloneElement(<Sidebar/>, {currentUser, save_user_to_session})}
                    {cloneElement(<ChatWindow/>, {update, currentUser, setUpdate})}
                </div>
            </div>
        </div>
    </FriendsContext.Provider>
    </SocketContext.Provider>
}

export default Page