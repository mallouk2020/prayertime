
import './prayerCard.css'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ActionAreaCard from './error';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import axios from "axios";
import moment from "moment"







function Timenow() {


  const [CurrentTime, setCurrentTime] = useState("");

  // تحديث الوقت باستخدام useEffect
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = moment().format('MMMM Do YYYY, h:mm:ss a');
      setCurrentTime(now);
    };

    // تحديث الوقت فور تشغيل المكون
    updateCurrentTime();

    // تحديث الوقت كل ثانية
    const intervalId = setInterval(updateCurrentTime, 1000);

    // تنظيف المؤقت عند إلغاء تحميل المكون
    return () => clearInterval(intervalId);
  }, [])
  return (
    <p>{CurrentTime}</p>
  )
}














export default function Pryercard() {



  const [city, setcity] = useState({
    displaycaty: "المغرب",
    apiCaty: "morooco",
  });

  const SelectedCaty = [
    { displaycaty: "المغرب", apiCaty: "morooco", },
    { displaycaty: "السعودية", apiCaty: "sa", },
    { displaycaty: "الامارات", apiCaty: "uae", }
  ]


  const [time, settime] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });





  const nextprayerindex = [
    { nextprayer: " الفجر ", key: "Fajr" },
    { nextprayer: " الضهر ", key: "dhuher" },
    { nextprayer: " العصر ", key: "Asr" },
    { nextprayer: " المغرب", key: "maghrib" },
    { nextprayer: " العشاء", key: "Isha" }

  ]







  function Timelifte() {

    const momenttime = {
      Fajr: moment(time.Fajr, 'HH:mm'),
      Dhuhr: moment(time.Dhuhr, 'HH:mm'),
      Asr: moment(time.Asr, 'HH:mm'),
      Maghrib: moment(time.Maghrib, 'HH:mm'),
      Isha: moment(time.Isha, 'HH:mm'),
    };



    const timeNow = moment()

  

    // let nextprayer = ""
    let prayerIndex = nextprayerindex[0].nextprayer

    if (timeNow.isAfter(momenttime.Fajr) && timeNow.isBefore(momenttime.Dhuhr)) { prayerIndex = nextprayerindex[1].nextprayer }

    else if (timeNow.isAfter(momenttime.Dhuhr) && timeNow.isBefore(momenttime.Asr)) {
      prayerIndex = nextprayerindex[2].nextprayer
    }

    else if (timeNow.isAfter(momenttime.Asr) && timeNow.isBefore(momenttime.Maghrib)) {
      prayerIndex = nextprayerindex[3].nextprayer
    }
    else if (timeNow.isAfter(momenttime.Maghrib) && timeNow.isBefore(momenttime.Isha)) {
      prayerIndex = nextprayerindex[4].nextprayer
    } else {
      prayerIndex = nextprayerindex[0].nextprayer
    }

// conest timerOfnextprayer = ()=>{



// }
const midelnight  = moment("00:00","HH:mm") 
const leftTimeoffajr =  midelnight.diff( timeNow, 'minute') 



    console.log("الوقت الحالي:", timeNow.format("HH:mm"));
    console.log("وقت العشاء:", midelnight.format("HH:mm"));
    console.log( "الوقت المتبقي ", leftTimeoffajr)

    return prayerIndex

  }






  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          `http://api.aladhan.com/v1/timingsByAddress/26-01-2025?address=${city.apiCaty}`
        );
        settime(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };





    fetchPrayerTimes();
  }, [city]);












  const handleChange = (event) => {

    const cityobg = SelectedCaty.find((city) => {
      return city.apiCaty === event.target.value

    })

    setcity(cityobg);
  };










  function SelectedCitybar({ city }) {

    return (
      <Box sx={{ minWidth: 420 }} className={"select-box"}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city.apiCaty}
            label="city"
            onChange={handleChange}>

            {SelectedCaty.map((city) => {
              return (
                <MenuItem key={city.apiCaty} value={city.apiCaty}>{city.displaycaty} </MenuItem>)
            })}


          </Select>
        </FormControl>
      </Box>
    );
  }






  return (
    <>


      <Box sx={{ width: '94%' }}>



        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid size={6}   >

            <div> <h4 style={{ opacity: "50%", textAlign: "right" }}>الوقت المتبقي لصلاة{<Timelifte />}:</h4>
              <h1 style={{ textAlign: "right" }}>2:31:03</h1>
            </div>
          </Grid>

          <Grid size={6}>
            <div>
              <h4 style={{ opacity: "50%", textAlign: "right" }}>
                <Timenow > </Timenow>
              </h4>
              <h1 style={{ textAlign: "right" }}> {city.displaycaty} </h1>
            </div>


          </Grid>
          <Divider sx={{ color: "white", border: "solid 1px white", width: "100%", opacity: "20%" }} />
          <Grid size={12} className={"gridcontainer"}  >
            <ActionAreaCard
              img="https://cdn.arabsstock.com/uploads/videos/364263/thumbnail_3pkVgf33xttP8efhA3DE.jpeg"
              time={time.Fajr}
              salah="الفجر" />
            <ActionAreaCard
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/The_Royal_Mosque_of_Rabat.jpg/1200px-The_Royal_Mosque_of_Rabat.jpg"
              time={time.Dhuhr}
              salah="الضهر" />
            <ActionAreaCard
              img="https://www.casablancacity.ma/couvertures/article/Wf8vz0O0gh7zlEYcXDx6cBX3Tbl1buNqkBgX2JSw.png"
              time={time.Asr}
              salah="العصر " />
            <ActionAreaCard
              img="https://img.pikbest.com/best/video_preview_img/2403/10145458-65e82924296c2.jpg!w700wp"
              time={time.Maghrib}
              salah="المغرب " />
            <ActionAreaCard
              img="https://i.ytimg.com/vi/yZZXsC743Xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBzJUnYmU8yp0URAYTMzSqvPsXNWg"
              time={time.Isha}
              salah="العشاء" />
          </Grid>


        </Grid>


      </Box>


      <SelectedCitybar city={city} id={"selectedcity"} />

    </>
  )
}


