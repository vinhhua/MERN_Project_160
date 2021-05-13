import { makeStyles } from "@material-ui/core/styles";


//  for material-ui styling...
export default makeStyles(() => ({
    info: {
      borderRadius: 15,
      margin: "30px",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        backgroundColor: "#E0FFFF",
      }
    },

    heading: {
      color: "#008b8b",
    },

    notif: {
      color: "white",
    },

    forms: {
      marginTop: "50px"
    }
}));