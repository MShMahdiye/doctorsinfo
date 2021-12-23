import * as React from "react";
import { useState, useEffect } from "react";
import "./Drlist.css";

const Doctorsinfo = ({ showModal }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://www.tebinja.com/api/v1/doctors/searchi?page=0")
      .then(response => {
        setIsLoaded(true);
        return response.json();
      }).then(data => { return data.doctors })
      .then(hit => { setItems(hit.hits); })
      .catch(error => {
        setError(error);
      });
  }, []);
  console.log(items);
  if (error !== null) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="biggercontain">
        {items.map((item, i) => {
          const deepClone = obj => JSON.parse(JSON.stringify(obj))
          const obj = deepClone(items)
          console.log("obj in stringify:",obj);
          console.log("drlist obj source is ::", obj[0]._source.clinics);
          const lat = obj[i]._source.clinics[0].latitude
          const lng = obj[i]._source.clinics[0].longtitude
          console.log("obj source clinic:", obj[i]._source.clinics[0]);
          console.log("obj source clinic long", obj[i]._source.clinics[0].longtitude);
          const geo = { lat, lng }
          // const geo = [lat, lng]

          console.log("im geo : ", geo);
          let id = item._id
          return (

            <div className="bigger" onClick={() => { showModal({ geo, id }); }}>
              <div className="big">
                <div className="drimg"><img
                  src={
                    "https://www.tebinja.com/img/uploads/doctors/thumbnails/" +
                    item._source.url
                  }
                  className="third-Container" width={150} height={150}
                ></img>
                </div>
                <div className="name">{item._source.fname} {item._source.lname} </div>
                <div className="speciality">تخصص : {item._source.spUnis[0].specialty.name}</div>
              </div>
            </div>
          )
        }
        )}
      </div>
    );
  }
};

export default Doctorsinfo;
