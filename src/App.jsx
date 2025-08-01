import Loading from './components/Loading'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Home from './pages/Home';
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
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
