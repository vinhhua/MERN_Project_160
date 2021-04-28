import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    //  assign styles to tag names in App.js
    appBar: {
      borderRadius: 15, 
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heading: {
      color: 'rgba(3, 125, 80, 1)',
      fontFamily: 'Comic Sans',
    },
    image: {
      marginLeft: '200px',
    },
}));