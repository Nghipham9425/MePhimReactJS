import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Genre from './pages/Genre';
import Country from './pages/Country';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function AppContent() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watch/:slug/:tap" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/country" element={<Country />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;