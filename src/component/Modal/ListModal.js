import Item_Modal from './Item_Modal'
import './ListModal.css'
import React,{useState,useEffect} from 'react'


const ListModal = (props) => {
    const [totalPrice,setTotalPrice]=useState(0)
    const IDSelected = (id) => {
        props.ID(id)
    }
    const handleSubmit = () => {
        // $('#staticBackdrop').modal('hide');
        localStorage.clear()
        window.location.reload()
    }
    useEffect(()=>{
        const bills=[0,0,0,0]
        props.Data.map(item=>{
            return bills[item.id-1]=item.itemNum*item.price
        });
        let sum = 0;
        for(let i =0 ;i<bills.length;i++){
            sum += bills[i]
        }
        return setTotalPrice(sum.toFixed(2))
    },[props.Data])
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
                                            {props.Data.map((item) => <Item_Modal ID={IDSelected} key={item.id} item={item}/>)}
                                        </tbody>
                                    </table>
                                </ul>
                            </div>
                            <div className="modal-footer footer">
                                <div className="float-left"style={{width:'60%'}} >                                
                                    <p className='price'>Total ${totalPrice}</p>
                                </div>
                                <div className="footer" style={{width:'27%'}}>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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