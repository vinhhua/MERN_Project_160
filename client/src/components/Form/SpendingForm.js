//  import styles
import { Container, AppBar, Typography, Grow, Grid, Paper,
  Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
  IconButton, Button, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { green, red } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';

import '../../styles/SpendingForm.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//  url for axios
const url = 'http://localhost:5000/spend-data';

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
    }})
  );

  //  null id default
  const [currentId, setCurrentId] = useState(null);

  //  local storage variables
  const [transactionList, setTransactionList] = useState([]);   //  empty list to hold transactions

  //  list all transactions into list using useEffect()
  useEffect(() => {
    axios.get(url).then((allTransactions) => 
    setTransactionList(allTransactions.data))
  }, [])
  

  return (
    <div className="spending">
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
                    <Show currentId={currentId} setCurrentId={setCurrentId} transactionList={transactionList}/>
                  </AppBar>
                </Grid>

                <Grid item xs={12} sm={4}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                  <Form currentId={currentId} setCurrentId={setCurrentId} transactionList={transactionList}/>
                </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
    </div>
  );
}

//-------------------------------------------------------

//  create/edit a transaction
const Form = ({currentId, setCurrentId, transactionList}) => {
  const classes = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }));

  //  react hook: updates data in fields for front-end
  const [tData, setTransaction] = useState({
    name: ' ',
    amount: 99.99,
    descript:  ' ',
    date: Date.now()
  });

  //  clear input
  const clear = (event) => {
    setCurrentId(null);   //  erase currentId
    setTransaction({name: ' ',
    amount: 99.99,
    descript:  ' ',
    date: Date.now()});
  }

  //  create event handler for spend creation
  const handleSubmit = (id) => {
    //  if id is not empty
    if(currentId) { 
      //  patch data @ id
      axios.patch(`${url}/${id}`, tData).then( () => { window.location.reload(false); });
    }
    else {
      //  otherwise, just post
      axios.post(url, tData).then( () => { window.location.reload(false); });
    }
  }

  //  handler for editing...
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction(exclData => {
      return {
        ...exclData,   //  import bundle of data, just adjust new value
        [name]: value
      }
    })

  }

  //  date selection
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  return (
    <>
    <h2>{currentId ? 'Edit Transaction' : 'Create Transaction'}</h2>  
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" name="name" label="Name" variant="outlined" value={tData.name} onChange={handleChange}/>
      <TextField id="outlined-basic" name="amount" label="Amount" variant="outlined" value={tData.amount} onChange={handleChange}/>
      <TextField id="outlined-basic" name="descript" label="Description" variant="outlined" value={tData.descript} onChange={handleChange}/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            disableToolbar
            
            name="date"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={tData.date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }
          }
        />
      </MuiPickersUtilsProvider>
      <Button variant="contained" color="primary" onClick={() => handleSubmit(currentId)}>{currentId ? 'Edit' : 'Add'} </Button>
      <Button variant="contained" color="secondary" onClick={clear}>{currentId ? 'Cancel' : 'Clear'} </Button>
    </form>
    </>
  )
}

//  show table
const Show = ({currentId, setCurrentId, transactionList}) => {
  //  styling
  const classes = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  //  create event deletion handler
  //  const handleDelete = (e) => {}

   //  axios deletion client side - no reload
  const deleteTransaction = (id) => { axios.delete(`${url}/${id}`).then(
    () => { window.location.reload(false); })
  }

  //  const edit = currentId ? transactionList.find(t => t._id === currentId) : null;

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
                <IconButton aria-label="edit" style={{color: currentId ? green[500] : red[500]}} className={classes.margin} onClick={() => setCurrentId(t._id)}>
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

export default SpendingForm;