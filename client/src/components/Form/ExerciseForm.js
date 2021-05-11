//  import from material-ui
import { Container, AppBar, Typography, Grow, Grid, Paper,
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
    IconButton, Button, CircularProgress 
  } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//  import styles & imagery
import mainStyle from "../../styles/exercising/main";
import formStyle from "../../styles/exercising/form";
import showStyle from "../../styles/exercising/show";
import "../../styles/ExercisingForm.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";   //  font
import ChangeHistoryOutlinedIcon from "@material-ui/icons/ChangeHistoryOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import DoubleArrowOutlinedIcon from "@material-ui/icons/DoubleArrowOutlined";
import ScaleLoader from "react-spinners/ScaleLoader";

//  import main components, functions
import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, createData, editData, deleteData } from "../../actions/exercise";
import { Polar, Pie, Doughnut } from "react-chartjs-2";
  
  //
  //  EXPORTED MAIN FORM -----------------------------------------------------------------------------
  const ExerciseForm = () => {
    const theme = createMuiTheme({
      typography: {
        fontFamily: [
          "Source Code Pro",
          "monospaced",
        ].join(","),
      },
    });

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

    //  POLAR AREA CHART
    const Chart = () => {
      return <div>
        <Doughnut
          data={{
            labels: [
              "Jog/Run",
              "Push/Sit-Ups",
              "Walk",
              "Sports",
              "Stretches"
            ],   // plot points
            datasets: [{
              label: "Duration",    //  data point
              data: [100, 200, 300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(201, 203, 207)",
                "rgb(54, 162, 235)"
              ],
              hoverBackgroundColor: [
                "rgb(215, 59, 92)",
                "rgb(35, 152, 152)",
                "rgb(215, 165, 46)",
                "rgb(161, 163, 167)",
                "rgb(14, 122, 195)"
              ],
              fontColor: "rgb(255, 255, 255)",
            }]
          }}
          height={400}
          options={{
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                color: "pink",
                font: {
                  weight: 'bold',
                  size: 16,
                  family: 'Josefin Sans',
                }
              }
            },
            animation: {
              animateRotate: true,
            },
          }}
        />
      </div>
    }
  
  
  
    return (
      <div className="master">
      <ThemeProvider theme={theme}>
        <Container className="container" maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">  Exercises </Typography>
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
      </ThemeProvider>
      </div>
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
      type: "HEAVY",
      name: "JOG/RUN",
      time: 0,
      descript:  " ",
      date: new Date().toLocaleDateString("en-US", {
        month: "2-digit", day: "2-digit", year: "numeric"})
    });
  
    useEffect(() => {
      if(idExercise) setExercise(idExercise);
    }, [idExercise])
  
    //  clear input
    const clear = (event) => {
      setCurrentId(null);   //  erase currentId
      setExercise({
      type: "HEAVY",
      name: "JOG/RUN",
      time: 0,
      descript:  " ",
      date: new Date().toLocaleDateString("en-US", {
        month: "2-digit", day: "2-digit", year: "numeric"}) })
    }
  
    //  create event handler for spend creation
    const handleSubmit = (e) => {
      //  prevent refresh
      e.preventDefault();

      //  add to type depending on name
      eData.type = exerciseType.find(exr => exr.label === eData.name).value;
  
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
      { value: "HEAVY", label: "JOG/RUN"},
      { value: "MEDIUM", label: "PUSH-UPS/SIT-UPS"},
      { value: "EASY", label: "WALK"},
      { value: "HEAVY", label: "SPORTS"},
      { value: "EASY", label: "STRETCHES"}
    ]
  
    return (
      <>
      <Paper className={classes.paper}>
        <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h6">{ currentId ? "EDIT EXERCISE" : "CREATE EXERCISE" }</Typography>
          <TextField select fullWidth className={classes.field} name="name" label="Type" helperText="Enter the type of exercise." variant="outlined" 
          value={eData.name} onChange={handleChange}>
            { exerciseType.map((option) => (
              <MenuItem key={option.label} value={option.label}>{option.label}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth className={classes.field} name="time" label="Time (min.)" helperText="Enter the duration in minutes." variant="outlined" 
          value={eData.time} onChange={handleChange}/>
          <TextField fullWidth className={classes.field} name="descript" label="Description" helperText="How did your exercise go?" variant="outlined" 
          value={eData.descript} onChange={handleChange}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar name="date" variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
                label="Date picker inline"
                value={eData.date}
                onChange={(event) => setExercise({...eData, date: new Date().toLocaleDateString("en-US", {
                  month: "2-digit", day: "2-digit", year: "numeric"})})}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }
              }
            />
          </MuiPickersUtilsProvider>
          <Button className={classes.field} variant="contained" color="primary" size="large" type="submit" fullWidth>
            {currentId ? "Edit" : "Add"} 
          </Button>
          <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>{currentId ? "Cancel" : "Clear"}</Button>
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
  
    return (
      !allExercises.length ? <ScaleLoader color={"#36D7B7"} height={35} width={4} radius={2} margin={2}/> 
      : (
        <>
        <TableContainer component={Paper}>
          <Table styles={{ padding: "20px" }} className={classes.table} aria-label="simple table">
          <TableHead>
              <TableRow variant="h2">
                <TableCell align="center">TOTAL CALORIES BURNT</TableCell>
                <TableCell align="center">Heavy</TableCell>
                <TableCell align="center">Medium</TableCell>
                <TableCell align="center">Easy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{totalSum}</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
  
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="center">Duration (min.)</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center"><ChangeHistoryOutlinedIcon/></TableCell>
                <TableCell align="center"><DeleteOutlineOutlinedIcon/></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExercises.map((exr) => (
                <TableRow key={exr._id} hover={true}>
                  <TableCell component="th" scope="row">{exr.type}</TableCell>
                  <TableCell color="#00ff0080" align="center">{exr.time} min.</TableCell>
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
        </>
      )
    );
  }
  
  export default ExerciseForm;