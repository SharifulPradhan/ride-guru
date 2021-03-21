import React from 'react';
import map from '../../images/Map.png'

const Destination = () => {
  return (
    <div className="container" style={{borderTop: "1px solid #D1D1D1"}}>
      <div className="row">
        <div className="mt-5 col-4 d-flex justify-content-center">
          <form className="form-group d-flex flex-column h-50 p-5" style={{background: "#EFEFEF"}}>
            <label htmlFor="search-feild-1">Pick From</label>
            <input type="text" className="form-control" name="search-feild-1" placeholder="Your Current Location" required />
            <label htmlFor="search-feild-2">Pick To</label>
            <input type="text" className="form-control" name="search-feild-2" placeholder="Choose Your Destination" required />
            <input type="submit" className="btn btn-primary mt-2" value="Search" />
          </form>
        </div>
        <div className="mt-5 col-8">
          <img src={map} alt="" className="img-fluid"/>
        </div>
      </div>
    </div>
  );
};

export default Destination;