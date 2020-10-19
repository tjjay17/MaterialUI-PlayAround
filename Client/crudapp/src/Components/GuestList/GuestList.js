import React,{useState} from 'react';
import CustomDialog from '../UI/CustomDialog';
import UpdateDialog from '../UI/UpdateDialog';
import axios from '../../axios';

import {List,
        ListItem,
        Popover,
        CircularProgress,
        ListItemIcon,
        Button,
        Typography
    } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './GuestListStyles';

const GuestList = (props) =>{

const classes = useStyles();
let deletePrompt = 'Are you sure you want to delete this guest?';
let listOfGuests = <CircularProgress className = {classes.loader} />;

    //manages state of the update aspect of the app
    const [updateInfo, changeUpdate] = useState({
        status:false,
        Food:null,
        Fname:null,
        Lname:null,
        Email:null
    });

    //manages state of delete aspect of app
    const [deleteInfo, changeDelete] = useState({
        status:false,
        guest:null
    });

    // state of the popover
    const [popoverInfo,updatePopover] = useState({
        id:null,
        target:null
    });

    const handlePopoverClick = (event,id) =>{
        let target = event.currentTarget;
        updatePopover({
            id:id,
            target:target
        });
    }

    const openUpdate = (email,food,first,last) =>{
        changeUpdate({
            status:true,
            Food:food,
            Fname:first,
            Lname:last,
            Email:email
        });
    }

    const closeUpdate = () =>{
        changeUpdate({
            status:false,
            guest:null
        });
    }

    const openDelete = (guestId) =>{
        changeDelete({
            status:true,
            guest:guestId
        })
    }

    const closeDelete = () => {
        changeDelete({
            status:false,
            guest:null
        });
    }

    const closePopOver = () =>{
        updatePopover({
            id:false,
            target:null
        })
    }

    const deleteGuest = () =>{

        axios.delete('/deleteGuest/' + deleteInfo.guest)
            .then(response => {
                axios.get('/allGuests')
                    .then(res => {
                        props.updater(res.data);

                        changeDelete({
                            status:false,
                            guest:null
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err=> console.log(err));
    }
    
     if (!props.didLoad){
         listOfGuests = <List className = {classes.list}>
                            {props.List.map(eachGuest => {
                                return(
                                    <React.Fragment key = {eachGuest.Email}>
                                        <ListItem id = {eachGuest.Email}>
                                            <ListItemIcon>
                                                <PersonIcon style = {{color:'white'}}/>
                                            </ListItemIcon>

                                            {eachGuest.Fname + ' ' + eachGuest.Lname}

                                            <ListItemIcon>
                                                <Button onClick = {(e) => handlePopoverClick(e,eachGuest.Email)}  style = {{position:'absolute',right:'12vw',bottom:'1.2vh'}}>
                                                    <InfoIcon style = {{color:'white'}}/>
                                                </Button>
                                            </ListItemIcon>

                                            <ListItemIcon>
                                                <Button onClick = {()=> openUpdate(eachGuest.Email,eachGuest.Food,eachGuest.Fname,eachGuest.Lname)} style = {{position:'absolute',right:'7vw',bottom:'1.2vh'}}>
                                                    <EditIcon style = {{color:'white'}}/>
                                                </Button>
                                            </ListItemIcon>

                                            <ListItemIcon>
                                                <Button onClick = {() => openDelete(eachGuest.Email)} style = {{position:'absolute', right:'2vw',bottom:'1.2vh'}}>
                                                    <DeleteIcon style = {{color:'white'}} />
                                                </Button>
                                            </ListItemIcon>
                                        </ListItem>

                                        <Popover 
                                            open = {popoverInfo.id === eachGuest.Email} 
                                            onClose = {closePopOver} 
                                            anchorEl = {popoverInfo.target}
                                            classes = {{paper:classes.paper}}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                              }}
                                              transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                              }}  
                                            >
                                           <Typography>{'Food: ' + eachGuest.Food}</Typography> 
                                        </Popover>
                                    </React.Fragment>
                                );
                            })}
                        </List>
     }

    return(
        <div>
             {listOfGuests}
            <UpdateDialog style = {{position:'absolute', left:'10vw'}} closeUpdate = {closeUpdate} updater = {props.updater} open = {updateInfo.status} close = {closeUpdate} Email = {updateInfo.Email} Food = {updateInfo.Food} Fname = {updateInfo.Fname} Lname = {updateInfo.Lname} >
            </UpdateDialog>

            <CustomDialog 
                open = {deleteInfo.status}           
                close = {closeDelete} 
                title = {'Delete Guest'} 
                text = {deletePrompt} 
                submit = {deleteGuest}
             >
            </CustomDialog>
        </div>
    )
}
export default GuestList;
