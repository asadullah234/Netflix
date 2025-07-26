

import  Home from "./pages/Home/Home";
import { Routes,Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {auth} from "./firebase";
import Player from "./pages/Player/Player";
const App=()=>{
  const navigate=useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log("logged in");
        navigate('/');
      }
      else{
console.log("logged out ")
navigate('/login');
      }
    })
  },[])
  return (
    <div className="App">
   <Routes>
 <Route>
  <Route path="/" element={<Home />} />
  <Route path='/login' element={<Login />}/>
  <Route path='/player/:id' element={<Player/>}/>
 </Route>
    </Routes>


    </div>
  );
}

export default App;
