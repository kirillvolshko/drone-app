import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
function App() {


  return (
    <div className=' pt-20'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App
