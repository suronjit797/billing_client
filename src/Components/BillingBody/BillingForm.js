import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BillingForm = ({ openModal, setOpenModal }) => {

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [amount, setAmount] = useState('')

    const addItemHandler = event => {
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            return event.stopPropagation();
        }

        console.log('submitted')

    }

    return (
        <div className={`billing_form ${openModal ? 'active' : ''}`} onClick={() => setOpenModal(false)}>
            <Form
                onClick={e => e.stopPropagation()}
                onSubmit={addItemHandler}
                noValidate
                validated={validated}
            >

                <div 
                className="modal_close text-danger"
                onClick={()=>setOpenModal(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>

                <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Please Enter Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Provide Your Name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Please Provide Your Phone Number"
                        min={11111111111}
                        max={99999999999}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            !phone.length ? "Please Provide Your Phone Number." : "Phone Number Must be 11 digit"
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicAmount">
                    <Form.Label>Paid Amount</Form.Label>
                    <Form.Control
                        type="text"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Please Enter Your Amount"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Provide Your Amount.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default BillingForm;