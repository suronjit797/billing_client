
import Logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Header({ openLoginModal, openUpdateModal, }) {
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/api/total-amount', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => setTotal(res.data.totalAmount))
    }, [openLoginModal, openUpdateModal, token])

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand bg_custom-primary py-1">
            <div className="container flex-column flex-sm-row">
                <Link to='/'>
                    <img src={Logo} alt="logo" style={{ maxWidth: '120px' }} />
                </Link>
                <ul className=" py-2 ms-0 ms-sm-auto w-100 mb-0 d-flex align-items-center justify-content-between justify-content-sm-end">
                    Paid Total : {total}

                    <span
                        className="logOut ms-3 cursor-pointer text-danger"
                        title='Logout'
                        onClick={logOut}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right me-2 " viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg> 
                        Logout
                    </span>
                </ul>
            </div>
        </nav>
    );
}

export default Header;