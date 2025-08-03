import Loading from './components/Loading'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Home from './pages/Home';
import Footer from './components/Footer';
import Genre from './pages/Genre';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:slug/:tap" element={<Watch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/genre" element={<Genre />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App
