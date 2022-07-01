import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import BillingBody from './Components/BillingBody/BillingBody';
import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

function App() {
  return (
    <>
      <Header />
      <div className="container my-3">
        <Routes>
          <Route path='/' element={<BillingBody />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
