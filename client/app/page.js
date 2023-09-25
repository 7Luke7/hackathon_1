"use client"
import { useEffect } from "react";
import Header from "./main_page_comps/Header";
import { useRouter } from "next/router";
import Body from "./main_page_comps/Body";

export default function Home() {

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      useRouter().replace("/new_user")
    }
  }, [])
  return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
  )
}
