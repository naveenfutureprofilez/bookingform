import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function booking() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  function nextstep2() {
    setStep1(false);
    setStep2(true);
  }
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };


  return <>
    <div className='pageWrap'>
      {/* step 1 */}
      {step1 ? <>
        <div className='formBooking' >
          <h2 className='heading border-bottom' >Booking</h2>
          <p className='blue-text' >Enter your Basic Booking Information</p>
          <div className='formOuter'>
            <div class="field__wrap">
              <input class="field__input" value="John Deo" type="text" name="name" placeholder="Your Name" />
              <div class="field__icon">
                <AccountCircleIcon />
              </div>
            </div>
            <div class="field__wrap">
              <input class="field__input" value="+1234567890" type="text" name="phone" placeholder="Phone" />
              <div class="field__icon">
                <PhoneIcon />
              </div>
            </div>
            <div class="field__wrap">
              <input class="field__input" value="example@gmail.com" type="email" name="email" placeholder="Your email" />
              <div class="field__icon">
                <MailOutlineIcon />
              </div>
            </div>
            <div class="field__wrap select-wrap">
              <select class="field__input select select_small"  >
                <option>Zym Location</option>
                <option>My Location</option>
              </select>
              <div class="field__icon">
                <EditLocationIcon />
              </div>
            </div>
            <button class="mainbtn" onClick={nextstep2} >Continue</button>
          </div>
          <p className='grey-text'>You will opt in o Text Messages for this. Booking & Specials. Message & Data Rates may Apply. Reply <span>STOP</span> to opt out.</p>
        </div>
      </> : ''}
      {/* step 2 */}
      {step2 ? <>
        <div className='dateTimePicker'  >
          <div className='grey-bg' >
            <div className='secTitle'>
              <h2>Date & Time</h2>
            </div>
            <p className='grey-text' >Choose an appropriate Date and Time for Create a booking for you.</p>
            <div className='timeDateSelector'>
              <div className='d-selector mb-2' >
                <label>Date</label>
                <CalendarMonthIcon />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  strictParsing  filterTime={filterPassedTime} />
              </div>
              <div className='d-selector mb-2' >
                <label>Time</label>
                <AccessTimeIcon />
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30} filterTime={filterPassedTime}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                /> 
              </div>
            </div>
            <button className='mainbtn reschedule'>Reschedule</button>
          </div>
        </div>
      </> : ''} 
    </div>
  </>
}
