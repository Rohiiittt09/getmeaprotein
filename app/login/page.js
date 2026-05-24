"use client"
import { signIn,useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


import React, { useEffect } from 'react'

const page = () => {
  const {data:session, status} = useSession()
   const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router])
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <div className=' w-screen text-white mt-20  '>
        <div className='  text-center mt-10'><h1 className=' text-white font-bold  text-center text-[14px] sm:text-2xl mx-auto'>Login/Signup To Get Your Fans TO Support You</h1></div>

        <div className=' flex justify-center  items-center flex-col gap-5 mt-10'> <button onClick={()=>{signIn("google")}} className="flex w-70 justify-center items-center gap-3 bg-white border px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md">
          
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          <span className="text-gray-700 font-medium">
            Sign up with Google
          </span>

        </button>
        
        <button className="flex items-center w-70  justify-center  gap-3 bg-[#1877F2] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md">
  
  <img
    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
    alt="facebook"
    className="w-5 h-5"
  />

  <span className="font-medium">
    Continue with Facebook
  </span>

</button>
<button className="flex items-center w-70  justify-center  gap-3 bg-black text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md" onClick={()=>{signIn("github")}}>
  
  <img
    src="https://www.svgrepo.com/show/512317/github-142.svg"
    alt="github"
    className="w-5 h-5 invert"
  />

  <span className="font-medium">
    Continue with GitHub
  </span>

</button>
<button className="flex items-center w-70  justify-center gap-3 bg-[#0A66C2] text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md">
  
  <img
    src="https://www.svgrepo.com/show/448234/linkedin.svg"
    alt="linkedin"
    className="w-5 h-5 invert-100"
  />

  <span className="font-medium">
    Continue with LinkedIn
  </span>

</button>
<button className="flex items-center w-70  justify-center  gap-3 bg-black text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md">
  
  <img
     src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  alt="apple"
  className="w-5 h-5 invert"
  />

  <span className="font-medium">
    Continue with Apple
  </span>

</button>
</div>
    </div>
  )
}

export default page
