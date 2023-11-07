"use client"
import Image from 'next/image'
import { FriendsContext } from '../chatcontext'
import { useContext } from 'react'

const Sidebar = ({currentUser, save_user_to_session}) => {
    const friends = useContext(FriendsContext)

  return (
    <div className="w-1/3 border flex flex-col">

                        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                            <div>
                                <Image alt="seome" className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                            </div>
                        </div>


                        <div className="py-2 px-2 bg-grey-lightest">
                            <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat"/>
                        </div>

                        <div className="bg-grey-lighter flex-1 overflow-auto">
                            {friends.map((f, i) => {
                                return <div key={i} onClick={() => save_user_to_session(f)} className={`px-3 border-b ${!currentUser.userId && JSON.parse(sessionStorage.getItem("ucw"))?.userId === f.id ? "bg-gray-200" : currentUser.userId === f.id ? "bg-gray-200" : ""} border-grey-lighter flex items-center bg-grey-light`}>
                                <div>
                                    <Image className="h-12 w-12 rounded-full" alt="some"
                                         src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                                </div>
                                <div className="ml-4 flex-1 py-4">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-grey-darkest">
                                            {f.username}
                                        </p>
                                        <p className="text-xs text-grey-darkest">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p className="text-grey-dark mt-1 text-sm">
                                        Get Andrés on this movie ASAP!
                                    </p>
                                </div>
                            </div>
                            })}
                        </div>

                    </div>
    )
}

export default Sidebar
