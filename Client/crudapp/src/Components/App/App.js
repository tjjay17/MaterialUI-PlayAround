import React,{useState,useEffect} from 'react';
import 'fontsource-roboto';
import GuestForm from '../GuestForm/GuestForm';
import GuestList from '../GuestList/GuestList';
import axios from '../../axios';
import useStyles from './AppStyles';
import {Modal,makeStyles} from '@material-ui/core';

//style to position the Modal
const modalMove = {
  margin:'auto',
  position:'relative',
  top:'35vh'
}

function App() {

  const classes = useStyles();
  //typically use redux, but for a small project like this, not worth it
  const [List,updateList] = useState([]);
  const [didLoad, updateLoad] = useState(true);

  //For opening the modal and giving modal a message.
  const [msg,setMsg] = useState({
    status:false,
    msg:null
});

  //update the initial list of guests
  useEffect(()=>{
    axios.get('/allGuests')
      .then(response =>{ 
        updateList(response.data);
        updateLoad(false);
      })
      .catch(err => console.log(err));
 },[]);

  //global call to update the list with fetched data in lower level components.
  //normally use redux, but time constraints say prop passing >> redux for this small project.
  const listUpdater = data =>{
    updateList(data);
  }

  const acceptMsg = () =>{
    setMsg({status:false, msg:null})
}

//update modal message
const modalChanger = (text) =>{

  setMsg(
    {
      status:true,
      msg:text
    }
  );
}

const body = (
  <div style = {modalMove} className = {classes.paperStyle}>
      <h1>{msg.msg}</h1>
  </div>
);

  return (
    <div className="App">
      <h1 className = 'header'>Event Guest List</h1>
      <GuestForm updater = {listUpdater} modal = {modalChanger} />
      <GuestList didLoad = {didLoad} updater = {listUpdater} List = {List} modal = {modalChanger} />
      <Modal open = {msg.status} onClose = {acceptMsg}>{body}</Modal>
    </div>
  );
}

export default App;
