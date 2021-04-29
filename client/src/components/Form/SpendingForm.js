//  import from material-ui
import { Container, AppBar, Typography, Grow, Grid, Paper,
  Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
  IconButton, Button, CircularProgress 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'react-moment';
import { DataGrid } from '@material-ui/data-grid';

//  import styles & imagery
import mainStyle from '../../styles/spending/main';
import formStyle from '../../styles/spending/form';
import showStyle from '../../styles/spending/show';
import logo from '../images/spend-logo.png';

//  import main components, functions
import React, { useEffect, useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, createData, editData, deleteData } from '../../actions/spend';

import { Bar, Line, Pie } from 'react-chartjs-2';

//------------------------------------------------------
const SpendingForm = () => {
  const classes = mainStyle();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getData())
  }, [currentId, dispatch]);

  const spendings = useSelector( (state) => state.spendings );
  const amount = spendings.map((s)=>s.amount);
  const labels = spendings.map((s)=>s._name);

  console.log(spendings);

    //  class chart
  class Chart extends Component {
    //  constructor
    constructor(props) {
      super(props);
      this.state = {
        chartData: {
          labels: labels,
          datasets:[
            {
              label: 'Spendings',
              data: amount,
            }
          ]
        }
      }
    }

    //  required call
    render() {
      return (
        <div className="chart">
          <Line data={this.state.chartData} options={{ maintainAspectRatio: false}}/>
        </div>
      )
    }
  }

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Spendings
        </Typography>
        <img className={classes.image} src={logo} alt="logo" height="60"></img>
      </AppBar>
      <Chart />
      <Grow in>
        <Container>
          <Grid container justify="space-between" align="center" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Show spendings={spendings}setCurrentId={setCurrentId}/>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

//-------------------------------------------------------

//  create/edit a transaction
const Form = ({currentId, setCurrentId}) => {
  const classes = formStyle();
  const spending = useSelector((state) => currentId ? state.spendings.find((s) => s._id === currentId) : null);
  const dispatch = useDispatch();

  //  react hook: updates data in fields for front-end
  const [tData, setTransaction] = useState({
    name: ' ',
    amount: 0.01,
    descript:  ' ',
    date: new Date()
  });

  useEffect(() => {
    if(spending) setTransaction(spending);
  }, [spending])

  //  clear input
  const clear = (event) => {
    setCurrentId(null);   //  erase currentId
    setTransaction({
    name: ' ',
    amount: 0,
    descript:  ' ',
    date: new Date()})
  }

  //  create event handler for spend creation
  const handleSubmit = (e) => {
    //  prevent refresh
    e.preventDefault();

    //  if id is not empty, patch. otherwise, post
    if(currentId) { dispatch(editData(currentId, tData)); }
    else { dispatch(createData(tData)); }

    clear();
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

  return (
    <>
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6">{ currentId ? 'EDIT TRANSACTION' : 'CREATE TRANSACTION' }</Typography>
        <TextField className={classes.field} name="name" label="Name" variant="outlined" value={tData.name} fullWidth onChange={handleChange}/>
        <TextField className={classes.field} name="amount" label="Amount" variant="outlined" value={tData.amount} fullWidth onChange={handleChange}/>
        <TextField className={classes.field} name="descript" label="Description" variant="outlined" value={tData.descript} fullWidth onChange={handleChange}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar name="date" variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
              label="Date picker inline"
              value={tData.date}
              onChange={(event) => setTransaction({...tData, date: new Date(event)})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }
            }
          />
        </MuiPickersUtilsProvider>
        <Button className={classes.field} variant="contained" color="primary" size="large" type="submit" fullWidth>
          {currentId ? 'Edit' : 'Add'} 
        </Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>{currentId ? 'Cancel' : 'Clear'}</Button>
      </form>
    </Paper>
    </>
  );
}

//  show table
const Show = ({spendings, setCurrentId}) => {
  const classes = showStyle();
  const dispatch = useDispatch();

  const amount = spendings.map((s)=>s.amount);

  //  total 
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = Math.abs((amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0))).toFixed(2);
  const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

  //  DataGrid columns
  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Transaction', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'descript', headerName: 'Description', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
  ];

  return (
    !spendings.length ? <CircularProgress /> : (
      <TableContainer component={Paper}>
        <Table styles={{ padding: '20px' }} className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow variant="h2">
              <TableCell align="center">INCOME</TableCell>
              <TableCell align="center">TOTAL FUNDS</TableCell>
              <TableCell align="center">EXPENSE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.inc} align="center">+ $ {income}</TableCell>
              <TableCell align="center">{ total > 0 ? '$'+`${total}` : '- $ '+`${Math.abs(total).toFixed(2)}` }</TableCell>
              <TableCell className={classes.exp} align="center">- $ {expense}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div style={{ height: 400, width: '100%', marginTop: 40 }}>
          <DataGrid columns={columns} pageSize={5} rows={spendings} getRowId={(row) => row._id} checkboxSelection 
          onRowSelected={(event) => dispatch(deleteData(event.data._id))}/>
        </div>

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
            {spendings.map((s) => (
              <TableRow key={s._id} style={{backgroundColor: s.amount > 0 ? "#00ff0080" : "#ff000080" }} hover={true}>
                <TableCell component="th" scope="row">{s.name}</TableCell>
                <TableCell color="#00ff0080" align="center">$ {s.amount}</TableCell>
                <TableCell align="center">{s.descript}</TableCell>
                <TableCell align="center">
                  <Moment format="MM/DD/YYYY">{s.date}</Moment>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" className={classes.margin} onClick={() => setCurrentId(s._id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" className={classes.margin} onClick={ () => dispatch(deleteData(s._id))}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default SpendingForm;