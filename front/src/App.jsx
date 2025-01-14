import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Appointments from "./views/Appointments/Appointments";
import Menu from "./views/Menu/Menu";
import Location from "./views/Location/Location";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import AppointmentForm from "./views/AppointmentForm/AppointmentForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/quienes-somos" element={<About />}/>
        <Route path="/contacto" element={<Contact />}/>
        <Route path="/users/login" element={<Login />}/>
        <Route path="/users/register" element={<Register />}/>
        <Route path="/appointments" element={<Appointments />}/>
        <Route path="/appointmentForm" element={<AppointmentForm />}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/ubicacion" element={<Location />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;