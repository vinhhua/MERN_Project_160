//source: https://gist.github.com/adrianhajdin/d99aaa67124f0de7667fd3937715fb26

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: "#E0FFFF",
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    field: {
        marginBottom: 10,
    },
}));