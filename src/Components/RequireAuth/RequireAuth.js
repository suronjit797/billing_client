import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';


const RequireAuth = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')


    // location
    let location = useLocation();

    useEffect(() => {
        axios.get('/jwt-verify', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(error => {
                if (error) {
                    setLoading(false)
                    return <Navigate to="/login" state={{ from: location }} replace />;
                }
            })
    }, [token, location])



    if (loading) {
        return (
            <div className="center_div">
                <Spinner animation="border" />
            </div>
        )
    }

    if (!user.isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;