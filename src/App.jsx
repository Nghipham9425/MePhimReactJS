import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Home from './pages/home'
import MovieCard from './components/MovieCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watch/:slug/:tap" element={<Watch />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
