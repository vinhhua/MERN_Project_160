import { makeStyles } from '@material-ui/core/styles';
import bg_img from '../../components/images/spend-bg.jpg';

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
    container: {
      minHeight: '100vh',
      backgroundImage: `url(${bg_img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
}));