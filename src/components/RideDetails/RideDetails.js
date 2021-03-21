import React from 'react';

const RideDetails = (props) => {
  const {rideOption, rideImage} = props.rideDetails;
  return (
    <div className="mt-5 col-sm d-flex justify-content-center" onClick={() => console.log("react")}>
      <div className="bg-white w-50 d-flex flex-column justify-content-center align-items-center inner">
        <img src={rideImage} alt="" className="w-50 img-fluid"/>
        <h4>{rideOption}</h4>
      </div>
    </div>
  );
};

export default RideDetails;