"use client"
import { useEffect, useState } from "react";
import Header from "./main_page_comps/Header";
import { useRouter } from "next/navigation";
import Body from "./main_page_comps/Body";

export default function Home() {

  const [loading, setLoading] = useState(false)
  const Router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      return Router.replace("/new_user")
    } else {  
      setLoading(true)
    }
  }, [])
  return (
    <>
     {loading &&  <div>
      <Header></Header>
      <Body></Body>
     </div>}
    </>
  )
}
