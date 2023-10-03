"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import languages from "../../languages.json";
import hobbies from "../../hobbies.json";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    gender: "",
    interests: [],
    languagesLearning: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState("")
  const [proficiency, setProficiency] = useState("")
  const [open, setOpen] = React.useState(false);
 
  const Router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      Router.replace("/new_user")
    }   else {
      setLoading(true)
    }
  }, [])
  
  const handleOpen = () => setOpen(!open);
  
  const get_user_data = async () => {
    const token = localStorage.getItem("accessToken")

    try {
      const request = await axios.get(
        `${process.env.URL}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userData = request.data;

      setUser({
        username: userData.username,
        gender: userData.gender,
        interests: userData.interests,
        languagesLearning: userData.languagesLearning,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        Router.replace("/login");
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (user.gender === "") {
        setError("")
        setError("Please select a gender.");
        return;
      }
      if (user.interests.length < 3) {
        setError("")
        setError("You must choose at least 3 hobbies.")
        return
      }
      if (user.languagesLearning.length < 1) {
        setError("")
        setError("You mush choose at least one language.")
        return
      }

      const token = localStorage.getItem("accessToken")
      const request = await axios.put(`${process.env.URL}/setup_profile`, user, {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
    })

      Router.push("/")
  } catch (error) {}
  };

  const language_handler = () => {
    const proficiencies = ["Beginner", "Intermediate", "Fluent"]

    proficiencies.forEach((prof) => {
      if (proficiency === prof && lang !== "") {
        user.languagesLearning.forEach((l) => {
          if (l.language === lang) {
            return
          }
        })
        setUser((prev) => {
          return {
            ...prev,
            languagesLearning: [...prev.languagesLearning, {language: lang, proficiency: proficiency}]
          }
        })
      }
    })
    
    setOpen(false)
  };

  const hobbie_handler = (e) => {
    const hobbies = e.map((hobbie) => hobbie.value);

    setUser((prevState) => ({
      ...prevState,
      interests: hobbies,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setError("")
    }, 5000)
  }, [user, error]);

  useEffect(() => {
    if (loading) {
      get_user_data();
    } else {
      return
    }
  }, [loading]);
  return (
    <>
      {loading && <div>
      <div className="text-center mt-20">
        <h1 className="text-3xl text-gray-800 font-bold">
          Complete forms for full website access.
        </h1>
      </div>
      <div className="flex items-center pt-5 p-2 gap-2 flex-col text-white">
        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus "
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div className="font-medium uppercase text-teal-600">Account</div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-10 gap-10 justify-center"
      >
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Username
          </label>
          <input
            onChange={(e) =>
              setUser((prevState) => {
                return { ...prevState, username: e.target.value };
              })
            }
            value={user.username}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="countries"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Select your Gender
          </label>
          <select
            value={user.gender}
            onChange={(e) =>
              setUser((prevState) => {
                return { ...prevState, gender: e.target.value };
              })
            }
            id="countries"
            className="bg-gray-200 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Choose gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex gap-16">
          <div className="w-80">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Add language
            </label>
            <div>
      <Button onClick={handleOpen} className="text-green-500" variant="outlined">
        Open Dialog
      </Button>
      <Dialog
        className="absoulte w-96 bg-gray-400 top-1/2 right-1/2 left-1/4"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-slate-100">Add Language.</DialogHeader>
        <DialogBody divider className="p-2">
        <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                  <Select
                    options={languages}
                    onChange={(e) => setLang(e.value)}
                  />
                  </div>
                  <div className="relative">
                    <select
                      onChange={(e) => setProficiency(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Proficiency</option>
                      {["Beginner", "Intermediate", "Fluent"].map(
                        (option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  
                </div>
            </div>
        </DialogBody>
        <DialogFooter className="flex justify-end">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={language_handler}>
            <span className="text-sm text-green-400">Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="w-64">
      {user.languagesLearning.length > 0 ? <table className="w-64 flex flex-col text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs flex justify-around uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Language
                </th>
                <th scope="col" className="px-6 py-3">
                    Proficiency
                </th>
            </tr>
        </thead>
        <tbody className="w-full border-b bg-gray-900 border-gray-700">
                  {user.languagesLearning.map((l, i) => {
                  return <tr key={i} className="flex justify-around">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {l.language}
                </th>
                <td className="px-6 text-left py-4">
                    {l.proficiency}
                </td>
                  </tr>
                })}
            </tbody>
            </table> : ""}
      </div>
    </div>
          </div>
          <div className="w-80">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Choose hobbies
            </label>
            <Select
              id={hobbies.forEach((l) => l.id)}
              value={user.interests.map(hobby => ({
                value: hobby,
                label: hobby
              }))}
              isMulti
              name="hobbies"
              onChange={hobbie_handler}
              options={hobbies}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-red-600">{error}</span>
        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </button>
      </form>
    </div>}
    </>
  );
};

export default Page;
