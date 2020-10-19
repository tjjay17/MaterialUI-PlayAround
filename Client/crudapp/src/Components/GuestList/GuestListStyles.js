import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme=>({
    list:{
        backgroundColor:'#333',
        width:'45vw',
        position:'relative',
        left:'50vw',
        bottom:'38vh',
        color:'white',
        height:'30vh',
        overflowY:'scroll',
        borderRadius:'10px',
        fontFamily: "'Quicksand', sans-serif"
    },

    listItem:{
        cursor:'pointer'
    },

    divider:{
        backgroundColor:'white'
    },

    loader:{
        position:'relative',
        bottom:'25vh',
        left:'80vw'
    },
    paper:{
        width:'10vw',
        padding:'10px',
        backgroundColor:'pink'
    }
}));

export default useStyles;