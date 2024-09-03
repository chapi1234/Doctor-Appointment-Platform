import React from 'react'
// import converTime from '../../utils/convertTime'

const sidePanel =(doctorId, ticketPrice,timeSlots)=> {
  const bookingHandler = async()=> {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
        method:'post',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error(data.message + 'Please try again')
      }

    if(data.session.url){
      window.location.href = data.session.url
    }
    } catch (error) {
      toast.error(err.message)
    }
  }
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
        <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">Card Price</p>
            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
             500 Birr
            </span>
        </div>
        <div className="mt-[30px]">
          <p className="text__para mt-0 font-semibold text-black">
            Available Time Slots:
          </p>
          <ul className="mt-3">
            <li className="flex flex-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-black font-semibold">
                Sunday
              </p>
              <p className="text-[15px] leading-6 text-black font-semibold">
                4:00 - 9:00 PM
              </p>
            </li>
            <li className="flex flex-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-black font-semibold">
                Tuesday
              </p>
              <p className="text-[15px] leading-6 text-black font-semibold">
                4:00 - 9:00 PM
              </p>
            </li>
            <li className="flex flex-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-black font-semibold">
                Wednesday
              </p>
              <p className="text-[15px] leading-6 text-black font-semibold">
                4:00 - 9:00 PM
              </p>
            </li>
          {/* {timeslots?.map((item, index)=> {
              <li key={index} className="flex flex-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-black font-semibold">
                {item.day.charAt(0).toUppercase() + item.day.slices(1)}
              </p>
              <p className="text-[15px] leading-6 text-black font-semibold">
                {converTime(item.startingTime)} -{converTime(item.endingTime)}
              </p>
            </li> 

          })} */}
        
         
        </ul>
      </div>
      <button onclick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  )
}

export default sidePanel
