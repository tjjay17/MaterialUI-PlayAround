import React,{useState} from 'react';
import {TextField,Button,Modal} from "@material-ui/core";
import axios from '../../axios';

const GuestForm = (props) =>{

    const [inputs, updateInputs] = useState({
        Email:'',
        Fname:'',
        Lname:'',
        Food:''
    });

    const handleInputChange = (event) =>{
        let value = event.target.value;
        let name = event.target.name;

        updateInputs(prevState =>({
            ...prevState,
            [name]:value
        })); 
    }

    const emailIsValid = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      }

    const submitForm = () =>{
        if(inputs.Email.length === 0 || inputs.Fname.length === 0 || inputs.Lname.length === 0){
            //modal msgs
            props.modal('One or more fields are empty');

        }else if(emailIsValid(inputs.Email) === false){
            props.modal('Invalid email format.');

        }else{
            axios.post('/createGuest',
                {
                    Email:inputs.Email,
                    Fname:inputs.Fname,
                    Lname:inputs.Lname,
                    Food:inputs.Food
                }
            )
            .then(response => {
                axios.get('/allGuests')
                    .then(res => props.updater(res.data))
                    .catch(err => console.log(err));
                return response;
            })
            .catch(err => console.log(err));
        }

    updateInputs({
        Email:'',
        Fname:'',
        Lname:'',
        Food:''
    });
}
    return(
        <form className = 'userInputs'>
                <TextField onChange = {handleInputChange} autoComplete = {'off'} color = {"primary" } placeholder = {'First Name'} type = {'text'} name = {'Fname'} label = {'First Name'} required = {true} value = {inputs.Fname} />
                <TextField onChange = {handleInputChange} autoComplete = {'off'} color = {"primary"} placeholder = {'Last Name'} type = {'text'} name = {'Lname'} label = {'Last Name'} required = {true} value = {inputs.Lname} />
                <TextField onChange = {handleInputChange} autoComplete = {'off'} color = {"primary"} placeholder = {'Email'} type = {'Email'} name = {'Email'} label = {'Email'} required = {true} value = {inputs.Email}/>
                <TextField onChange = {handleInputChange} autoComplete = {'off'} color = {"primary"} placeholder = {'Food Dish'} type = {'text'} name = {'Food'} label = {'Food Dish'} required = {true} value = {inputs.Food}/>
                <Button onClick = {submitForm}>Register</Button>     
        </form>
    );
}
export default GuestForm;