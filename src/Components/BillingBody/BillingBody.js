import React, { useState, useEffect } from 'react';
import './BillingBody.css'
import BillingHeader from './BillingHeader';
import { Spinner, Table } from 'react-bootstrap'
import BillingForm from './BillingForm';
import axios from 'axios';
import UpdateForms from '../UpdateForms.js/UpdateForms';
import Header from '../Header/Header'
import BillingPagination from './BillingPagination';
import Swal from 'sweetalert2';

const BillingBody = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [bill, setBill] = useState([])
    const [billUpdate, setBillUpdate] = useState([])
    const [skip, setSkip] = useState(0)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    // get bill list form server
    useEffect(() => {
        axios.get(`/api/billing-list?skip=${skip}&search=${search}`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => {
                setBill(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [skip, openLoginModal, openUpdateModal, loading, token, search])

    // stop scrolling on modal open
    useEffect(() => {
        if (openLoginModal || openUpdateModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [openLoginModal, openUpdateModal])


    // props
    const billingFormProps = {
        openModal: openLoginModal,
        setOpenModal: setOpenLoginModal,
        bill,
        setBill,
        setLoading,
    }
    const updateFormProps = {
        openUpdateModal,
        setOpenUpdateModal,
        bill,
        setBill,
        billUpdate,
        setBillUpdate
    }
    // handler
    const updateHandler = id => {
        setOpenUpdateModal(true)
        const updatedBill = bill.find(item => item._id === id)
        setBillUpdate(updatedBill)
    }

    const removeHandler = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-billing/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setLoading(true)
                        }
                    })
                    .catch(error => {
                        console.dir(error)
                        setLoading(true)
                    })
            }
        })


    }

    // loading spinner
    if (loading) {
        return (
            <div className="center_div">
                <Spinner animation="border" />
            </div>
        )
    }


    return (
        <div>
            <Header openLoginModal={openLoginModal} openUpdateModal={openUpdateModal} />
            <div className="container my-2">
                <BillingHeader
                    openModal={openLoginModal}
                    setOpenModal={setOpenLoginModal}
                    setSearch={setSearch}
                    search={search}
                />
                <BillingForm {...billingFormProps} />
                <UpdateForms {...updateFormProps} />

                {/* billing table */}
                {
                    bill.length ? (
                        <Table bordered hover className='billing_table text-center'>
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
                                            <td data-label='Billing ID' >{item._id ? item._id : (<Spinner animation="border" />)}</td>
                                            <td data-label='Full Name' > {item.name} </td>
                                            <td data-label='Email' > {item.email} </td>
                                            <td data-label='Phone' > {item.phone} </td>
                                            <td data-label='Paid Amount' > {item.amount} </td>
                                            <td className='action_data'>
                                                <span className='me-3 text-primary' onClick={() => updateHandler(item._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                    </svg> </span>
                                                |
                                                <span className='ms-3 text-danger' onClick={() => removeHandler(item._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-danger mt-4">
                            No data found
                        </p>
                    )
                }

                <BillingPagination skip={skip} setSkip={setSkip} search={search} />
            </div>
        </div>
    );
};

export default BillingBody;