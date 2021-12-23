import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
    return (
        <>
            <div className="maindiv">
                <h1>Bookkeeper!</h1>
                <nav
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem"
                    }}
                >
                    <Link to="/About">About-Page</Link> |{" "}
                    <Link to="/Contactus">Contactus-Page</Link> |{" "}
                    <Link to="/">Home-Page</Link> |{" "}
                </nav>
            </div>
            <div>NOTFOUND THIS PAGE PLEASE TRY ANOTHER PATH!</div>
        </>
    )
}

export default Notfound;