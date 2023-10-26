import Link from "next/link"

const Header = () => {

  return (
    <header>
    <nav className="shadow-md w-10/12 m-auto px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <Link href="/" className="flex gap-2 items-center">
                        
                        <h2 className="font-normal text-2xl leading-6 text-gray-800">
                          SpeakSphere
                        </h2>
                        </Link>
                    </div>                

    
                    <div className=" flex space-x-5 justify-center items-center pl-2">
                        <div className="relative cursor-pointer ">
                            <Link href="/chat">
                            <svg width={24} height={24} className="cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>                            </svg>
                            </Link>
                        </div>
                        <Link href="/notification">
                        <svg className="cursor-pointer" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </Link>
                        <Link href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="rgb(63,71,83)" viewBox="0 0 448 512">
                                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                            </svg>
                        </Link>
                    </div>
            
        </div>
    </nav>
</header>
  )
}

export default Header