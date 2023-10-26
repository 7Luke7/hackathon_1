import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const DisplayUsers = ({usersRetrieved, setUsersRetrieved}) => {
    const [users, setUsers] = useState([])
  
    useEffect(() => {
        setUsers([])
        const storedArray = sessionStorage.getItem('userArray');
        if (storedArray) {
            setUsers(JSON.parse(storedArray));
        }
        setUsersRetrieved(false)
      }, [usersRetrieved, setUsersRetrieved]);

      
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
            Profile
          </th>
        </tr>
      </thead>} 
    <tbody>
          {users.map((user, i) => (
            <tr className="w-full border-b bg-gray-900 border-gray-700" key={i}>
            <td className="px-6 text-white text-center py-4">
              {user.username}
            </td>
            <td className="px-6 text-white text-center py-4">
              {user.age}
            </td>
            
              <td className="px-6 py-4 text-center">
              <Link className='text-blue-500 underline' href={`/profile/${user._id}`}>
                View all {user.languagesLearning.length}              
                </Link>
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