//  import from material-ui
import { Container, Typography, Grow, Grid, Paper,
  Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
  IconButton, Button
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

//  import styles & imagery
import mainStyle from '../../styles/spending/main';
import formStyle from '../../styles/spending/form';
import showStyle from '../../styles/spending/show';
import '../../styles/SpendingForm.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';   //  font
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';

//  import main components, functions
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, createData, editData, deleteData } from '../../actions/spend';
import { Line } from 'react-chartjs-2';

//  LOADING!
import PacmanLoader from 'react-spinners/PacmanLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';

//
//  EXPORTED MAIN FORM -----------------------------------------------------------------------------
const SpendingForm = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Source Code Pro',
        'monospaced',
      ].join(','),
    },
  });

  //  hook loader --------------------------------
  const [loading, setLoading] = useState(false);

  //  default: run only one time
  useEffect (() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false)
    }, 1500)    //  1.5 seconds

  }, [])


  //  currentID ----------------------------------
  const classes = mainStyle();          //  acquire unique styles
  const dispatch = useDispatch();       //  redux dispatch - state acquisitioner
  const [currentId, setCurrentId] = useState(null);     //  currentId - checks edit state

  //  getData and pass into currentId if exists
  useEffect(() => {
    dispatch(getData())
  }, [currentId, dispatch]);
  

  //  progress  ----------------------------------
  const [progress, setProgress] = useState(false);


  //  data  --------------------------------------
  //  array acquisitions using useSelector()
  const allSpendings = useSelector( (state) => state.spendings );
  const allAmounts = allSpendings.map((s)=>s.amount);
  const allTypes = allSpendings.map((s)=>s.type);
  const chartLabels = allSpendings.map((s)=>s.date);

  //  min/max
  const highest = Math.max(...allAmounts);
  const lowest = Math.abs(Math.min(...allAmounts));


  //  LINE CHART
  const LineChart = () => {
    return <div>
      <Line
        data={{
          labels: chartLabels,   // plot points
          datasets: [{
            label: "Amount",    //  data point
            data: allAmounts,
            borderColor: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "#008b8b",
            hoverBackgroundColor: "#E0FFFF",
          }]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            fontColor: "white",
          },
          scales: {
            xAxes: [{
              ticks: {
                  fontColor: "white",
              }
            }],
            yAxes: [{
              ticks: {
                  fontColor: "white",
              }
            }]
          } 
        }}
      />
    </div>
  }


  return (
    <div className="master">
      <ThemeProvider theme={theme}>
        { loading 
        ? 
        <PacmanLoader color={"#36D7B7"} loading={loading} size={75} margin={35}/>
        : (
        <Container maxWidth="lg">
          <Button className={classes.info} position="static" color="inherit" variant="outlined" onClick={() => setProgress(!progress)}> 
            <Typography className={classes.heading} variant="h2"> Spendings </Typography>
            <div className={ progress ? "rot active" : "rot"}>
              <DoubleArrowOutlinedIcon style={{ marginLeft: "20px", fontSize: "45px", color: "#008b8b" }}/>
            </div>
          </Button>
          
          <div className={ progress ? "dropdown active" : "dropdown" } style={{ display: "flex"}}>
            <div style={{ width: "70%"}}>
              <Typography className={classes.notif}> 
                The highest you've earned is <span style={{ color: "#86FB55"}}>+${allTypes.includes('DEPOSIT') ? highest : 0}</span>.
                Whereas the most you've spent is <span style={{ color: "#FF736F"}}>-${allTypes.includes('WITHDRAW') ? lowest : 0}</span>.
              </Typography>
              <LineChart />
            </div>

            <div style={{ width: "30%"}}>
              { highest >= lowest ? 
              <> 
                <Typography className={classes.notif} component={"span"} style={{ fontSize: "20px", color: "#86FB55"}}>Keep it up, you're in the green!</Typography>
                <Typography className={classes.notif}>It looks like you're on a steady track. 
                  Your earnings OUTWEIGH, or at the very least, BALANCES your spendings. Keep up the good work!</Typography>
              </> :  
              <> 
                <Typography className={classes.notif} component={"span"} style={{ fontSize: "20px", color: "#FF736F"}}>You're in the red. Try to ease your spending.</Typography>
                <Typography className={classes.notif}>Ease your spending! 
                  Your spending OUTWEIGHS your earnings. Improve your transaction management to see some financial improvement!</Typography>
              </>
              }
            </div>   
          </div>

          <Container className={classes.forms}>
            <Summary allAmounts={allAmounts} />
            <Grow in>
              <Grid container justify="space-between" align="center" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Show allSpendings={allSpendings} setCurrentId={setCurrentId}/>
                </Grid>
              </Grid> 
            </Grow> 
          </Container>
        </Container>
        )}
      </ThemeProvider>
    </div>
  );
}

//-------------------------------------------------------

