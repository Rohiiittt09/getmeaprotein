"use server"
import Razorpay from "razorpay"
import mongoose from "mongoose";
import payment from "@/model/payment.js";   
import user from "@/model/user.js";
import { error } from "console";


export const initiate = async (amount,to_user,form) => {
    const db = await mongoose.connect(process.env.MONGODB_URI)
    var instance = new Razorpay({ key_id: 'rzp_test_SoloSHPUQrkhv5', key_secret: 'pqBvd62I4WcpNjpWn1PqYWj4' })
    let options = {
        amount:Number.parseInt(amount),
        currency:"INR"
    }
    const order = await instance.orders.create(options)
    await payment.create({name:form.name,
        to_user:to_user,
        email:form.email,
    oid:order.id,
    message:form.message,
    amount:amount})
    return order    
}

export const paymentdata = async (to_user)=>{

 await mongoose.connect(
   process.env.MONGODB_URI
 )

 const data=await payment
 .find({to_user:to_user,status:true})
 .lean()

 return data.map(item=>({
    ...item,
    _id:item._id.toString(),
    createdAt:
      item.createdAt?.toString()
 }))
}
 export const fetchuser = async(username)=>{
    await mongoose.connect(
   process.env.MONGODB_URI
 )
    
 const u = await user.findOne({username}).lean()
  if(!u){
    throw new error("User not found")
  }
 return {
   ...u,
   _id:u._id.toString()
 }
}

export const updateuser = async(data,oldusername)=>{

    await mongoose.connect(
   process.env.MONGODB_URI
 )

 let ndata = Object.fromEntries(data)
 if(ndata.username!==oldusername){
    let x = await user.findOne({username:ndata.username})
    if(x){
        return({error:"username already exist"})
    }
 }
  await user.updateOne({email:ndata.email},ndata)
  await payment.updateMany({to_user:oldusername}, {to_user:ndata.username})
  

}


