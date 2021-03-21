import React from 'react';
import './SearchDetails.css'


const SearchDetails = (props) => {
  const { rideImage, rideOption, rideFare, avatar, passengerCount } = props.ride;
  return (
    <div className="main-container">
      <div className="available-rides">
        <img src={rideImage} alt="" className="img-resize" />
        <span>  {rideOption} </span>
        <img src={avatar} alt="" className="img-resize" />
        <span>{passengerCount}</span>
        <span>  {rideFare}</span>
      </div>
    </div>
  );
};

export default SearchDetails;