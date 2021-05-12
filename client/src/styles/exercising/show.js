import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    table: {
        minWidth: "150px",
        borderWidth: "50px",
    },
    row: {
        backgroundColor: "#36D7B7",
        "&:hover": {
            backgroundColor: "#E0FFFF",
        }
    },
    inc: {
        color: "#86FB55",       //  green
    },
    exp: {
        color: "#FF736F",       //  red
    },
    
}));