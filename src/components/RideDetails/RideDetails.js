import React from 'react';
import { useHistory } from 'react-router';


const RideDetails = (props) => {
  const history = useHistory();
  const { id, rideOption, rideImage } = props.rideDetails;
  return (
    <div className="mt-5 col-sm d-flex justify-content-center img-fluid" onClick={() => history.push(`destination/${id}`)}>
      <div className="w-50 d-flex flex-column justify-content-center align-items-center inner" style={{ backgroundColor: "#a8d2a0" }}>
        <img src={rideImage} alt="" className="w-50 img-fluid" />
        <h4>{rideOption}</h4>
      </div>
    </div>
  );
};

export default RideDetails;