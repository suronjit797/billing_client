import React from 'react';

const BillingHeader = ({ openModal, setOpenModal }) => {
    return (
        <nav className="d-flex px-3 py-1 bg_custom-primary align-items-center">
            <div className="left">
                Billing
            </div>
            <div className="ms-auto">
                <button className='px-4 btn_custom-primary' onClick={() => setOpenModal(!openModal)}>Add New Bill</button>
            </div>
        </nav>
    );
};

export default BillingHeader;