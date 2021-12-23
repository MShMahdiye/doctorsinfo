import React, { Component } from "react";
import Drlist from "./Drlist";
// import SearchBox from "./SearchBox";
import Scroll from './Scroll';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import VenueLocationIcon from './VenueLocationIcon';
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Doctor from "./Doctor"


const deepClone = obj => JSON.parse(JSON.stringify(obj));

class App extends Component {
    constructor() {
        super()
        this.state = {
            doctors: [],
            searchfield: "",
            isModalDisplayed: false,
            Locations: [],
            currentLocation: {}
            //  {
            //   // lat: 35.7,
            //   // lng: 51.3
            // }
            ,
            zoom: 14,
            id: null
        }
    }

    componentDidMount() {
        fetch("https://www.tebinja.com/api/v1/doctors/searchi?page=0")
            .then(response => { return response.json() })
            .then(data => { return data.doctors })
            .then(users => this.setState({ doctors: users.hits }))
        // const obj = deepClone(this.state.robots)
        // obj.map((robo, i) => {
        //       const data = deepClone(obj[i]);
        //       console.log(data.address.geo);
        //       this.state.Locations.push(data.address.geo)
        //       console.log("current ::::::: ", this.state.Locations);})
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    // setLocations = () => {
    //   const obj = deepClone(this.state.robots)
    //   console.log("object:;;", obj);
    //   obj.map((robo, i) => {
    //     const data = deepClone(obj[i])
    //     console.log("=========");
    //     console.log("ROBO : ", robo.address);
    //     console.log("=========");
    //     console.log(data);
    //     console.log(data.name);
    //     console.log(data.address);
    //     console.log(data.address.geo);
    //     this.state.Locations.push(data.address.geo)
    //     console.log("**********************************************");
    //     console.log("current ::::::: ", this.state.Locations);
    //     console.log("**********************************************");
    //   })
    // }
    // setLocations();



    // setLocations();

    // }

    // moveUp = () => {
    //   const obj = deepClone(this.state.currentLocation)
    //   obj.lat += .005
    //   this.setState({currentLocation: obj})
    // }

    // moveDown = () => {
    //   const obj = deepClone(this.state.currentLocation)
    //   obj.lat -= .005
    //   this.setState({currentLocation: obj})
    // }

    // moveRight = () => {
    //   const obj = deepClone(this.state.currentLocation)
    //   obj.lng += .005
    //   this.setState({currentLocation: obj})
    // }

    // moveLeft = () => {
    //   const obj = deepClone(this.state.currentLocation)
    //   obj.lng -= .005
    //   this.setState({currentLocation: obj})
    // }

    render() {
        const { doctors, searchfield, id } = this.state;
        // const filteredRobots = doctors.filter(doctors => {
        //   return doctors.name.toLowerCase().includes(searchfield.toLowerCase());
        // })

        const setLocations = () => {
            const obj = deepClone(this.state.doctors)
            console.log("object:;;", obj);
            //   obj.map((robo, i) => {
            // const data = deepClone(obj[i])
            // console.log("=========");
            // console.log("ROBO : ", robo.address);
            // console.log("=========");
            // console.log(data);
            // console.log(data.name);
            // console.log(data.address);
            // console.log(data.address.geo);
            // this.state.Locations.push(data.address.geo)
            // console.log("**********************************************");
            // console.log("current ::::::: ", this.state.Locations);
            // console.log("id is now :", this.state.id);
            // console.log("**********************************************");
            //   })
        }
        setLocations();

        const showModal = ({ geo, id }) => {
            console.log("+++++++++++++++++++++++++++++++++++++");
            console.log(geo);
            console.log("+++++++++++++++++++++++++++++++++++++");
            // let i = Locations.findIndex(geo)
            // this.setState({ isModalDisplayed: true, currentLocation: this.state.Locations[i]})
            this.setState({ isModalDisplayed: true, currentLocation: geo, id: id })
        }

        const hideModal = () => {
            this.setState({ isModalDisplayed: false });
            // <BrowserRouter>
                {/* <Link to={"/"}></Link> */}
                {/* <Routes> */}
                    {/* <Route path="/doctor" element={<App />}> */}
                    {/* </Route> */}
                {/* </Routes> */}
            {/* </BrowserRouter> */}
        }

        return (
            <>
                <BrowserRouter>
                    {
                        !this.state.doctors.length
                            ?
                            <div className="loadpage"><FontAwesomeIcon icon={faCircleNotch} /></div>
                            :
                            <div className="bigest">
                                {
                                    this.state.isModalDisplayed
                                        ?
                                        <>
                                             <Link to={"/"}><div className="overlay" onClick={() => { hideModal() }}></div></Link>
                                            <div className="modal">
                                            <Link to={"/"}><div onClick={() => hideModal()} className="hide"><FontAwesomeIcon icon={faTimesCircle} /></div></Link>
                                                {/* <button onClick={() => {<BrowserRouter><Routes><Route path="/robot/:id" element={newApp}></Route></Routes></BrowserRouter>}}>read more...</button> */}
                                                <>
                                                    <div className="link"><Link to={`/Doctor/${id}`} key={id}>Read more</Link></div>
                                                    <Routes>
                                                        <Route path="/Doctor/:id" element={<Doctor />}>
                                                        </Route>
                                                    </Routes>
                                                </>
                                                <div style={{ position: 'relatives' }} >
                                                    <h1 className="hLocation">Location</h1>
                                                    <br />
                                                    <div className="mapContainer" style={{height:200}}>
                                                        <MapContainer center={this.state.currentLocation} zoom={this.state.zoom}>
                                                            <TileLayer
                                                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            />
                                                            <Marker position={this.state.currentLocation} icon={VenueLocationIcon}>
                                                                <Popup> im here... </Popup>
                                                            </Marker>
                                                        </MapContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        null
                                }

                                <div className="group"><br />
                                    <h1 className="rtitle">Doctors info</h1>
                                    {/* <SearchBox searchChange={this.onSearchChange} /> */}
                                </div>
                                <Scroll>
                                <div className="drlist">
                                    <Drlist /*doctors={filteredRobots}*/ showModal={showModal} />
                                </div>
                                </Scroll>
                               </div>
                    }
                </BrowserRouter>
            </>
        );
    }
}

export default App;