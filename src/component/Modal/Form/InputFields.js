import classes from './InputFields.css'
import React,{useState,useEffect} from 'react'

const InputFields = (props) => {
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [nameIsBlue,setNameIsBlue]=useState(false)
    const [addressIsBlue,setAddressIsBlue]=useState(false)

    const handleName=(data)=>{
        setName(data.target.value);
        data.target.value.trim().length>0 && setNameIsBlue(false)
    }
    const handleNameBlur=()=>{
        name.trim().length===0 && setNameIsBlue(true)
    }
    const handleAddress=(data)=>{
        setAddress(data.target.value)
        data.target.value.trim().length>0 && setAddressIsBlue(false)
    }
    const handleAddressBlur=()=>{
        address.trim().length===0 && setAddressIsBlue(true)
    }
    useEffect(()=>{
        const data=setTimeout(()=>{
            name.trim().length>0 && address.trim().length>0 ? props.handleValidation(true,name,address):props.handleValidation(false,name,address)
        },500);
        return (()=>{
            clearTimeout(data)
        })
    },[address,name])
    return (
        <>
            <form style={{padding:'1rem 1rem 0rem 1rem' }}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" style={{background:nameIsBlue?'#ff00002b':'white'}} className="form-control" placeholder="Name" value={name} onChange={handleName} onBlur={handleNameBlur}/>
                    {nameIsBlue==true &&<p style={{color:'red',fontSize:'1.1rem',paddingTop:'0.5rem',marginBottom:'0.2rem'}}>Enter a valid Name please !</p>}
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" style={{background:addressIsBlue?'#ff00002b':'white'}} className="form-control" placeholder="Address" value={address} onChange={handleAddress} onBlur={handleAddressBlur}/>
                    {addressIsBlue==true &&<p style={{color:'red',fontSize:'1.1rem',paddingTop:'0.5rem',marginBottom:'0.2rem'}}>Enter a valid Address please !</p>}
                </div>
            </form>
        </>
    )
}

export default InputFields