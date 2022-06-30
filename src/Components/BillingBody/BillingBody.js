import React from 'react';
import BillingHeader from './BillingHeader';
import { Table } from 'react-bootstrap'

const BillingBody = () => {
    return (
        <div className='my-3 container'>
            <BillingHeader />

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
                    <tr>
                        <td>Billing ID</td>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Paid Amount</td>
                        <td>Action</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default BillingBody;