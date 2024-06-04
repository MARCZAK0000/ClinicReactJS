import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/navbar';
import MainPage from './Components/MainPage/MainPage';
import Footer from './Components/Footer/footer';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Team from './Components/Teams/Team';
import { useUserContext } from './Components/HelperComponents/ThemeProvider/UserContext';
import MainPageLog from './Components/MainPageLog/MainPageLog';
import CreateVisit from './Components/Visit/CreateVisit';
function App() {

  const currentUser = useUserContext();


  return (
    <>
      <div className='page'>
        <div className='page-container'>
          <nav className='container__nav'>
            <Navbar />
          </nav>
          <Routes>
            {currentUser === '' ? <Route path='/' element={<MainPage />} /> : <Route path='/' element={<MainPageLog />} />}
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/team' element={<Team />} />
            {currentUser.trim().length > 0 && <Route path='/user/create-visit' element={<CreateVisit />} />}
          </Routes>
          <footer className='container-footer'>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  )
}

export default App;
