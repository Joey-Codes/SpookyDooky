import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Places } from './pages/places';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { PlacePage } from './components/placepage';
import { Profile } from './pages/profile';

function App() {
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/about" element={<About />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:placeId" element={<PlacePage />} />    
        <Route path="/profile" element={<Profile /> } /> 
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