//  total
const Summary = ({allAmounts}) => {
  const classes = showStyle();

  //  total 
  const totalSum = allAmounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const expense = Math.abs((allAmounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0))).toFixed(2);
  const income = allAmounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <TableContainer style={{ marginBottom: "30px" }}component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
              <TableRow className={classes.row} variant="h1">
                <TableCell align="center">INCOME</TableCell>
                <TableCell align="center">TOTAL FUNDS</TableCell>
                <TableCell align="center">EXPENSE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell className={classes.inc} align="center">+ $ {income}</TableCell>
                <TableCell className={totalSum >= 0 ? classes.inc : classes.exp} align="center"> 
                  { totalSum >= 0 ? '+ $ '+`${totalSum}` : '- $ '+`${Math.abs(totalSum).toFixed(2)}` }
                </TableCell>
                <TableCell className={classes.exp} align="center">- $ {expense}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </TableContainer>
  );
}

//  create/edit a transaction
const Form = ({currentId, setCurrentId}) => {
  const classes = formStyle();
  const dispatch = useDispatch();

  //  get singular id
  const idSpending = useSelector((state) => currentId ? state.spendings.find((s) => s._id === currentId) : null);

  //  get user
  const user = JSON.parse(localStorage.getItem('profile'));

  //  react hook: updates data in fields for front-end
  const [tData, setTransaction] = useState({
    type: 'DEPOSIT',
    amount: 0,
    descript:  ' ',
    date: new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: 'numeric'})
  });

  useEffect(() => {
    if(idSpending) setTransaction(idSpending);
  }, [idSpending])

  //  clear input
  const clear = (event) => {
    setCurrentId(null);   //  erase currentId
    setTransaction({
    type: 'DEPOSIT',
    amount: 0,
    descript:  ' ',
    date: new Date().toLocaleDateString('en-US', {
      month: '2-digit', day: '2-digit', year: 'numeric'}) })
  }

  //  create event handler for spend creation
  const handleSubmit = (e) => {
    //  prevent refresh
    e.preventDefault();

    //  convert amount value depending on type
    if(tData.type === 'WITHDRAW') {
      tData.amount = -Math.abs(tData.amount);
    }
    else {
      tData.amount = Math.abs(tData.amount);
    }

    //  if id is not empty, patch. otherwise, post
    if(currentId) { 
      dispatch(editData(currentId, tData)); 
    }
    else { dispatch(createData(tData)); }

    clear();
  }

  //  handler for editing...
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setTransaction(prev => {
      return {
        ...prev,   //  import bundle of data, just adjust new value
        [name]: value
      }
    })

  }

  //  select menu: values & labels
  const transactionType = [ 
    { value: 'DEPOSIT', label: 'Deposit'},
    { value: 'WITHDRAW', label: 'Withdraw'},
  ]

  return (
    <>
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6">{ currentId ? 'EDIT TRANSACTION' : 'CREATE TRANSACTION' }</Typography>
        <TextField select fullWidth className={classes.field} name="type" label="Type" helperText="Enter the transaction type." variant="outlined" 
        value={tData.type} onChange={handleChange}>
          { transactionType.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <TextField fullWidth className={classes.field} name="amount" label="Amount" helperText="Enter the $ amount." variant="outlined" 
        value={tData.amount} onChange={handleChange}/>
        <TextField fullWidth className={classes.field} name="descript" label="Description" helperText="Groceries? Salary? Owe a friend?" variant="outlined" 
        value={tData.descript} onChange={handleChange}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker disableToolbar name="date" variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
              label="Date picker inline"
              value={tData.date}
              onChange={(event) => setTransaction({...tData, date: new Date(event).toLocaleDateString('en-US', {
                month: '2-digit', day: '2-digit', year: 'numeric'})})}
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
const Show = ({allSpendings, setCurrentId}) => {
  const classes = showStyle();
  const dispatch = useDispatch();

  return (
    !allSpendings.length 
      ? <ScaleLoader color={"#36D7B7"} height={35} width={4} radius={2} margin={2}/> 
    : (
      <>  
          <TableContainer component={Paper} style={{ maxHeight: "480px"}}>
            <Table className={classes.table} stickyHeader aria-label="simple table" >
              <TableHead >
                <TableRow className={classes.row}>
                  <TableCell>Transaction</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center"><ChangeHistoryOutlinedIcon/></TableCell>
                  <TableCell align="center"><DeleteOutlineOutlinedIcon/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSpendings.map((s) => (
                  <TableRow key={s._id} style={{backgroundColor: s.amount >= 0 ? "#00ff0080" : "#ff000080" }} hover={true}>
                    <TableCell component="th" scope="row">{s.type}</TableCell>
                    <TableCell color="#00ff0080" align="center">$ {s.amount}</TableCell>
                    <TableCell align="center">{s.descript}</TableCell>
                    <TableCell align="center">{s.date}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="edit" className={classes.margin} onClick={() => setCurrentId(s._id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete" className={classes.margin} onClick={ () => dispatch(deleteData(s._id))}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
        
    )
  );
}

export default SpendingForm;