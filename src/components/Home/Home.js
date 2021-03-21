import {React, useEffect, useState} from 'react';
import data from '../../Data/fakeData.json'
import RideDetails from '../RideDetails/RideDetails';
import './Home.css'
const Home = () => {
  const [rides, setRides] = useState([]);
  useEffect(()=>{
    setRides(data);
  }, [])
  return (
    <div className="container-fluid banner">
      <div className="row">
        {
          rides.map(ride => <RideDetails rideDetails={ride} key={ride.id}></RideDetails>)
        }
      </div>
    </div>
  );
};

export default Home;