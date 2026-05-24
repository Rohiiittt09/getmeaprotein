import React from 'react'
import Payment from '@/components/Payment.js'

const page = async ({ params }) => {
    const user = await params
  return (<>
    <Payment user={user}  /></>
  )
  
}

export default page
