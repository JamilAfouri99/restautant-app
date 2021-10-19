import './Items.css'
import Item from './Item'
import React, { useEffect, useState } from 'react'

const Items = (props) => {
    console.log('Hello from Items', props.items)
    const [removeById, setRemoveById] = useState(null);

    const HandleData = ($id, $amount) => {
        props.DATA($id, $amount)
    }
    useEffect(() => {
        setRemoveById(props.RemoveById)
    }, [props.RemoveById])


    return (
        <div className='container-items'>
            {!props.loading && <ul>
                {props.items?.map((item) => <li key={item.id}>
                    <Item data={item} MyData={HandleData} removeById={removeById} />
                </li>)}
            </ul>}
            {props.loading && <div class="spinner-border" style={{ width: '3rem', height: '3rem',display: 'flex',alignSelf:'center',justifySelf:'center' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>}
        </div>
    )
}

export default Items