import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function BillingPagination({ skip, setSkip }) {
    const [length, setLength] = useState(0)
    const [current, setCurrent] = useState(0)
    const pages = Math.ceil(length / 10)
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/api/db-length', {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => setLength(res.data.result))
    }, [token])

    useEffect(() => {
        setSkip(10 * current)
    }, [current, setSkip])


    // handler
    const nextHandler = () => {
        setCurrent(current < pages - 1 ? current + 1 : pages - 1)
    }
    const prevHandler = () => {
        setCurrent(current > 0 ? current - 1 : 0)
    }


    return (
        <div>
            {
                pages > 1 && <Pagination>
                    <Pagination.Prev onClick={prevHandler} />
                    {
                        [...Array(pages).keys()].map(num => (
                            <Pagination.Item 
                            key={num} 
                            active={num === current}
                            onClick={()=>setCurrent(num)} 
                            >{num + 1}</Pagination.Item>
                        ))
                    }
                    <Pagination.Next onClick={nextHandler} />
                </Pagination>
            }
        </div>

    )
}

export default BillingPagination;