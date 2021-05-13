//  import from material-ui
import { Container, Typography, Grow, Grid, Paper,
    Table, TableBody,TableCell, TableContainer, TableHead, TableRow, TextField,
    IconButton, Button, 
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
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

//  import main components, functions
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, createData, editData, deleteData } from "../../actions/exercise";
import { Doughnut, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
  
//
//  EXPORTED MAIN FORM -----------------------------------------------------------------------------
const ExerciseForm = () => {
  //  acquire user
  const user = JSON.parse(localStorage.getItem("authToken"));

  //  hook loader --------------------------------
  const classes = mainStyle();          //  acquire unique styles
  const dispatch = useDispatch();       //  redux dispatch - state acquisitioner
  const [currentId, setCurrentId] = useState(null);     //  currentId - checks edit state

  const [loading, setLoading] = useState(false);
  //  default: run only one time
  useEffect (() => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false)
    }, 1500)    //  1.5 seconds

  }, [])

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Source Code Pro",
        "monospaced",
      ].join(","),
    },
  });

  //  getData and pass into currentId if exists
  useEffect(() => {
    dispatch(getData())
  }, [currentId, dispatch]);


  //  array acquisitions using useSelector()
  const allExercises = useSelector((state) => state.exercises).filter(e => e.creator === user?.result?._id);
  const allTimes = allExercises.map((exr)=>exr.time);

  //  get times based on value
  const jog = allExercises.filter(exr => exr.name === "JOG/RUN").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const ups = allExercises.filter(exr => exr.name === "PUSH-UPS/SIT-UPS").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const walk = allExercises.filter(exr => exr.name === "WALK").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const sports = allExercises.filter(exr => exr.name === "SPORTS").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const stretches = allExercises.filter(exr => exr.name === "STRETCHES").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);

  //  progress  ----------------------------------
  const [progress, setProgress] = useState(false);

  //  select menu: values & labels
  const exerciseType = [ 
    { value: "HEAVY", label: "JOG/RUN", color: "rgb(255, 99, 132)"},
    { value: "MEDIUM", label: "PUSH-UPS/SIT-UPS", color: "rgb(75, 192, 192)"},
    { value: "LIGHT", label: "WALK", color: "rgb(255, 205, 86)"},
    { value: "HEAVY", label: "SPORTS", color: "rgb(211, 142, 246)"},
    { value: "LIGHT", label: "STRETCHES", color: "rgb(54, 162, 235)"}
  ]

  //  map list of colors randomly - for loading screen
  const bgColors = exerciseType.map(e => e.color);
  const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];    //  choose element

  //  POLAR AREA CHART
  const Chart = () => {
    return <div>
      { progress ? <Bar
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
            data: [jog, ups, walk, sports, stretches],
            backgroundColor: bgColors,
            hoverBackgroundColor: [
              "rgb(215, 59, 92)",
              "rgb(35, 152, 152)",
              "rgb(215, 165, 46)",
              "rgb(171, 102, 206)",
              "rgb(14, 122, 195)"
            ],
            fontColor: "rgb(255, 255, 255)",
          }]
        }}
        height={300}
        options={{
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
          },
        }}
      />
      :
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
          data: [jog, ups, walk, sports, stretches],
          backgroundColor: bgColors,
          hoverBackgroundColor: [
            "rgb(215, 59, 92)",
            "rgb(35, 152, 152)",
            "rgb(215, 165, 46)",
            "rgb(171, 102, 206)",
            "rgb(14, 122, 195)"
          ],
          fontColor: "rgb(255, 255, 255)",
        }]
      }}
      height={300}
      options={{
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
        },
      }} 
    />
    }
    </div> 
  }

  return (
    <motion.div className="master"
    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5 }}>
    { loading ? <ClimbingBoxLoader color={randomColor} size={50}/> 
    :
    <>
    <ThemeProvider theme={theme}>
      <Container className="container" maxWidth="lg">
        <Button className={classes.info} position="static" color="inherit" variant="outlined" onClick={() => setProgress(!progress)}> 
          <Typography className={classes.heading} variant="h2"> {user?.result?.username}'s Exercises </Typography>
          <div className={ progress ? "rot active" : "rot"}>
            <DoubleArrowOutlinedIcon style={{ fontSize: "7em", color: "#008b8b" }}/>
          </div>
        </Button>
          
        <Grow in>
          <Container>
            <Grid container justify="space-between" align="center" alignItems="stretch" spacing={2}>
              <Grid item xs={12} sm={4}>
                <Summary allExercises={allExercises} allTimes={allTimes} exerciseType={exerciseType}/>
                <Form user={user} currentId={currentId} setCurrentId={setCurrentId} exerciseType={exerciseType}/>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Chart />
                <Show allExercises={allExercises} setCurrentId={setCurrentId} exerciseType={exerciseType} bgColors={bgColors}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
    </>}
    </motion.div>
  );
}

