import Item_Modal from './Item_Modal'
import './ListModal.css'
import React, { useState, useEffect } from 'react'
import InputFields from './Form/InputFields'


const ListModal = (props) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const [isValidate, setIsValidate] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [userData, setUserData] = useState({})
    const [Error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const IDSelected = (id) => {
        props.ID(id)
    }
    const handleOrder = () => {
        setShowForm(true);
    }
    const handleSubmit = () => {
        setShowForm(false);
        handleHttpSendData()
    }
    useEffect(() => {
        const bills = [0, 0, 0, 0]
        // console.log('props.Data', props.Data)
        setOrderItems(props.Data)
        props.Data.map(item => {
            return bills[item.id - 1] = item.itemNum * item.price
        });
        let sum = 0;
        for (let i = 0; i < bills.length; i++) {
            sum += bills[i]
        }
        return setTotalPrice(sum.toFixed(2))
    }, [props.Data]);
    const handleCloseModal=()=>{
        setShowForm(false);
        setIsValidate(true)
    }
    // Start Form Functions 
    const handleValidation = (data, name, address) => {
        console.log('Data', data);
        console.log('Name', name);
        console.log('Address', address);
        setUserData({
            'Name': name,
            'Address': address
        })
        data == true ? setIsValidate(true) : setIsValidate(false);
    }
    // End Form Functions

    // Start Send Http Request
    const handleHttpSendData = async () => {
        setLoading(true)
        try {
            const resposnse = await fetch('https://restaurant-app-127e5-default-rtdb.firebaseio.com/restaurant/Order.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'order-items': orderItems,
                    'user-info': userData
                })
            });
            if (!resposnse.ok) {
                throw 'Posting Faild !'
            }
            resposnse.json().then(() => {
                window.location.reload();
            })
        }
        catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }
    // End Send Http Request 
    if (props.Data.length != 0) {
        return (
            <div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Shopping List</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul className="ul-modal">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr style={{ color: '#561700' }}>
                                                <th scope="col" colSpan="2" style={{ width: '37%' }}>Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.Data.map((item) => <Item_Modal ID={IDSelected} key={item.id} item={item} />)}
                                        </tbody>
                                    </table>
                                </ul>
                            </div>
                            {Error !== null && <p style={{ textAlign: 'center', color: '#e10000', fontSize: '1.3rem' }}>{Error}</p>}
                            <div className="container" style={{ contentVisibility: showForm ? 'auto' : 'hidden' }}>
                                <InputFields handleValidation={handleValidation} />
                            </div>
                            <div className="modal-footer footer">
                                <div className="float-left" style={{ width: '60%' }} >
                                    <p className='price'>Total ${totalPrice}</p>
                                </div>
                                <div className="footer" style={{ width: '34%' }}>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ margin: '0rem 1rem 0rem 0rem' }} onClick={handleCloseModal}>Close</button>
                                    {showForm == false && <button type="button" className="btn btn-primary" onClick={handleOrder} style={{ margin: '0rem 1rem 0rem 0rem',width:'100%'}}>Order
                                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginLeft: '12px' }}></span>}
                                    </button>}
                                    {showForm == true && <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isValidate ? false : true} style={{ margin: '0rem 1rem 0rem 0rem' }}>Submit</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Shopping List</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Item_Modal item="There is no item selected" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListModal