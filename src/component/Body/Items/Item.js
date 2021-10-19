import React, { useState, useEffect } from 'react';
import './Item.css';

const Item = (props) => {
	console.log('FROM ITEM',props.data)
	const [Amount, setAmount] = useState(0)
	const [Price, setPrice] = useState(props.data.price)

	const handleAdder=()=>{
		setAmount((prev)=>{
			let amount=prev+1;
			setPrice(amount * props.data.price)
			props.data.itemNum = amount
			setTimeout(()=>{
				props.MyData(props.data.id, amount)
			},10)
			return amount
		})
	}
	const handleRemover=()=>{
		setAmount((prev)=>{
			let amount=prev-1;
			amount>0?setPrice(amount* props.data.price):setPrice(1* props.data.price)
			props.data.itemNum = amount
			setTimeout(()=>{
				props.MyData(props.data.id, amount)
			},10)
			return amount
		})
	}
	
	useEffect(() => {
		setAmount(0)
		setPrice(1 * props.data.price)
		props.MyData(props.data.id, 0)
	}, [])

	useEffect(()=>{
		if(props.removeById!=null){
			props.removeById.id==props.data.id && setPrice(1 * props.removeById.price)
			props.removeById.id==props.data.id && setAmount(0)
			if(props.removeById.id==props.data.id){
				props.data.itemNum = 0;
			}
		};
	},[props.removeById])

	return (
		<>
			<div className="container item-menu">
				<div className="row">
					<div className="col-3">
						<img className="img-fluid" style={{ width: '100%', height: '134.03px', borderRadius: '10px' }} src={props.data.url} alt="Sample" />
					</div>
					<div className="col-9 mt-4">
						<div className="d-flex justify-content-between row">
							<div className="col-8">
								<h5>{props.data.name}</h5>
								<p className="mb-3 text-muted text-uppercase small">{props.data.descripe}</p>
								<p className="mb-0"><span><strong id="summary">${Price.toFixed(2)}</strong></span></p>
							</div>
							<div className="col-4 container" style={{marginTop:'-0.8rem'}}>
								<div className="d-flex" style={{ flexDirection: 'column' }}>
									<div className="d-flex justify-content-center" style={{paddingBottom:"10px",fontSize:"1.2rem"}}>
										<span><em><strong>Amount</strong></em></span>
									</div>
									<div className="d-flex justify-content-between">
										<div className="p-2 bd-highlight"><button type="button" className="btn btn-primary" style={{borderRadius:'33px'}} onClick={handleAdder} disabled={parseInt(Amount)>=10?true:false}><i className="fas fa-plus"></i></button></div>
										<div className="p-2 flex-grow-1 bd-highlight" style={{borderRadius: '4px',textAlign:'center'}}><h4 id="display_item">{Amount}</h4></div>
										<div className="p-2 bd-highlight"><button type="button" className="btn btn-danger" style={{borderRadius:'33px'}} onClick={handleRemover} disabled={parseInt(Amount)<=0?true:false}><i className="fas fa-minus"></i></button></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Item