//-------------------------------------------------------

//  total
const Summary = ({allExercises, allTimes}) => {
  const classes = showStyle();

  //  calculations
  //  minute conversions
  const totalMin = allTimes.reduce((acc, item) => (acc += item), 0).toFixed(1);
  const totalHrs = (totalMin / 60).toFixed(2);
  const totalDays = (totalHrs / 24).toFixed(2);

  //  calories
  const heavy = allExercises.filter(exr => exr.type === "HEAVY").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const medium = allExercises.filter(exr => exr.type === "MEDIUM").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const light = allExercises.filter(exr => exr.type === "LIGHT").map(t => t.time).reduce((acc, item) => (acc += item), 0).toFixed(2);

  const totalCals = (heavy * 15) + (medium * 10) + (light * 5);
  return (
    <TableContainer style={{ marginBottom: "30px" }}component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow variant="h2">
              <TableCell align="center">TOTAL MINUTES</TableCell>
              <TableCell align="center">TOTAL HOURS</TableCell>
              <TableCell align="center">TOTAL DAYS</TableCell>
              <TableCell align="center">TOTAL CALORIES BURNT (cals)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell align="center">{totalMin} min.</TableCell>
              <TableCell align="center">{totalHrs} hr.</TableCell>
              <TableCell align="center">{totalDays} days</TableCell>
              <TableCell align="center">{totalCals} cals.</TableCell>
            </TableRow>
          </TableBody>
      </Table>
    </TableContainer>
  );
}

//  create/edit a transaction
const Form = ({user, currentId, setCurrentId, exerciseType}) => {
  const classes = formStyle();
  const dispatch = useDispatch();

  //  react hook: updates data in fields for front-end
  const [eData, setExercise] = useState({
    type: "HEAVY",
    name: "JOG/RUN",
    time: 0,
    descript:  " ",
    date: new Date().toLocaleDateString("en-US", {
      month: "2-digit", day: "2-digit", year: "numeric"})
  });

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

  //  acquire one specific exercise id
  const idExercise = useSelector((state) => currentId ? state.exercises.find((exr) => exr._id === currentId) : null);
  useEffect(() => {
    if(idExercise) setExercise(idExercise);
  }, [idExercise])

  //  create event handler for spend creation
  const handleSubmit = (e) => {
    //  prevent refresh
    e.preventDefault();

    //  add to type depending on name
    eData.type = exerciseType.find(exr => exr.label === eData.name).value;

    //  if id is not empty, patch. otherwise, post
    if(currentId) { 
      dispatch(editData(currentId, {...eData, creator: user?.result?._id})); 
    }
    else { dispatch(createData({...eData, creator: user?.result?._id})); }

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
              onChange={(event) => setExercise({...eData, date: new Date(event).toLocaleDateString("en-US", {
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
const Show = ({allExercises, setCurrentId, exerciseType, bgColors}) => {
  const classes = showStyle();
  const dispatch = useDispatch();

  return (
    !allExercises.length ? <ScaleLoader color={"#36D7B7"} height={35} width={4} radius={2} margin={2}/> 
    : (
      <>
      <TableContainer component={Paper} style={{ maxHeight: "390px"}}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type of Exercise</TableCell>
              <TableCell align="center">Duration (min.)</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center"><ChangeHistoryOutlinedIcon/></TableCell>
              <TableCell align="center"><DeleteOutlineOutlinedIcon/></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExercises.map((exr) => (
              <TableRow key={exr._id} style={{ backgroundColor: bgColors[exerciseType.findIndex(ev => ev.label === exr.name)] }}>
                <TableCell component="th" scope="row">{exr.name}</TableCell>
                <TableCell align="center">{exr.time} min.</TableCell>
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