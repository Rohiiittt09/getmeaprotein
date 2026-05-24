"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateuser } from "@/action/useraction.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [form, setForm] = useState({});
  const [ff, setff] = useState();
  
  
  const getdata = async () => {
    if (session?.user?.name) {
      const data = await fetchuser(session.user.name);
      console.log(session.user.name);
      setForm(data);
    }
  };
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    getdata();

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };
  
  const handlesubmit = async (e) => {
    await updateuser(e, session.user.name)
     ;
    toast("🦄 Profile Updated Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="text-white mt-20 ">
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
      <div className="md:text-4xl text-[18px] text-center text-white font-bold text-center">
        Welcome To Your Dashboard
      </div>
      <div className=" w-full md:w-3/5 flex-col mx-auto flex  items-center justify-center mt-10">
        <form action={handlesubmit} className="w-full p-5 rounded-2xl ">
          <div className="mb-5 w-full  ">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Name
            </label>
            <input
              value={form.name || ""}
              onChange={handlechange}
              name="name"
              type="text"
              id="email-alternative"
              className="bg-neutral-secondary-medium  border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full  msxau px-3 py-2.5 shadow placeholder:text-body"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-5 w-full ">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              {" "}
              Email
            </label>
            <input
              value={form.email || ""}
              onChange={handlechange}
              name="email"
              type="email"
              id="email-alternative"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full msxau px-3 py-2.5 shadow placeholder:text-body"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5 w-full ">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Username
            </label>
            <input
              value={form.username || ""}
              onChange={handlechange}
              name="username"
              type="text"
              id="email-alternative"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full msxau px-3 py-2.5 shadow placeholder:text-body"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-5 w-full ">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Profile Picture
            </label>
            <input
              value={form.profilePicture || ""}
              onChange={handlechange}
              name="profilePicture"
              type="text"
              id="email-alternative"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full msxau px-3 py-2.5 shadow placeholder:text-body"
              placeholder="profile picture"
              required
            />
          </div>
          <div className="mb-5 w-full ">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Cover Picture
            </label>
            <input
              value={form.coverPicture || ""}
              onChange={handlechange}
              name="coverPicture"
              type="text"
              id="email-alternative"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full msxau px-3 py-2.5 shadow placeholder:text-body"
              placeholder="cover picture"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium bg-blue-500 w-full msxau text-center rounded-4xl cursor-pointer shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
