"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import {initiate,paymentdata,fetchuser} from "@/action/useraction.js"
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'



const Payment = ({user}) => {
    const [ff, setff] = useState({})
    const getdata = async()=>{
        const data = await paymentdata(user.username)
        
        setpaydata(data)
    }
    const {data:session} = useSession()
    const [paydata, setpaydata] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams();
    const getprofiledata = async()=>{
        const a = await fetchuser(user.username)
        setff(a)
    }
    useEffect(() => {
        if(searchParams.get("success")=="true"){
            toast("🦄 Thanks for your payment!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                router.push(`/${user.username}`)
        }
        getprofiledata()
        getdata()
    }, [])
    
    
    const [form, setform] = useState({username: user.username,name:"",message:"",amount:""})
    const handlechange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const pay = async (amount)=>{
        const a = await initiate(amount,session?.user.name,form)
       const orderId = a.id
        var options = {
    "key": "rzp_test_SoloSHPUQrkhv5", // Enter the Key ID generated from the Dashboard
    "amount": amount, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "get me a protein", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost:3000/api/razorpay",
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

var rzp1 = new Razorpay(options);
rzp1.open();
    
    }
    if(!ff){
   return <div className='text-white mt-20'>Loading...</div>}

if(ff.username !== user.username){
   return <div className='text-white text-2xl mt-20'>
      User not found
   </div>
}
  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <ToastContainer className={"z-40 mt-15 relative "}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    <div className='relative pb-5  '>
      <div className='w-screen bg-cover h-80 md:h-120 overflow-hidden  '><img className=' w-full bg-cover h-full  object-cover object-center' src={ff.coverPicture || "https://www.treehugger.com/thmb/jjmu2SyQFUMGXC887qxcgE_6WvQ=/4308x2884/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2013__02__saturnvoyager-4d4819cec3c845c8a90eaa348319a08f.jpg"} alt="" /></div>
      <div className='absolute w-screen top-65 md:top-105 flex-col  flex items-center justify-center'>
        <div className=' h-30 w-30 rounded-full flex justify-center'><img className='w-full border object-center bg-center h-full rounded-full' src={ff.profilePicture||"https://www.treehugger.com/thmb/jjmu2SyQFUMGXC887qxcgE_6WvQ=/4308x2884/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2013__02__saturnvoyager-4d4819cec3c845c8a90eaa348319a08f.jpg"} alt="" /></div>
        <div className='  text-center flex flex-col gap-2'><h1 className='md:text-2xl text-[18px] text-white font-bold'>@{ff.username}</h1>
        <p className='text-slate-100/50 text-[12px] sm:text-[18px] '>Creating Space Arts</p>
        <p className=' text-slate-100/50 text-[12px] sm:text-[18px] '>9,876 Member . 56 Posts . $1,499/Months</p>
        <p></p>
        </div>
      </div>
      <div className=' w-screen flex md:flex-row flex-col justify-center gap-5 mt-50'>
        <div className='md:w-2/6 w-4/5 mx-auto h-100 bg-slate-800 p-2 rounded-2xl'>
        <h1 className=' text-[18px] md:text-3xl font-bold'>Supporst</h1>
        <ul className=' text-lg  ml-5 text-white/70 mt-5'>
        {paydata.map((e)=>{
            return <li className='text-[12px] sm:text-[18px]' key={e.oid} >{e.name} donated  Rs{e.amount/100} with a message "{e.message}"</li>
        })}
        </ul>
        </div>
        <div className='md:w-2/6 w-4/5 mx-auto h-100 rounded-2xl p-2 bg-slate-800'>
        <h1 className=' text-[18px] sm:text-3xl font-bold '>Make A Payment</h1>
        <div className=' w-full m-3 flex mt-10 flex-col gap-5 mx-auto'>
            <input onChange={(e)=>{handlechange(e)}} className='w-full text-[14px] sm:text-[18px] rounded-2xl p-1 bg-slate-600 text-white placeholder:text-slate-400 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='name' placeholder='Enter Name' />
        <input onChange={(e)=>{handlechange(e)}} className=' w-full text-[14px] sm:text-[18px] rounded-2xl p-1 bg-slate-600 text-white placeholder:text-slate-400 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='message' placeholder='Enter Message' />
        <input onChange={(e)=>{handlechange(e)}}  className=' w-full text-[14px] sm:text-[18px] rounded-2xl p-1 bg-slate-600 text-white placeholder:text-slate-400 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='amount' placeholder='Enter Amount' />
        <button type="button" onClick={()=>{pay(form.amount*100)}}  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl  text-sm px-4 py-2.5 cursor-pointer text-[18px] text-center leading-5">Pay</button>
        </div>
        <div className=' flex gap-3'>
            <div className=' text-white bg-slate-600 rounded-2xl w-15 text-center cursor-pointer py-2 ' onClick={() => pay(1000)}><h1>$10</h1></div>
            <div className=' text-white bg-slate-600 rounded-2xl w-15 text-center cursor-pointer py-2 ' onClick={() => pay(2000)}><h1>$20</h1></div>
            <div className=' text-white bg-slate-600 rounded-2xl w-15 text-center cursor-pointer py-2 ' onClick={() => pay(3000)}><h1>$30</h1></div>
        
        </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Payment
