import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './features/login/login'
import Register from './features/register/register'
import HomePage from './features/home/homepage'
import LoginGuard from './shared/guards/login.guard'
import AuthGuard from './shared/guards/auth.guard'
import ProfileSetup from './features/profileSetup/profileSetup'
import Profile from './features/profilepage/profilePage'

/*function App() {
  return (
    <Routes>
     
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      
      <Route path='/dashboard' element={<HomePage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/profile-setup' element={<ProfileSetup />} />
    </Routes>
  );
}

export default App; */



export default function App() {
  return (
    <Routes>  
      <Route path='/' element={<Login />} />
      <Route path='/login' element={
        <LoginGuard>
          <Login />
        </LoginGuard>
      }/>
      <Route path='/register' element={<Register />}/>
      
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
      <Route path='/dashboard' element={
        <AuthGuard>
          <HomePage />
        </AuthGuard>
      } />
      
      <Route path='/profile' element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />
      <Route path='/profile/:id' element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />
    </Routes>
  )
}

