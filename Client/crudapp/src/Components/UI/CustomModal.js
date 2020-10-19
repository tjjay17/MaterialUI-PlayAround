import React from 'react';
import {Modal} from '@material-ui/core';

const CustomModal = (props) =>{
    return(
        <Modal open = {props.open} onClose = {props.close} title =  >

        </Modal>
    );
}

export default CustomModal;