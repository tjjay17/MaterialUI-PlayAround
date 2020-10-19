import React from 'react';

import {Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        DialogContentText,
        TextField
    } from '@material-ui/core';


const CustomDialog = (props) => {
    return(
      

        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.text}
                     </DialogContentText>
                     {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={props.submit} color="primary">
                        Continue
                    </Button>
                </DialogActions>
        </Dialog>
     
    );
}

export default CustomDialog;