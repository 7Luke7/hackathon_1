export const check_access_token = (setLoading, Router) => {
    const cookieToken = document.cookie.split("; ").find((row) => row.startsWith("accessToken"))?.split("=")[1]
    const sessionToken = sessionStorage.getItem("accessToken")
    if (!cookieToken && !sessionToken) {
      return Router.replace("/new_user")
    } else {  
      setLoading(true)
    }
}