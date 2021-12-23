import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Notfound from "./pages/Notfound";

export default function App() {
  return (
    <BrowserRouter>
      {/* <div className="maindiv">
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
      </div> */}
      <Routes>
        <Route path="/" element={<App />}></Route>
        {/* <Route path="/About" element={<About />}></Route> */}
        {/* <Route path="/Contactus" element={<Contactus />}></Route> */}
        <Routes>
          <Route path="/Doctor/:id" element={<Doctor />}>
          </Route>
        </Routes>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
