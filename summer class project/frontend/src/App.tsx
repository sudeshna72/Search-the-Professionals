
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home/homepage'
import LoginGuard from './shared/guards/login.guard'
import AuthGuard from './shared/guards/auth.guard'
import ProfileSetup from './features/profileSetup/profileSetup'
import Profile from './features/profilepage/profilePage'



function App() {
  
//functionality
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
    
}

export default App;


/*import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home/homepage'
import LoginGuard from './shared/guards/login.guard'
import AuthGuard from './shared/guards/auth.guard'
import ProfileSetup from './features/profileSetup/profileSetup'
import Profile from './features/profilepage/profilePage'

function App() {
  
//functionality
  return (
    <Routes>
      <Route path= '/' element={
      <LoginGuard>
        <Login />
      </LoginGuard>
      }/>
      <Route path= '/Register' element={<Register />}/>
      <Route path='/profile-setup' element={
        <AuthGuard>
          <ProfileSetup />
        </AuthGuard>
      } />
      <Route path='/home' element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      } />
      
      <Route path='/profile' element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />

    </Routes>
  )
    
}

export default App;*/