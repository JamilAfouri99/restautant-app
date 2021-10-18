import './Item_Modal.css'

const Item_Modal = (props) => {
	const handleDeleteItem=()=>{
		props.ID(props.item.id)
	}
	if (props.item == "There is no item selected") {
		return (
			<h5 style={{color: '#561700'}}>{props.item}</h5>
		)
	} else {
		return (
			<>
				<tr>
					<th colSpan="2" style={{width: '37%'}}>{props.item.name}</th>
					<td>${(props.item.price).toFixed(2)}</td>
					<td className="text-center">&#215;{props.item.itemNum}</td>
					<td className="text-center">
						<button className="remove-item" onClick={handleDeleteItem}><i className="fas fa-times"></i></button>
					</td>
				</tr>
			</>
		)
	}
}

export default Item_Modal