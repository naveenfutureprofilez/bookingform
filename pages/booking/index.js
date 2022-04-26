import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePicker from "react-datepicker";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "react-datepicker/dist/react-datepicker.css";
import Popup from '../elements/Popup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spin from '../elements/Spin';
export default function booking({locations}) {
  const [openModal, setOpenModal] = useState(true);
  const [bookingDone, setBookingDone] = useState();
  const [bookingDate, setBookingDate] = useState();
  const [noslots, setnoslots] = useState(true);
  const [load, setLoad] = useState();
  const [slots, setSlots] = useState([]);
  const [location, setLocation] = React.useState('');
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [bookingId, setBookingId] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };



  let nameattr, valueattr;
  const handleInput = (e) => {
    nameattr = e.target.name;
    valueattr = e.target.value;
    setFormData({ ...formData, [nameattr]: valueattr });
  }
 
  function handleTimeSlot(e){
    const value = e.target.value;
    setTime(value);
    setnoslots(false);
  }

  const acceptForm = async () => {
    const response = await fetch('http://192.168.1.44/funnelfit/public/api/create-prospect', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gym_location_id: location
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json();
      toast.error("success");
    }).then((jsonResp) => {
      if (jsonResp.status) {
        setStep1(false);
        setStep2(true);
        setBookingId(jsonResp.booking);
      } else {
        if (jsonResp.errors) {
          const errors = jsonResp.errors;
          Object.keys(errors).map((key) => {
            let err = errors[key];
            err.map((m, i) => {
              toast.error(m);
            });
          });
        }
      }
    }).catch(error => {
      toast.error("Server Error");
      console.log("server error", error);
    });
  }

  const handleDateChange = async (d) => {
    const dt = d.getFullYear() + '-' + months[d.getMonth()] + '-' + d.getDate();
    setDate(d.getFullYear() + '-' + months[d.getMonth()] + '-' + d.getDate());
    setBookingDate( d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear() );
    setStartDate(d);
    console.log('date', d.getFullYear() + '-' + months[d.getMonth()] + '-' + d.getDate());
    console.log("startDate", startDate);
    const response = await fetch('http://192.168.1.44/funnelfit/public/api/get-slots', {
      method: 'POST',
      body: JSON.stringify({ date: dt }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json();
      toast.error("success");
    }).then((jsonResp) => {
      setSlots('');
      if (jsonResp.status) {
        setSlots(jsonResp.slots);
      } else {
        console.log(jsonResp.errors);
      }
    }).catch(error => {
      console.log("server error", error);
    });
  }

  async function finalizeBooking(){
    setLoad(true);
    const response = await fetch(`http://192.168.1.44/funnelfit/public/api/${bookingId}/finalize-prospect`, {
      method: 'POST',
      body: JSON.stringify({ 
        date: date,
        time: time,
       }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json();
      toast.error("success");
    }).then((jsonResp) => {
      if (jsonResp.status) {
        setLoad(false);
        setBookingDone(jsonResp.status);
        toast.success("Booking Created !!");
      } else {
        console.log(jsonResp.errors);
      }
    }).catch(error => {
      console.log("server error", error);
    });
  }

  console.log("locations", locations);
  return <>
    <div className='pageWrap'>
      {/* step 1 */}
      {step1 ? <>
        <div className='formBooking' >
          <h2 className='heading border-bottom' >Booking</h2>
          <p className='blue-text' >Enter your Basic Booking Information</p>
          <div className='formOuter'>
            <div class="field__wrap">
              <input class="field__input"  
                onChange={handleInput} value={formData.name}
                type="text" name="name"
                placeholder="Your Name" autocomplete="none"
                />
              <div class="field__icon">
                <AccountCircleIcon />
              </div>
            </div>
            <div class="field__wrap">
              <input class="field__input" 
                onChange={handleInput} value={formData.phone}
                type="text" name="phone" placeholder="Phone" 
                autoComplete="none" />
              <div class="field__icon">
                <PhoneIcon />
              </div>
            </div>
            <div class="field__wrap"> 
              <input class="field__input"  
                onChange={handleInput} value={formData.email}
                type="email" name="email" placeholder="example@gmail.com" 
                autoComplete="none" />
              <div class="field__icon">
                <MailOutlineIcon />
              </div>
            </div>
            <div class="field__wrap select-wrap">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gym Location</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  onChange={handleChange} >
                  {Object.entries(locations).map(([key, value], i) => 
                    <MenuItem key={i} value={key}> {value} </MenuItem>
                  )}
                </Select>
              </FormControl>
              <div class="field__icon">
                <EditLocationIcon />
              </div>
            </div>
            <button class="mainbtn" onClick={acceptForm} >Continue</button>
          </div>
          <p className='grey-text'>You will opt in o Text Messages for this. Booking & Specials. Message & Data Rates may Apply. Reply <span>STOP</span> to opt out.</p>
        </div>
      </> : ''}
      {/* step 2 */}
      {step2 ? <>
        <div className='dateTimePicker position-relative'  >
          { load ?  <Spin /> : '' }
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
                  dateFormat="dd-MM-yyyy"
                  selected={startDate}
                  onChange={(date) => handleDateChange(date)}
                  strictParsing filterTime={filterPassedTime} />
              </div>
              <div className='avilableSlot' >
                {slots ? <>
                  <h2>Available Slots</h2>
                  <div className='slotList' >
                    {Object.entries(slots).map(([key, m], i) => <>
                      <div key={i} className='slot' >
                        <input onChange={handleTimeSlot} type="radio" id={`slot${m.slot_start_time}`} value={m.slot_start_time} name="slot" />
                        <label htmlFor={`slot${m.slot_start_time}`} >{m.slot_start_time}</label>
                      </div>
                    </>)}
                  </div>
                </>
                : <p className='NotimeSlot' >No Time Slots Available !!</p>}
              </div>
            </div>
            <button disabled={noslots} onClick={finalizeBooking}
            className='mainbtn reschedule'>Create Booking</button>
             {bookingDone ? <>
             <Popup status={openModal} >
              <div className='thankyouPopup' >
                <img src='/thankyou.png' width="140px" height="140px" className='thankyouImage' />
                <h2>Booking Successful!</h2>
                <h3>{bookingDate} by {time}</h3>
                <p className='grey-text'>Booking Detals has been sent to your <br></br>email: <strong>{formData.email}</strong></p>
              </div>
            </Popup> </> : ''} 
          </div>
        </div>
      </> : ''}
    </div>
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
}
export async function getStaticProps(context) {
  const res = await fetch(`http://192.168.1.44/funnelfit/public/api/gyms`)
  const locations = await res.json()
  if (!locations) {
    return {
      notFound: true,
    }
  }
  return {
    props: {locations}, 
  }
}


