import './App.css';
import UpperBody from './component/Header/UpperBody';
import Body from './component/Body/Body';
import TotalNum from './component/Support/item-number-context';
import React,{useState,useEffect} from 'react';
import ListModal from './component/Modal/ListModal';

function App() {
  const [Num,setNum]=useState(0)
  const [ModalData,setModalData]=useState([])
  const [removeByID,setremoveByID]=useState(null)

  const HandleNumber=(data)=>{
    setNum(data)
  }

  useEffect(()=>{
			setNum(0)
  },[])

  const Modal_Data = (data) =>{
    setModalData(data)
  }

  const Delete_By_ID=async(ID)=>{
    await setModalData((prev)=>{
      prev.filter((item,index)=>{
        item.id==ID && prev.splice(index,1)
      });
      setremoveByID(ID)
      let sum=0
      prev.length==0?setNum(0):prev.map((item)=>{
        sum += item.itemNum
        setNum(sum)
      })
      return [...prev]
    });
    setremoveByID(null)
  }
  return (
    <div className="App container">
      <TotalNum.Provider value={{
        total_num:Num
      }}>
        <UpperBody/>
        <Body DATA={HandleNumber} Modal_Data={Modal_Data} RemoveByID={removeByID}/>
        <ListModal Data={ModalData} ID={Delete_By_ID}/>
      </TotalNum.Provider>
    </div>
  );
}

export default App;
