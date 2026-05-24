import Image from "next/image";
import LINK from "next/link";

export default function Home() {
  return (
  <div>
    <div className="w-screen h-84 border-b-4 flex gap-2 flex-col justify-center items-center border-gray-700">
      <h1 className=" text-[14px] md:text-3xl font-bold flex text-center  items-center">Fuel Creators with Protein <img className="w-15" src="/body1.gif" alt="" /></h1>
      <p className="sm:text-[16px] text-[10px] text-center font-semibold  ">Support your favorite creators by contributing to their daily protein goals.</p>
      <div className=" flex gap-5">
       <LINK href="/login">
          <button type="button" className="text-white text-[12px] sm:text-[18px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-sm px-4 py-2.5 sm:w-40 w-fit  text-center leading-5">Start here</button>
        </LINK>
        
          <LINK href="/dashboard">
            <button type="button" className="text-white text-[12px] sm:text-[18px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-sm px-4 py-2.5 sm:w-40 w-fit  text-center leading-5">Dashboard</button>
          </LINK>
        </div></div>

        <div className=" w-screen flex flex-col justify-center items-center pt-10">
          <div className=" text-[18px] text-center md:text-2xl text-white font-bold"><h1>Your Fans Can Buy You A Protein</h1></div>
          <div className="flex flex-col md:flex-row justify-around w-4/5 mt-10">
            <div className=" flex flex-col gap-3 items-center justify-center">
              <img className="rounded-full w-20 h-20" src="/compp.webp" alt="" />
              <h3 className="font-bold text-white">Fans Wants To Help</h3>
              <h5 className="text-slate-400 text-center">Your Fans Are Available To Support You</h5>
            </div>
            <div className=" flex flex-col gap-3 items-center justify-center">
              <img className="rounded-full w-20 h-20" src="/gold.gif" alt="" />
              <h3 className="font-bold text-white">Fans Wants To Contribute</h3>
              <h5 className="text-slate-400 text-center">Your Fans Want To Support You Financially</h5>
            </div>
            <div className=" flex flex-col gap-3 items-center justify-center">
              <img className="rounded-full w-20 h-20" src="/com.gif" alt="" />
              <h3 className="font-bold text-white">Fans Wants To Collaborate</h3>
              <h5 className="text-slate-400 text-center">Your Fans Are Ready To Work With You</h5>
            </div>
          </div>
        </div>
  </div>
  );
}
