import React, {useState} from 'react';
import './App.css';
import { userData } from './userData';


const users = userData.map(user=>{
  return{
    name: user.name,
    age: user.age,
    gender: user.gender,
    balance: user.balance,
    src: user.picture
  }
});

const UserCard = (props, calback) =>{
  const myEvent = ()=>{
    calback(props);
  }
  return(
    
    <div onClick={myEvent}>
      <p>Name: {props.name}</p>
      <p>Name: {props.age}</p>
      <p>Name: {props.gender}</p>
      <p>Name: {props.balance}</p>
      <img src={props.src} alt="face"/>
    </div>
  )
}
const i = {
  name:'',
  age:'',
  gender:'',
  balance:'',
  src:''
};


const App = () => {
  
  const [state, setState] = useState(users);
  const [show, setShow] = useState(false);
  const [modalUser, setModal] = useState(i);

  const handleChange = (event) => {
    const result = [];
    users.forEach(user => {
      if(user.name.toLowerCase().includes(event.target.value.toLowerCase())){
         result.push(user)
      }
   });
    setState(result)
  }

  const handleSort = (event) => {
    const sortType = event.target.value;
    const newState = [...state]
      .sort((a,b) => sortType == 'asc' ? a.age - b.age : b.age - a.age)
    setState(newState)
  }

  const handleModalClose = () => {
    setShow(false);
  };
  
  const handleModalOpen = () => {
    setShow(true);
  };

  const handleClickItem = (user)=>{
    setModal(user);
    handleModalOpen();   
  }
  
  return (
    
    <div className="App">      
      <div hidden={!show}>
        <div className="modal-background" onClick={handleModalClose}>
          <div className="modal-card">
            <p>......</p>
            {UserCard(modalUser,handleClickItem)}                
          </div>
        </div>
      </div>
      <button className="button" onClick={handleModalOpen}>Open Modal</button>



      <input type="text" placeholder="Enter name" onChange={handleChange} />
      <select onChange={handleSort}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      {state.map(user=>UserCard(user,handleClickItem))}
    </div>
  );
}

export default App;
