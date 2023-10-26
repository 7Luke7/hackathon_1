"use client"
import React, { cloneElement, useEffect, useState } from 'react'
import languages from "../../languages.json";
import Select from "react-select";
import axios from 'axios';
import DisplayUsers from './DisplayUsers';

const Body = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [error, setError] = useState("")
    const [usersRetrieved, setUsersRetrieved] = useState(false)
    
    useEffect(() => {
        const languages = sessionStorage.getItem("selectedLanguages")
        if (languages) {
            setSelectedLanguages(JSON.parse(languages))
        } else {
            return 
        }
    }, [])

    const languagesHandler = (e) => {
        setSelectedLanguages(e)
        if (!e.length || e.length < JSON.parse(sessionStorage.getItem("selectedLanguages"))) {
            sessionStorage.removeItem("selectedLanguages")
        }
    }
    const find_match_handler = async (e) => {
        try {
            e.preventDefault()
            let token = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1] || sessionStorage.getItem("accessToken")
            const request = await axios({
                method: "POST", 
                url: `${process.env.URL}/pair_user`,
                data: JSON.stringify({language: selectedLanguages.map((l) => l.value)}),
                headers: {  
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })

            sessionStorage.setItem("userArray", JSON.stringify(request.data))
            sessionStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages))
            setUsersRetrieved(true)
        } catch (error) {
            if (error.response.status === 400) {
                sessionStorage.removeItem("userArray")
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
              value={selectedLanguages}
              dele
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