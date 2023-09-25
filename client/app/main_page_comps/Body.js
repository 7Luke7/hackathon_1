import React, { useState } from 'react'
import languages from "../../languages.json";
import Select from "react-select";
import axios from 'axios';
import { useRouter } from 'next/router';

const Body = () => {
    const token = localStorage.getItem("accessToken")
    if(!token) {
        useRouter().replace("/login")
        return
    }
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const languagesHandler = (e) => {3
        const new_only_language_array = e.map((lang) => {
            return lang.value
        })
        setSelectedLanguages(new_only_language_array)
    }

    const find_match_handler = async (e) => {
        try {
            e.preventDefault()
            const request = await axios({
                method: "POST", 
                url: "http://localhost:5000/api/v1/pair_user",
                data: JSON.stringify({language: selectedLanguages}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })

            console.log(request.data)
            console.log(request)
        } catch (error) {
            console.log(error)
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
            
        </div>
        <div className='border-2 border-slate-800 border-l-0 rounded-tr-md rounded-br-md w-6/12'>
            
        </div>
      </div>
    </div>
  )
}

export default Body