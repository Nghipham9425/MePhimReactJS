import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Genre from './pages/Genre';
import Country from './pages/Country';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watch/:slug/:tap" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/country" element={<Country />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;