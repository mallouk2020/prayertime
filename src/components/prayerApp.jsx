import './prayerCard.css'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ActionAreaCard from './pryercard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import axios from "axios";
import moment from "moment";

// دالة تعرض الوقت الحالي المحدث كل ثانية
function Timenow() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = moment().format('MMMM Do YYYY, h:mm:ss a');
      setCurrentTime(now);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <p>{currentTime}</p>;
}




export default function Pryercard() {
 

  const SelectedCities = [
    { displayCity: "المغرب", apiCity: "morooco" },
    { displayCity: "السعودية", apiCity: "sa" },
    { displayCity: "الامارات", apiCity: "uae" }
  ];

 const [city, setCity] = useState({
    displayCity: "المغرب",
    apiCity: "morooco",
  });
  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  
  const [remainingTime, setRemainingTime] = useState("");

  const nextPrayerDetails = [
    { nextPrayer: "الفجر", key: "Fajr" },
    { nextPrayer: "الضهر", key: "Dhuhr" },
    { nextPrayer: "العصر", key: "Asr" },
    { nextPrayer: "المغرب", key: "Maghrib" },
    { nextPrayer: "العشاء", key: "Isha" }
  ];







    

  const calculateNextPrayer = () => {
    
    const momentPrayerTimes = {
      Fajr: moment(prayerTimes.Fajr, 'HH:mm'),
      Dhuhr: moment(prayerTimes.Dhuhr, 'HH:mm'),
      Asr: moment(prayerTimes.Asr, 'HH:mm'),
      Maghrib: moment(prayerTimes.Maghrib, 'HH:mm'),
      Isha: moment(prayerTimes.Isha, 'HH:mm'),
    };
    const now = moment();
    const midnight1 = moment('00:00:00', "HH:mm:ss" )
    const midnight2 = moment('23:59:59', "HH:mm:ss" )

    let prayerIndex = 4;

    if (now.isAfter(momentPrayerTimes.Fajr) && now.isBefore(momentPrayerTimes.Dhuhr)) prayerIndex = 1;
    else if (now.isAfter(momentPrayerTimes.Dhuhr) && now.isBefore(momentPrayerTimes.Asr)) prayerIndex = 2;
    else if (now.isAfter(momentPrayerTimes.Asr) && now.isBefore(momentPrayerTimes.Maghrib)) prayerIndex = 3;
    else if (now.isAfter(momentPrayerTimes.Maghrib) && now.isBefore(momentPrayerTimes.Isha)) prayerIndex = 4;
    else prayerIndex = 0;

    setNextPrayerIndex(prayerIndex);

    const nextPrayerTime = momentPrayerTimes[nextPrayerDetails[prayerIndex].key];
    const diff = nextPrayerTime.diff(now);
    const duration = moment.duration(diff);
    const formattedTime = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;



    const timebitwnightandfajer = nextPrayerTime.diff(midnight1)
    const nowtonight = midnight2.diff(now);
    const specialforfajr = timebitwnightandfajer + nowtonight;
    const specialforfajrr = moment.duration(specialforfajr);
    const specialforfajrformat = `${specialforfajrr.hours()}:${specialforfajrr.minutes()}:${specialforfajrr.seconds()}`


    if (prayerIndex === 0) {
      setRemainingTime(specialforfajrformat);
      console.log(" الصلاة التالية هي الفجر ", moment.duration(timebitwnightandfajer).hours(), moment.duration(timebitwnightandfajer).minutes())
    } else { setRemainingTime(formattedTime); }

  };


  

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime() 
    }, 1000);
    calculateNextPrayer()

    return () => clearInterval(interval);
  });




  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByAddress/26-01-2025?address=${city.apiCity}`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
    
    
  }, [city]);




  const handleChange = (event) => {
    const selectedCity = SelectedCities.find((city) => city.apiCity === event.target.value);
    setCity(selectedCity);
  };

  function SelectedCitybar({ city }) {
    return (
      <Box sx={{ minWidth: 420 }} className={"select-box"}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city.apiCity}
            label="city"
            onChange={handleChange}
          >
            {SelectedCities.map((city) => (
              <MenuItem key={city.apiCity} value={city.apiCity}>{city.displayCity}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '94%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>
            <div>
              <h4 style={{ opacity: "50%", textAlign: "right" }}>الوقت المتبقي لصلاة {nextPrayerDetails[nextPrayerIndex].nextPrayer}:</h4>
              <h1 style={{ textAlign: "right" }}>{remainingTime}</h1>
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <h4 style={{ opacity: "50%", textAlign: "right" }}>
                <Timenow />
              </h4>
              <h1 style={{ textAlign: "right" }}> {city.displayCity} </h1>
            </div>
          </Grid>
          <Divider sx={{ color: "white", border: "solid 1px white", width: "100%", opacity: "20%" }} />
          <Grid size={12} className={"gridcontainer"}>
            <ActionAreaCard
              img="https://cdn.arabsstock.com/uploads/videos/364263/thumbnail_3pkVgf33xttP8efhA3DE.jpeg"
              time={prayerTimes.Fajr}
              salah="الفجر" />
            <ActionAreaCard
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/The_Royal_Mosque_of_Rabat.jpg/1200px-The_Royal_Mosque_of_Rabat.jpg"
              time={prayerTimes.Dhuhr}
              salah="الضهر" />
            <ActionAreaCard
              img="https://www.casablancacity.ma/couvertures/article/Wf8vz0O0gh7zlEYcXDx6cBX3Tbl1buNqkBgX2JSw.png"
              time={prayerTimes.Asr}
              salah="العصر " />
            <ActionAreaCard
              img="https://img.pikbest.com/best/video_preview_img/2403/10145458-65e82924296c2.jpg!w700wp"
              time={prayerTimes.Maghrib}
              salah="المغرب " />
            <ActionAreaCard
              img="https://i.ytimg.com/vi/yZZXsC743Xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBzJUnYmU8yp0URAYTMzSqvPsXNWg"
              time={prayerTimes.Isha}
              salah="العشاء" />
          </Grid>
        </Grid>
      </Box>
      <SelectedCitybar city={city} id={"selectedcity"} />
    </>
  );
}
