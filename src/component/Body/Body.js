import './Body.css'
import Items from './Items/Items'
import DescriptionCard from './FloatCard/DescriptionCard'
import React, { useState, useEffect } from 'react'


const Body = (props) => {
    const [removeById, setRemoveById] = useState(null);
    const [newMenu, setNewMenu] = useState([]);
    const [loading, setLoading] = useState(false);

    const [val1, setval1] = useState(0);
    const [val2, setval2] = useState(0);
    const [val3, setval3] = useState(0);
    const [val4, setval4] = useState(0);

    // Start GET data 
    const handlGetData = async () => {
        setLoading(true)
        const valArray = [val1, val2, val3, val4]
        try {
            const response = await fetch('https://restaurant-app-127e5-default-rtdb.firebaseio.com/restaurant/Menu.json');
            if (!response.ok) {
                throw 'There is an Error occured!'
            }
            const data = await response.json();
            let Menu = []
            for (let key in data) {
                Menu.push({
                    id: data[key].id,
                    name: data[key].name,
                    descripe: data[key].descripe,
                    itemNum: valArray[data[key].id - 1],
                    price: data[key].price,
                    url: data[key].url
                })
            }
            setNewMenu(Menu)
        } catch (error) {
            console.log('Error', error.message)
        }
        setLoading(false)
    };
    // End GET data 

    const handleSum = async ($id, $amount) => {
        newMenu.filter((item) => {
            if (item.id == $id) {
                return $id == 1 ? setval1($amount) : $id == 2 ? setval2($amount) : $id == 3 ? setval3($amount) : $id == 4 ? setval4($amount) : 0
            }
        })
        let Data = []
        let Modal_Data = []
        newMenu.map((item) => {
            Data.push(item.itemNum);
            item.itemNum > 0 && Modal_Data.push(item)
        })
        props.DATA(Data.reduce((a, b) => a + b, 0))
        props.Modal_Data(Modal_Data)
    }

    useEffect(() => {
        props.RemoveByID == 1 ? setval1(0) : props.RemoveByID == 2 ? setval2(0) : props.RemoveByID == 3 ? setval3(0) : props.RemoveByID == 4 ? setval4(0) : 0;
        if (newMenu?.length > 0) {
            setRemoveById(newMenu[props.RemoveByID - 1])
        }
    }, [props.RemoveByID]);
    useEffect(() => {
        handlGetData()
    }, [])


    return (
        <div className='Body container'>
            <DescriptionCard />
            <Items items={newMenu} DATA={handleSum} RemoveById={removeById} loading={loading}/>
        </div>
    )
}

export default Body