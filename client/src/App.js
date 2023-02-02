import logo from './logo.svg';
import './App.css';
import Registration from './authentication/signup/Registration';

import Login from './authentication/signin/login'; 
import Finalreg from './authentication/signup/finalreg';
import Home from './authentication/home';
// import ChangePassoword from './authentication/restorepassord/changePassword';
import ResetPassword from './authentication/restorepassord/resetPassword';
import Forgotpassword from './authentication/restorepassord/forgotPassword';
import Changeoldpassword from './authentication/restorepassord/changeoldpassword';
import Settings from './authentication/setting/setting';
import Error from './error';
import './authentication/signin/login.css'
import { BrowserRouter , Link , Route, Routes,useNavigate } from 'react-router-dom';
function App() {
  // const navigate = useNavigate(); 
  return (
    <div className="App" >
      <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Registration />}/>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/forgotpassword" element={<Forgotpassword />}/>
          <Route exact path="/resetPassword/:id/:token" element={<ResetPassword />}/>
          {/* <Route exact path="/resetpassword" element={<Resetpassword />}/> */}
          <Route exact path="/changeoldpassword" element={<Changeoldpassword />}/>
          <Route exact path="/settings" element={<Settings />}/>
          {/* <Route exact path="/change-password/:id/:token" element={<ChangePassoword />}/> */}
          <Route exact path="/error" element={<Error/>}/>
        </Routes> 
      {/* <Registration/> */}
   
     
    </div>
  );
}

export default App;
