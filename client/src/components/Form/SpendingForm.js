import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';  //  import unique style
import '../../App.css'
import { makeStyles } from '@material-ui/core/styles';  //  importing style
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

//  show table
const Show = () => {
  //  styling
  const classes = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  //list database info
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/spend').then((allTransactions) => 
    setTransactionList(allTransactions.data))
  }, [])

   //  axios deletion client side - no reload
  const deleteTransaction = (id) => { axios.delete(`http://localhost:5000/spend/${id}`).then(
    () => { window.location.reload(false); })
  }

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
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionList.map((t, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {t.name}
              </TableCell>
              <TableCell align="center">$ {t.amount}</TableCell>
              <TableCell align="center" variant="body">{t.descript}</TableCell>
              <TableCell align="center">{t.date}</TableCell>
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

  //    react hook: updates data in fields for front-end
  const [tData, setTransaction] = useState({
      name: 'Bot',
      amount: 9999.99,
      descript:  'basic',
      date: '04/22/21',
  });

  //    create student from click at database
  const createTransaction = () => { axios.post('http://localhost:5000/spend', tData).then(() => { window.location.reload(false); })}

  return (
    <>
    <h2>Create Transaction</h2>  
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Name" variant="outlined" value={tData.name}
      onChange={(event) => setTransaction({...tData, name: event.target.value})}/>
      <TextField id="outlined-basic" label="Amount" variant="outlined" value={tData.amount}
      onChange={(event) => setTransaction({...tData, amount: event.target.value})}/>
      <TextField id="outlined-basic" label="Description" variant="outlined" value={tData.descript} 
      onChange={(event) => setTransaction({...tData, descript: event.target.value})}/>
      <TextField id="outlined-basic" label="Date" variant="outlined" value={tData.date}
      onChange={(event) => setTransaction({...tData, date: event.target.value})}/>
      <Button variant="contained" color="secondary" onClick={createTransaction}> Add </Button>
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