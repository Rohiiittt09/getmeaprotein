import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import payment from "@/model/payment";
import mongoose from "mongoose";
import user from "@/model/user";



export const POST = async (req)=>{
    let db = await mongoose.connect(process.env.MONGODB_URI)

    const formData = await req.formData()
    const data = {
   razorpay_payment_id:
      formData.get("razorpay_payment_id"),

   razorpay_order_id:
      formData.get("razorpay_order_id"),

   razorpay_signature:
      formData.get("razorpay_signature")
}
    let y = await payment.findOne({oid:data.razorpay_order_id})
    if(!y){
        return NextResponse.json({message:"Payment not found"}, {status:404})
    } 
     let xx = validatePaymentVerification({
            order_id: data.razorpay_order_id,
            payment_id: data.razorpay_payment_id},
             data.razorpay_signature,"pqBvd62I4WcpNjpWn1PqYWj4");
             if(xx){
                await payment.findOneAndUpdate({oid:data.razorpay_order_id}, {status:true})
                return NextResponse.redirect(`https://getmeaprotein.vercel.app/${y.to_user}/?success=true`)
             }
             else{
                return NextResponse.json({message:"Invalid signature"}, {status:400})
             }


}
