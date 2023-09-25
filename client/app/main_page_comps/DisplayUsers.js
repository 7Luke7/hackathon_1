import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const DisplayUsers = ({usersRetrieved, setUsersRetrieved}) => {
    const [users, setUsers] = useState([])
  
    useEffect(() => {
        setUsers([])
        const storedArray = localStorage.getItem('userArray');
        if (storedArray) {
            setUsers(JSON.parse(storedArray));
        }
        console.log(usersRetrieved, users)
        setUsersRetrieved(false)
      }, [usersRetrieved]);

      const send_request = async (id) => {
        const token = localStorage.getItem("accessToken")
        try {
        const request = await axios.post(`${process.env.URL}/send_connection`, {receiverId: id}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (request.status === 200) {
        alert("request sent!")
      }
    } catch (error) {
      console.log(error)
    }
      }
  return (
    <div className='w-full h-full'>
  <table className='w-full'>
      {users.length > 0 && <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" className="px-3 py-3">
            Username
          </th>
          <th scope="col" className="px-3 py-3">
            Age
          </th>
          <th scope="col" className="px-3 py-3">
            Language
          </th>
          <th scope="col" className="px-3 py-3">
            Connect
          </th>
          <th scope="col" className="px-3 py-3">
            Profile
          </th>
        </tr>
      </thead>} 
    <tbody>
          {users.map((user) => (
            <tr className="w-full bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={`${user._id}`}>
            <td className="px-6 text-center py-4">
              {user.username}
            </td>
            <td className="px-6 text-center py-4">
              {user.age}
            </td>
            <td className="px-6 py-4 text-center">
                View all {user.languagesLearning.length}              
            </td>
            <td className="px-6 py-4 text-center">
              <button onClick={() => send_request(user._id)} className='p-2 font-medium rounded-md' style={{color: "rgb(85,94,63)", backgroundColor: "rgb(222,247,236)"}}>
              Request
              </button>
            </td>
            <td className="px-6 py-4 text-center">
              <Link href={`profile/${user._id}`} className='p-2 font-medium rounded-md' style={{color: "rgb(31,79,192)", backgroundColor: "rgb(219,234,254)"}}>
                View
              </Link>
            </td>
          </tr>
          ))}
    </tbody>
  </table>
</div>
  

  )
}

export default DisplayUsers