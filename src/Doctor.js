import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import Scroll from "./Scroll";
import { BrowserRouter, Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
// import Card from "./Card";
// import './Robot.css';

function Robot() {

  var robots = [];
  const { id } = useParams();
  const [Doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
      .then(response => { return response.json() })
      .then(data => { return data.doctor })
      // .then(users => {robots.push(users)})
      .then(res => { setDoctor(res) })
    // .then(res => {console.log("im res hi:",res);})
  })

  const [rating, setRating] = useState((3)*20)

  const handleRating = (rate= 3) => {
    setRating(rate)
    // other logic
  }

console.log("==========");
  console.log("RATE:",Doctor.rate);
  return (
    <div className="single">
      {/* <h3>id : {id}</h3> */}
      <div className="drimg">
        <img
          src={
            "https://www.tebinja.com/img/uploads/doctors/thumbnails/" +
            Doctor.url
          }
          className="third-Container" width={150} height={150}>
        </img>
      </div>
      <div className='App'>
        <Rating onClick={handleRating} ratingValue={(Doctor.rate)*20} readonly={true}/* Available Props */ />
      </div>
      <h3>{Doctor.fname} {Doctor.lname}</h3>
      <h3>{Doctor.address}</h3>
      <h3>کد پزشکی : {Doctor.pezeshkCode}</h3>
      <h3>{Doctor.about}</h3>
    </div>


  )
}


export default Robot;




