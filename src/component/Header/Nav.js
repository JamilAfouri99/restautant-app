import './Nav.css'
import TotalNum from '../Support/item-number-context'
import React, {useContext,useEffect,useState} from 'react'

const Nav = () => {
    const [effect,setEffect]=useState(false)
    const myTotalNum = useContext(TotalNum)
    useEffect(()=>{
        setEffect(true)
        setTimeout(()=>{
            setEffect(false)
        },150)
    },[myTotalNum])
    return (
        <div>
            <nav className="navbar">
                <span className="navbar-brand mb-0 h1">ReactMeals</span>
                <div className={effect?'OnEffect shopping-icon':'OffEffect shopping-icon'} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className="fas fa-shopping-cart"></i>
                    <h4>{myTotalNum.total_num}</h4>
                </div>
            </nav>
        </div>
    )
}

export default Nav