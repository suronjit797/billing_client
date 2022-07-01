import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matched, setMatched] = useState(true)


    const registerHandler = event => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return event.stopPropagation();
        }
        if (password !== confirmPassword) {
            return setMatched(false)
        }

        const user = { name, email, password }

        axios.post('/api/registration', user)
            .then(res => {
                if (res.data) {
                    const { token } = res.data
                    if (token) {
                        localStorage.setItem("token", token)
                        navigate('/')
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'User Create Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => {
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
                onSubmit={registerHandler}
                noValidate
                validated={validated}
            >

                <h1 className="text-center"> Create a New <span className="text-primary"> Account </span> </h1>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Please Enter User name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Provide Your Name.
                    </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formBasicAmount">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Please Confirm Your Password"
                        minLength='6'
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Please Confirm Your Password.
                    </Form.Control.Feedback>
                </Form.Group>

                <p className={`text-danger ${matched ? 'd-none' : ''}`}> Password dose not match </p>
                <p> Already have an account? <Link to='/login'> Login Now </Link>  </p>
                <Button variant="primary" type="submit">
                    Register a New Account
                </Button>
            </Form>
        </div>
    );
};

export default Register;