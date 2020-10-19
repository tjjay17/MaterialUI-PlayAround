import React,{useState} from 'react';
import {TextField} from '@material-ui/core';
import CustomDialog from './CustomDialog';
import axios from '../../axios';

const UpdateDialog = (props) => {

   
    let updatePrompt = 'You can update your food choice or name here. Email cannot be edited. Any blank fields will default to previous value.';

    const [inputs, updateInputs] = useState({
        Fname:'',
        Lname:'',
        Food:''
    });

    //this will handle changes to the textfields of the update dialog
    const handleChange = (event) =>{
        let name = event.target.name;
        let value = event.target.value;

        updateInputs(prevState =>({
            ...prevState,
            [name] : value
        }));
    }

     const submitUpdate = () =>{

        let food = '';
        let fname = '';
        let lname = '';
        
        //This sets the value of the inputs to be the previous value if you have any blank textfields.
        if (inputs.Food === ''){
            food = props.Food;
        }else{
            food = inputs.Food;
        }

        if (inputs.Fname === ''){
            fname = props.Fname;
        }else{
            fname = inputs.Fname;
        }

        if (inputs.Lname === ''){
            lname = props.Lname;
        }else{
            lname = inputs.Lname
        }

        axios.put('/updateGuest/' + props.Email +'/' + food + '/' + fname + '/' + lname)
        .then(res =>{
            axios.get('/allGuests')
                .then(res => {
                    props.updater(res.data);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

        props.closeUpdate();

        updateInputs({
            Food:'',
            Fname:'',
            Lname:''
        })
     }
    
    return(
        <CustomDialog 
            open = {props.open}           
            close = {props.close} 
            title = {'Update Guests'} 
            text = {updatePrompt} 
            submit = {submitUpdate}
        >
            <div style = {{display:'flex',flexDirection:'Column'}}>
                <TextField 
                    margin="dense"
                    name="Fname"
                    label="Fname"
                    type="text"
                    onChange = {handleChange}
                    fullWidth
                    value = {inputs.Fname}
                >
                </TextField>

                <TextField 
                    margin="dense"
                    name="Lname"
                    label="Last Name"
                    type="text"
                    onChange = {handleChange}
                    fullWidth
                    value = {inputs.Lname}
                >
                </TextField>

                <TextField 
                    margin="dense"
                    name="Food"
                    label="Food Choice"
                    type="text"
                    onChange = {handleChange}
                    fullWidth
                    value = {inputs.Food}
                >
                </TextField>
            </div>
        </CustomDialog>
    );
}
export default UpdateDialog;