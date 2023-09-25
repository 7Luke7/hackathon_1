"use client"
import { useEffect } from "react";
import Header from "./main_page_comps/Header";
import { useRouter } from "next/navigation";
import Body from "./main_page_comps/Body";

export default function Home() {

  const Router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      Router.replace("/new_user")
    }
  }, [])
  return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
  )
}
