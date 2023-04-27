import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipes';
import { RealHome } from './pages/real-home';
import { Categories } from './pages/categories';
import { Places } from './pages/places';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';

function App() {
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/saved-recipes" element={<SavedRecipes/>} />
        <Route path="/home" element={<RealHome/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/places" element={<Places />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
