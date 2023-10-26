"use client"
import React, { useContext, useEffect, useState } from 'react'
import SocketContext  from '../../socket'
import axios from 'axios'

const ChatWindow = ({update, currentUser, setUpdate}) => {
    const [messageInput, setMessageInput] = useState("")
    const [conversation, setConversation] = useState([])
    const socket = useContext(SocketContext);

    useEffect(() => {
        const token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")
        const user_chatting_with = JSON.parse(sessionStorage.getItem("ucw"))

        if (!user_chatting_with) return setUpdate(false)

        const get_chat = async () => {
            try {
                const request = await axios.get(`${process.env.URL}/get_convo/${user_chatting_with.conversationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })

                console.log(request.data)
                setConversation(request.data.message)   
                setUpdate(true)
            } catch (error) {
                console.log(error)
            }   
        }

        get_chat()
    }, [currentUser])

    const send_message = (e) => {
        e.preventDefault()
        const token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")

        socket.emit("sendMessage", JSON.stringify({message: messageInput, token: token, conversation_id: conversation._id, user_id: !currentUser.userId ? JSON.parse(sessionStorage.getItem("ucw")).userId : currentUser.userId}))

        setMessageInput("")        
    }

            /* focus on sender of the message do not show two message components change styles for  depending on if user is sender or not */
    return <> {update == true ? <div className="w-2/3 border flex flex-col">
<div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
<div className="flex items-center">
<div>
    <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
</div>
<div className="ml-4">
    <p className="text-grey-darkest">
        {!currentUser.username ? JSON.parse(sessionStorage.getItem("ucw")).username : currentUser.username}
    </p>
</div>
</div>

<div className="flex">
<div className="ml-6">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
</div>
<div className="ml-6">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
</div>
</div>
</div>

<div className="flex-1 overflow-auto" style={{backgroundColor: "#DAD3CC"}}>
<div className="py-2 px-3">

<div className="flex justify-center mb-2">
    <div className="rounded py-2 px-4" style={{backgroundColor: "#DDECF2"}}>
        <p className="text-sm uppercase">
            February 20, 2018
        </p>
    </div>
</div>

<>
    {conversation?.messages?.map((message, i) => {    
        return <div key={i} className={`${message.sender === JSON.parse(sessionStorage.getItem("ucw")).userId ? "flex mb-2" : "flex mb-2 justify-end"}`}>{message.sender === JSON.parse(sessionStorage.getItem("ucw")).userId ? <div key={message._id} className="rounded py-2 px-3" style={{backgroundColor: "#F2F2F2"}}>
        <p className="text-sm mt-1">
          {message.content}
        </p>
        <p className="text-right text-xs text-grey-dark mt-1">
            12:45 pm
        </p>
        </div> : <div key={message._id} className="rounded py-2 px-3" style={{backgroundColor: "#E2F7CB"}}>
        <p className="text-sm mt-1">
          {message.content}
        </p>
        <p className="text-right text-xs text-grey-dark mt-1">
            {message.timestamp}
        </p>
    </div>} </div>
    })}
</>



</div>
</div>

<div className="bg-grey-lighter px-4 gap-4 py-4 flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='cursor-pointer' width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
<form onSubmit={send_message} className='gap-4 w-[95%] flex'>
        <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="w-full woutline-none border rounded px-2 py-2" type="text"/>
        <button type='submit'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#263238" className="cursor-pointer" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </button>
</form>
</div>
</div> : <div className='w-full bg-gray-50 flex items-center justify-center'>
        <h1 className='font-normal text-xl '>Please choose a friend to chat with.</h1>
    </div>}
</>
}

export default ChatWindow