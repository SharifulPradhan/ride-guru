import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png'
import rideData from '../../Data/fakeData.json'
import { Button } from 'react-bootstrap';
import SearchDetails from '../SearchDetails/SearchDetails';
import './Destination.css'

const Destination = () => {
  const { id } = useParams();
  const [ride, setRide] = useState({});
  useEffect(() => {
    const matchRide = rideData.find(ride => ride.id == id);
    setRide(matchRide)
  }, [id])

  const [search, setSearch] = useState(false);
  const [pickFrom, setPickFrom] = useState('');
  const [pickTo, setPickTo] = useState('');
  
  
  const handleBlur = e => {
    if(e.target.name === 'search-feild-1'){
      const pickFrom = e.target.value;
      setPickFrom(pickFrom);
    }
    if(e.target.name === 'search-feild-2'){
      const pickto = e.target.value;
      setPickTo(pickto);
    }
  }
  return (
    <div className="container" style={{ borderTop: "1px solid #D1D1D1" }}>
      <div className="row">
        <div className="mt-5 col-sm-4 d-flex justify-content-center">
          {
            search
              ? <div>
                  <div className="destination">
                    <p>{pickFrom}</p>
                    <p>to</p>
                    <p>{pickTo}</p>
                  </div>
                  <SearchDetails ride={ride} />
                  <SearchDetails ride={ride} />
                  <SearchDetails ride={ride} />
                </div>
              : <form className="form-group d-flex flex-column p-5" style={{ background: "#EFEFEF" }}>
                <label htmlFor="search-feild-1">Pick From</label>
                <input type="text" className="form-control" name="search-feild-1" onBlur={handleBlur} placeholder="Your Current Location" required />
                <label htmlFor="search-feild-2">Pick To</label>
                <input type="text" className="form-control" name="search-feild-2" onBlur={handleBlur} placeholder="Choose Your Destination" required />
                <Button className="mt-2" onClick={() => setSearch(true)}> Search </Button>
              </form>
          }
        </div>
        <div className="mt-5 col-sm-8">
          <img src={map} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Destination;