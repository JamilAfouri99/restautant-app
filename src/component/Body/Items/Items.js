import './Items.css'
import Item from './Item'
import React,{useEffect,useState} from 'react'

const Items = (props) => {
    const [removeById,setRemoveById]=useState(null);

    const HandleData=($id,$amount)=>{
        props.DATA($id,$amount)
    }
    useEffect(()=>{
        setRemoveById(props.RemoveById)
    },[props.RemoveById])


    return (
        <div className='container-items'>
            <ul>
                {props.items.map((item) => <li key={item.id}>
                    <Item data={item} MyData={HandleData} removeById={removeById}/>
                </li>)}
            </ul>
        </div>
    )
}

export default Items