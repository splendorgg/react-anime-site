import './App.css'
import AnimeDetailPage from './components/AnimeDetailPage';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/anime/:animeId' element={<AnimeDetailPage />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
