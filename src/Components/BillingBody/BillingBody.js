import React, { useState, useEffect } from 'react';
import './BillingBody.css'
import BillingHeader from './BillingHeader';
import { Spinner, Table } from 'react-bootstrap'
import BillingForm from './BillingForm';
import axios from 'axios';

const BillingBody = () => {

    const [openModal, setOpenModal] = useState(false)
    const [bill, setBill] = useState([])
    const [skip, setSkip] = useState(0)
    const [loading, setLoading] = useState(true)


    // get bill list form server
    useEffect(() => {
        axios.get(`/api/billing-list?skip=${skip}`)
            .then(res => {
                setBill(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [skip])

    // stop scrolling on modal open
    useEffect(() => {
        if (openModal) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [openModal])



    // loading spinner
    if (loading) {
        return (
            <div className="center_div">
                <Spinner animation="border" />
            </div>
        )
    }
    return (
        <div className='my-3 container'>
            <BillingHeader openModal={openModal} setOpenModal={setOpenModal} />
            <BillingForm openModal={openModal} setOpenModal={setOpenModal} />

            {/* billing table */}
            <Table bordered hover className='billing_table'>
                <thead>
                    <tr>
                        <th>Billing ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bill.map(item => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td> {item.name} </td>
                                <td> {item.email} </td>
                                <td> {item.phone} </td>
                                <td> {item.amount} </td>
                                <td>Action</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    );
};

export default BillingBody;