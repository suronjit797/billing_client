import React from 'react';
import { Form } from 'react-bootstrap';

const BillingHeader = ({ openModal, setOpenModal, setSearch, search }) => {

    return (
        <nav className="d-block d-sm-flex px-3 py-4 py-sm-1 my-3 bg_custom-primary align-items-center">
            <div className="left d-block d-sm-flex align-items-center">
                <div>
                    Billing
                </div>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="ms-sm-4 my-3 my-sm-0 search-box"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search"
                />
            </div>
            <div className="ms-auto">
                <button className='px-4 btn_custom-primary' onClick={() => setOpenModal(!openModal)}>Add New Bill</button>
            </div>
        </nav>
    );
};

export default BillingHeader;