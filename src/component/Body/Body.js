import './Body.css'
import Items from './Items/Items' 
import DescriptionCard from './FloatCard/DescriptionCard' 
import img1 from '../../pics/item1.png'
import img2 from '../../pics/item2.png'
import img3 from '../../pics/item3.png'
import img4 from '../../pics/item4.png'
import React,{useState,useEffect} from 'react'


const Body=(props)=>{
    const [removeById,setRemoveById]=useState(null);

    const [val1,setval1]=useState(0);
    const [val2,setval2]=useState(0);
    const [val3,setval3]=useState(0);
    const [val4,setval4]=useState(0);
    const Menu = [
        {
            name:'Sushi',
            descripe:'Finest fish and veggues',
            price:22.99,
            url:img1,
            itemNum:val1,
            id:1
        },
        {
            name:'Schnitzel',
            descripe:'A german specialty!',
            price:16.50,
            url:img2,
            itemNum:val2,
            id:2
        },
        {
            name:'Barbecue Burger',
            descripe:'Amerucan, raw, meaty',
            price:12.99,
            url:img3,
            itemNum:val3,
            id:3
        },
        {
            name:'Green Bowl',
            descripe:'Healthy and green...!',
            price:18.99,
            url:img4,
            itemNum:val4,
            id:4
        }
    ]
    const handleSum=($id,$amount)=>{
        Menu.filter((item)=>{
            if(item.id==$id){
                return $id==1?setval1($amount):$id==2?setval2($amount):$id==3?setval3($amount):$id==4?setval4($amount):0
            }
        })
        let Data=[]
        let Modal_Data=[]
        Menu.map((item)=>{
            Data.push(item.itemNum);
            item.itemNum > 0 && Modal_Data.push(item)
        })
        props.DATA(Data.reduce((a, b) => a + b, 0))
        props.Modal_Data(Modal_Data)
    }
    
    useEffect(()=>{
            props.RemoveByID==1?setval1(0):props.RemoveByID==2?setval2(0):props.RemoveByID==3?setval3(0):props.RemoveByID==4?setval4(0):0;
            // props.removeByID=null
            return setRemoveById(Menu[props.RemoveByID-1])
        },[props.RemoveByID])
        
        return(
            <div className='Body container'>
            <DescriptionCard/>
            <Items items={Menu} DATA={handleSum} RemoveById={removeById}/>
        </div>
    )
}

export default Body