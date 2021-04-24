//  imports
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../../App.css'
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import InputLabel from '@material-ui/core/InputLabel';

//  url for axios
const url = 'http://localhost:5000/spend-data';

//  show table
const Show = () => {
  //  styling
  const classes = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  
  //  local storage variables
  const [transactionList, setTransactionList] = useState([]);   //  empty list to hold transactions
  const [currentId, setCurrentId] = useState(null);       //  null id default

  //  list all transactions into list using useEffect()
  useEffect(() => {
    axios.get(url).then((allTransactions) => 
    setTransactionList(allTransactions.data))
  }, [])

  //  create event deletion handler
  //  const handleDelete = (e) => {}

   //  axios deletion client side - no reload
  const deleteTransaction = (id) => { axios.delete(`${url}/${id}`).then(
    () => { window.location.reload(false); })
  }

  const editTransaction = (id) => { }

  return (
    <>
    <h2>Spending Table</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList.map((t, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {t.name}
              </TableCell>
              <TableCell align="center">$ {t.amount}</TableCell>
              <TableCell align="center">{t.descript}</TableCell>
              <TableCell align="center">{t.date}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="edit" className={classes.margin}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete" className={classes.margin} onClick={ () => deleteTransaction(t._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

//-------------------------------------------------------

//  create transaction
const Create = () => {
  const classes = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  //  react hook: updates data in fields for front-end
  const [tData, setTransaction] = useState({
      name: 'Bot',
      amount: 9999.99,
      descript:  'basic',
      date: '04/22/21',
  });

  //  create event handler for spend creation
  const createTransaction = () => axios.post(url, tData).then( () => { window.location.reload(false); });  

  //  handler for editing...
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction(prevTransaction => {
      return {
        ...prevTransaction,
        [name]: value
      }
    })
  }

  return (
    <>
    <h2>Create Transaction</h2>  
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" name="name" label="Name" variant="outlined" value={tData.name} onChange={handleChange}/>
      <TextField id="outlined-basic" name="amount" label="Amount" variant="outlined" value={tData.amount} onChange={handleChange}/>
      <TextField id="outlined-basic" name="descript" label="Description" variant="outlined" value={tData.descript} onChange={handleChange}/>
      <TextField id="outlined-basic" name="date" label="Date" variant="outlined" value={tData.date}onChange={handleChange}/>
      <Button variant="contained" color="secondary" onClick={createTransaction} > Add </Button>
    </form>
    </>
  )
}

//------------------------------------------------------
const SpendingForm = () => {
  const classes = makeStyles(() => ({
    //  assign styles to tag names in App.js
    appBar: {
        borderRadius: 15, 
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }})); 

  return (
    <div className="App">
        <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Spending Page
            </Typography>
          </AppBar>

          <Grow in>
            <Container>
              <Grid container justify="space-between" align="center" alignItems="stretch">
                <Grid item xs={12} sm={7}>
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <Show />
                  </AppBar>
                </Grid>

                <Grid item xs={12} sm={4}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                  <Create />
                </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
    </div>
  );
}

export default SpendingForm;