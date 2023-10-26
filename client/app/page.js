"use client"
import { useEffect, useState } from "react";
import Header from "./main_page_comps/Header";
import { useRouter } from "next/navigation";
import Body from "./main_page_comps/Body";
import { check_access_token } from "./check_token";

export default function Home() {

  const [loading, setLoading] = useState(false)
  const Router = useRouter()

  useEffect(() => {
    check_access_token(setLoading, Router)
  }, [Router])
  return (
    <>
     {loading &&  <div>
      <Header></Header>
      <Body></Body>
     </div>}
    </>
  )
}