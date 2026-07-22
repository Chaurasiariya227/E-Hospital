import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Doctors from "./pages/doctors";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Contact from "./pages/contact";
import Footer from "./components/Footer";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />}/>
        <Route path="/my-appointments" element={<MyAppointments />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;