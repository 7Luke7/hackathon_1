"use client"
import React, { cloneElement, useState } from 'react'
import languages from "../../languages.json";
import Select from "react-select";
import axios from 'axios';
import DisplayUsers from './DisplayUsers';
import { useRouter } from 'next/router';

const Body = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [error, setError] = useState("")
    const [usersRetrieved, setUsersRetrieved] = useState(false)
    
    const languagesHandler = (e) => {
        const new_only_language_array = e.map((lang) => {
            return lang.value
        })
        setSelectedLanguages(new_only_language_array)
    }

    const find_match_handler = async (e) => {
        try {
            e.preventDefault()
            const token = localStorage.getItem("token")
            const request = await axios({
                method: "POST", 
                url: `http://localhost:5000/api/v1/pair_user`,
                data: JSON.stringify({language: selectedLanguages}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })

            console.log(request.data)
            localStorage.setItem("userArray", JSON.stringify(request.data))
            setUsersRetrieved(true)
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                localStorage.removeItem("userArray")
                setUsersRetrieved(true)
                setError("")
                setError(error.response.data.message)
                setTimeout(() => {
                    setError("")
                }, 3000)
            }
        }
    }

    return (
    <div className="flex flex-col items-center justify-center">
        <h1 className='pt-36 text-slate-900 pb-5 font-medium text-3xl'>
            Match People
        </h1>      
      <div className='h-96 w-8/12 flex'>
        <div className='bg-slate-800 w-6/12 flex flex-col items-center justify-center'>
        <form onSubmit={find_match_handler} className='flex flex-col items-center justify-center'>
            <Select
              id={languages.forEach((l) => l.id)}
              isMulti
              name="languages"
              onChange={languagesHandler}
              options={languages}
              className="basic-multi-select w-60 mb-8"
              classNamePrefix="select"
            />
            <button type='submit' className='bg-amber-500 px-7 py-2 text-slate-100 font-bold'>
                Find a Match
            </button>
        </form>
        <span className="text-sm font-semibold text-red-600">{error}</span>
            
        </div>
        <div className='border-2 overflow-auto border-slate-800 border-l-0 rounded-tr-md rounded-br-md w-6/12'>
            {cloneElement(
                <DisplayUsers>
                
            </DisplayUsers>,
            {usersRetrieved, setUsersRetrieved}
            )}
        </div>
      </div>
    </div>
  )
}

export default Body