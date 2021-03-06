import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'


const UpdateForms = ({ openUpdateModal, setOpenUpdateModal, bill, setBill, billUpdate, setBillUpdate }) => {

    const [validated, setValidated] = useState(false);


    const addItemHandler = event => {
        const { _id, phone } = billUpdate
        event.preventDefault();
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return event.stopPropagation();
        }
        if (phone.length !== 11) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Phone Number must be 11 digit',
            })
        }
        setOpenUpdateModal(false)
        setBill([...bill])
        axios.put(`/api/update-billing/${_id}`, billUpdate)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.dir(error))
    }


    const handlerBillUpdate = event => {
        setBillUpdate({
            ...billUpdate,
            [event.target.name]: event.target.value

        })
    }

    return (
        <div className={`billing_form ${openUpdateModal ? 'active' : ''}`} onClick={() => setOpenUpdateModal(false)}>
            <Form
                onClick={e => e.stopPropagation()}
                onSubmit={addItemHandler}
                noValidate
                validated={validated}
            >
                <h1 className="text-center"> Update Bill </h1>
                <div
                    className="modal_close text-danger"
                    onClick={() => setOpenUpdateModal(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>

                <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Please Enter Your name"
                        value={billUpdate.name}
                        name='name'
                        onChange={handlerBillUpdate}
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
                        value={billUpdate.email}
                        name='email'
                        pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={handlerBillUpdate}
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
                        name='phone'
                        value={billUpdate.phone}
                        onChange={handlerBillUpdate}
                        placeholder="Please Provide Your Phone Number"
                        min={1111111111}
                        max={99999999999}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {
                            !billUpdate?.phone?.length ? "Please Provide Your Phone Number." : "Phone Number Must be 11 digit"
                        }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicAmount">
                    <Form.Label>Paid Amount</Form.Label>
                    <Form.Control
                        type="text"
                        value={billUpdate.amount}
                        name='amount'
                        onChange={handlerBillUpdate}
                        placeholder="Please Enter Your Amount"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please Provide Your Amount.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" className='mt-3' type="submit">
                    Update Bill
                </Button>
            </Form>
        </div>
    );
};

export default UpdateForms;