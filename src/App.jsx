import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage.jsx';
import {HistoryPage} from './HistoryPage.jsx'
import {SearchProvider} from './SearchContext.jsx';

function App() {

  return (
    <>
      <Router>
        <SearchProvider>
          <Routes>
              <Route path='/' element={<MainPage/>} />
              <Route exact path='/main' element={<MainPage/>} />
              <Route path='/history' element={<HistoryPage/>} />
          </Routes>
        </SearchProvider>
      </Router>
    </>
  )
}

export default App
