import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './App.css';
import BillingBody from './Components/BillingBody/BillingBody';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<BillingBody />} />
      </Routes>

    </>
  );
}

export default App;
