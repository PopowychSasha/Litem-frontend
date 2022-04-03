import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from '../../context/authCtx';
import ChatsPage from '../../pages/ChatsPage';
import GetStartedPage from '../../pages/GetStartedPage';
import SignInFormPage from '../../pages/SignInFormPage';
import SignUpFormPage from '../../pages/SignUpFormPage';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GetStartedPage/>}/>
        <Route path="/auth/login" element={<SignInFormPage/>}/>
        <Route path="/auth/register" element={<SignUpFormPage/>}/>
        {authCtx.isLogIn && <Route path="/chats" element={<ChatsPage/>}/>}
      </Routes>
    </div>
  );
}

export default App;
