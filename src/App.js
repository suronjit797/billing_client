import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import BillingBody from './Components/BillingBody/BillingBody';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import RequireAuth from './Components/RequireAuth/RequireAuth';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<RequireAuth> <BillingBody /> </RequireAuth>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
