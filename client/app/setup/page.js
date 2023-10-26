"use client";
import React, { cloneElement, useEffect, useState } from "react";
import hobbies from "../../hobbies.json";
import axios from "axios";
import { useRouter } from "next/navigation";
import { check_access_token } from "../check_token";
import AddLanguage from "../AddLanguage";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    gender: "",
    interests: [],
    languagesLearning: [],
  });

  const [hobbiesArray, setHobbiesArray] = useState(hobbies);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleHobbies, setToggleHobbies] = useState(false);

  const Router = useRouter();
  useEffect(() => {
    check_access_token(setLoading, Router);
    if (loading) {
      const get_user_data =  async () => {
        try {
          let token =
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken"))
              ?.split("=")[1] || sessionStorage.getItem("accessToken");
    
          const request = await fetch(`${process.env.URL}/dashboard`, {
            method: "GET",
            cache: "reload",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          const userData = await request.json();
    
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
      get_user_data()
    }
  }, [loading, Router]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (user.gender === "") {
        setError("");
        setError("Please select a gender.");
        return;
      }
      if (user.interests.length < 3) {
        setError("");
        setError("You must choose at least 3 hobbies.");
        return;
      }
      if (user.languagesLearning.length < 1) {
        setError("");
        setError("You mush choose at least one language.");
        return;
      }

      let token =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken"))
          ?.split("=")[1] || sessionStorage.getItem("accessToken");

      const request = await axios.put(
        `${process.env.URL}/setup_profile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      Router.push("/");
    } catch (error) {}
  };

  const hobbie_handler = (hobbie) => {
    setHobbiesArray((prevState) => {
      const filt = prevState.filter((h) => h.id !== hobbie.id);
      return filt;
    });

    setUser((prevState) => {
      return {
        ...prevState,
        interests: [...prevState.interests, hobbie.value],
      };
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [user, error]);

  const clearSelectedLanguages = () => {
    setUser((prevState) => {
      return {
        ...prevState,
        interests: [],
      };
    });
  };

  const deleteSingleSelectedLanguage = (targetedHobbie) => {
    setUser((prevState) => {
      return {
        ...prevState,
        interests: [...prevState.interests].filter((h) => h !== targetedHobbie),
      };
    });
  };

  const handlerToggleHobbies      = () => {
    setToggleHobbies((prev) => !prev);
  };

  return (
    <>
      {loading && (
        <div>
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
            <div className="flex justify-center">
            <div className="w-96 px-3">
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
                id="grid-last-name"
                type="text"
              />
            </div>
            <div className="w-96">
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
                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
              >
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            </div>
            <div className="flex gap-16">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Add language
                </label>
                <div className="flex gap-5">
                  {cloneElement(
                    <AddLanguage>
                  
                  </AddLanguage>,
                  {user, setUser}
                  )}
                </div>
              </div>
              <div className="relative w-80">
                <label
                  htmlFor="hobbies"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Choose hobbies
                </label>
                <div className=" p-2  rounded-md rounded-bl-none rounded-br-none flex justify-between">
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-hidden overflow-y-auto">
                    {user.interests.map((i, index) => {
                      return (
                        <div
                          className="text-xs flex items-center justify-center  rounded-md p-2 bg-slate-200"
                          key={index}
                        >
                          <span className="p-1">{i}</span>
                          <button
                            type="button"
                            onClick={() => deleteSingleSelectedLanguage(i)}
                          >
                            <span className="font-medium text-ss p-1.5 rounded-[50%] text-black bg-slate-100">
                              X
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col justify-between">
                    <button type="button" onClick={clearSelectedLanguages}>
                      X
                    </button>
                    <button type="button" onClick={handlerToggleHobbies}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                    </button>
                  </div>
                </div>
                {toggleHobbies && (
                  <div className="flex items-center flex-col w-80 fixed rounded-md rounded-tl-none rounded-tr-none h-52 overflow-hidden overflow-y-auto z-50">
                    {hobbiesArray.map((h) => {
                      return (
                        <button
                          type="button"
                          className="p-1 w-full list-none hover:bg-sky-600 hover:text-white"
                          key={h.id}
                          onClick={() => hobbie_handler(h)}
                          value={h.value}
                        >
                          <li className="decoration-none ">{h.label}</li>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <span className="text-sm font-semibold text-red-600">{error}</span>
            <button
              type="submit"
              className="static z-10 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Page;
