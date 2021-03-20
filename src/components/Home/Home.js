import {React, useEffect, useState} from 'react';
import data from '../../Data/fakeData.json'
import './Home.css'
const Home = () => {
  const [rides, setRides] = useState('');
  useEffect(()=>{
    setRides(data);
  }, [])
  console.log(rides);
  return (
    <div className="container-fluid banner">
      <h1>{rides.length}</h1>
    </div>
  );
};

export default Home;