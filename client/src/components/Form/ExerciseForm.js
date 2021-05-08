//  import from material-ui
import { Container, AppBar, Typography, Grow, Grid, Paper,
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
    IconButton, Button, CircularProgress 
  } from '@material-ui/core';
  import MenuItem from '@material-ui/core/MenuItem';
  import DeleteIcon from '@material-ui/icons/Close';
  import EditIcon from '@material-ui/icons/Edit';
  import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  
  //  import styles & imagery
  import mainStyle from '../../styles/exercising/main';
  import formStyle from '../../styles/exercising/form';
  import showStyle from '../../styles/exercising/show';
  import '../../styles/ExercisingForm.css';
  
  //  import main components, functions
  import React, { useEffect, useState, Component } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getData, createData, editData, deleteData } from '../../actions/exercise';
  import { Line } from 'react-chartjs-2';
  
  //
  //  EXPORTED MAIN FORM -----------------------------------------------------------------------------
  const ExerciseForm = () => {
    const classes = mainStyle();          //  acquire unique styles
    const dispatch = useDispatch();       //  redux dispatch - state acquisitioner
    const [currentId, setCurrentId] = useState(null);     //  currentId - checks edit state
  
    //  getData and pass into currentId if exists
    useEffect(() => {
      dispatch(getData())
    }, [currentId, dispatch]);
  
    //  array acquisitions using useSelector()
    const allExercises = useSelector( (state) => state.exercises );
    const allAmounts = allExercises.map((exr)=>exr.time);
    const chartLabels = allExercises.map((exr)=>exr.date);
  
    //  CHART CLASS
    class Chart extends Component {
      //  constructor
      constructor(props) {
        super(props);
        this.state = {
          chartData: {
            labels: chartLabels,
            datasets:[{ 
              label: 'Amount Tracking', 
              data: allAmounts, 
              fill: false,
              borderColor: 'rgb(0, 0, 0)',
            }]
          }
        }
      }
  
      //  required call
      render() {
        return (
          <div className="chart">
            <Line data={this.state.chartData} options={{ maintainAspectRatio: false }}/>
          </div>
        )
      }
    }
  
    return (
      <Container className="container" maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Exercises
          </Typography>
        </AppBar>
        <Chart />
        <Grow in>
          <Container>
            <Grid container justify="space-between" align="center" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Show allExercises={allExercises} allAmounts={allAmounts} setCurrentId={setCurrentId}/>
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
    const dispatch = useDispatch();
  
    const idExercise = useSelector((state) => currentId ? state.exercises.find((exr) => exr._id === currentId) : null);
  
    //  react hook: updates data in fields for front-end
    const [eData, setExercise] = useState({
      type: 'HEAVY',
      time: 0,
      descript:  ' ',
      date: new Date().toLocaleDateString()
    });
  
    useEffect(() => {
      if(idExercise) setExercise(idExercise);
    }, [idExercise])
  
    //  clear input
    const clear = (event) => {
      setCurrentId(null);   //  erase currentId
      setExercise({
      type: 'HEAVY',
      time: 0,
      descript:  ' ',
      date: new Date().toLocaleDateString() })
    }
  
    //  create event handler for spend creation
    const handleSubmit = (e) => {
      //  prevent refresh
      e.preventDefault();
  
      //  if id is not empty, patch. otherwise, post
      if(currentId) { 
        dispatch(editData(currentId, eData)); 
      }
      else { dispatch(createData(eData)); }
  
      clear();
    }
  
    //  handler for editing...
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
  
      setExercise(prev => {
        return {
          ...prev,   //  import bundle of data, just adjust new value
          [name]: value
        }
      })
  
    }
  
    //  select menu: values & labels
    const exerciseType = [ 
      { value: 'HEAVY', label: 'JOG/RUN'},
      { value: 'MEDIUM', label: 'PUSH-UPS/SIT-UPS'},
      { value: 'EASY', label: 'WALK'},
    ]
  
    return (
      <>
      <Paper className={classes.paper}>
        <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h6">{ currentId ? 'EDIT EXERCISE' : 'CREATE EXERCISE' }</Typography>
          <TextField select fullWidth className={classes.field} name="type" label="Type" helperText="Enter the type of deposit." variant="outlined" 
          value={eData.type} onChange={handleChange}>
            { exerciseType.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth className={classes.field} name="time" label="Time (min.)" variant="outlined" 
          value={eData.time} onChange={handleChange}/>
          <TextField fullWidth className={classes.field} name="descript" label="Description" variant="outlined" 
          value={eData.descript} onChange={handleChange}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar name="date" variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
                label="Date picker inline"
                value={eData.date}
                onChange={(event) => setExercise({...eData, date: new Date(event).toLocaleDateString()})}
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
  const Show = ({allExercises, allAmounts, setCurrentId}) => {
    const classes = showStyle();
    const dispatch = useDispatch();
  
    //  total 
    const totalSum = allAmounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = Math.abs((allAmounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0))).toFixed(2);
    const income = allAmounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  
    //  DataGrid columns
    const columns = [
      { field: 'type', headerName: 'Type', width: 130 },
      { field: 'time', headerName: 'Time', width: 130 },
      { field: 'descript', headerName: 'Description', width: 130 },
      { field: 'date', headerName: 'Date', width: 130 },
    ];
  
    return (
      !allExercises.length ? <CircularProgress /> : (
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
                <TableCell align="center">{ totalSum >= 0 ? '$ '+`${totalSum}` : '- $ '+`${Math.abs(totalSum).toFixed(2)}` }</TableCell>
                <TableCell className={classes.exp} align="center">- $ {expense}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
  
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExercises.map((exr) => (
                <TableRow key={exr._id} hover={true}>
                  <TableCell component="th" scope="row">{exr.type}</TableCell>
                  <TableCell color="#00ff0080" align="center">$ {exr.time}</TableCell>
                  <TableCell align="center">{exr.descript}</TableCell>
                  <TableCell align="center">{exr.date}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" className={classes.margin} onClick={() => setCurrentId(exr._id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" className={classes.margin} onClick={ () => dispatch(deleteData(exr._id))}>
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
  
  export default ExerciseForm;