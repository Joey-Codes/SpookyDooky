import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Places } from './pages/places';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { PlacePage } from './components/placepage';

function App() {
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/about" element={<About />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:placeId" element={<PlacePage />} />     
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
