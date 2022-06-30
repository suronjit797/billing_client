import React, { useState } from 'react';
import './BillingBody.css'
import BillingHeader from './BillingHeader';
import { Table } from 'react-bootstrap'
import BillingForm from './BillingForm';

const BillingBody = () => {

    const [openModal, setOpenModal] = useState(true)


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
                        Array.from(Array(10).keys()).map(item => (
                            <tr key={item}>
                                <td>Billing ID</td>
                                <td>Full Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Paid Amount</td>
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