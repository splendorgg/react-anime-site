import './App.css'
import AnimeDetailPage from './components/AnimeDetailPage';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/anime/:animeId' element={<AnimeDetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
