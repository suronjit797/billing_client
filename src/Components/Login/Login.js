import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    const loginHandler = event => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return event.stopPropagation();
        }
        const user = { email, password }
        axios.post('/api/login', user)
            .then(res => {
                const { token } = res.data
                if (token) {
                    localStorage.setItem("token", token)
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.data) {
                    Swal.fire({
                        icon: 'error',
                        title: error?.response?.data?.message,
                    })
                }
            })
    }

    return (
        <div className='auth_form'>
            <Form
                onClick={e => e.stopPropagation()}
                onSubmit={loginHandler}
                noValidate
                validated={validated}
            >
                <h1 className="text-center"> Create a New <span className="text-primary"> Account </span> </h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Please Enter Your  Enter email"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Please Provide Your Password"
                        minLength='6'
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Provide Your Password
                    </Form.Control.Feedback>
                </Form.Group>
                <p> Don't have an account? <Link to='/register'> Create an account </Link>  </p>
                <Button variant="primary" type="submit">
                    Login Now
                </Button>
            </Form>
        </div>
    );
};

export default Login;