import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useEffect, useState } from "react";


import { ActivitiesInterface } from "../models/IActivity";
import { ClubsInterface } from "../models/IClub";
import { BudgetTypesInterface } from "../models/IBudgetType";
import { BudgetCategoriesInterface } from "../models/IBudgetCategory";
import { ClubCommitteesInterface } from "../models/IClubCommittee";
import { BudgetProposalInterface } from "../models/IBudgetProposal";
import { SigninsInterface } from "../models/ISignin";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    margin: { 
      marginLeft: theme.spacing(0),
    },

    root: {
      flexGrow: 1
    },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

  })

);


function BudgetCreate() {
 
  const classes = useStyles();
  const [Clubs, setClubs] = useState<ClubsInterface>();
  const loginUser = localStorage.getItem("uid");
  const [ClubCommittees, setClubCommittees] = useState<ClubCommitteesInterface>();
  const [Activities, setActivities] = useState<ActivitiesInterface[]>([]);
  const [BudgetTypes, setBudgetTypes] = useState<BudgetTypesInterface[]>([]);
  const [BudgetCategories, setBudgetCategories] = useState<BudgetCategoriesInterface[]>([]);  
  const [BudgetProposal, setBudgetProposal] = useState<Partial<BudgetProposalInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof BudgetProposal;
    setBudgetProposal({
      ...BudgetProposal,
      [name]: event.target.value,
    });
  };

 



    const getClubs = async () => {
      let uid = localStorage.getItem("uid");
     fetch(`${apiUrl}/clubname/clubcommittee/${loginUser}`, requestOptions)
       .then((response) => response.json())
        .then((res) => {
          console.log(res.data)
         if (res.data) {
            setClubs(res.data);
          } else {
            console.log("else");
          }
        });
    };

  const getClubCommittees = async () => {
    fetch(`${apiUrl}/clubcommittee/${loginUser}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setClubCommittees(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getActivities = async () => {
    fetch(`${apiUrl}/activities/clubid/${Clubs?.ID}`, requestOptions)//ดึง club_id มาจาก clubcommittee ได้ club_id มาเสิร์ฟหาใน Activity อีกที
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setActivities(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBudgetTypes = async () => {
    fetch(`${apiUrl}/budgettypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBudgetTypes(res.data);
        } else {
          console.log("else");
        }
      });
  }

  const getBudgetCategories = async () => {
    fetch(`${apiUrl}/budgetcategories`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBudgetCategories(res.data);
        } else {
          console.log("else");
        }
      });
  }

  useEffect(() => { 
    getActivities();
    getClubs();
    getClubCommittees();
    getBudgetCategories();
    getBudgetTypes();
  }, []);


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      ActivityID: BudgetProposal?.ActivityID  ,
      BudgetCategoryID: BudgetProposal?.BudgetCategoryID,
      BudgetTypeID: BudgetProposal?.BudgetTypeID,
      BudgetPrice:convertType(BudgetProposal?.BudgetPrice) ,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {  
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/budget_proposals`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  console.log(Clubs)



  return (

    <Container className={classes.container} maxWidth="md"> 
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
       
        <Box p={3}>
                    <Typography variant="h6">
                        กรรมการบริหารชมรม: {ClubCommittees?.ID_Student} {ClubCommittees?.Name}
                    </Typography>
                </Box>
         
      
      <Typography component="div" style={{ height: '7vh' }} />
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ระบบบันทึกการของบประมาณกิจกรรมชมรม
            </Typography>
          </Box>
        </Box>
        <Divider />



       <Grid container spacing={5} className={classes.root}>
          <Grid item xs={6}>
            <p>ชมรม</p>
            <FormControl className={classes.formControl} fullWidth >
              <Select
                defaultValue = {0} disabled  //set value = 0 
              >
                 <MenuItem value={0} >{Clubs?.Name}</MenuItem>
              
              </Select>
            </FormControl>
          </Grid>

         
          <Grid item xs={6}>
            <p>กิจกรรมชมรม</p>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                value={BudgetProposal.ActivityID}
                onChange={handleChange}
                onOpen={getActivities}//เมื่อไหร่ combobox เปิดทำงาน
                inputProps={{
                  name: 'ActivityID',
                }}
              >
                <MenuItem  aria-label="None" value="">
                กรุณาเลือกกิจกรรม
                </MenuItem >
                {Activities.map((item: ActivitiesInterface) => (
                  <MenuItem  value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem >
                ))}

              </Select>
            </FormControl>
          </Grid>

          

          <Grid item xs={6}>
            <p>ประเภทการของบ</p>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                
                value={BudgetProposal.BudgetTypeID}
                onChange={handleChange}
                inputProps={{
                  name: 'BudgetTypeID',
                }}
              >
               <MenuItem aria-label="None" value="">
                กรุณาเลือกประเภทการของบ
                </MenuItem>
                {BudgetTypes.map((item: BudgetTypesInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <p>หมวดหมู่</p>
            <FormControl className={classes.formControl} fullWidth>
              <Select
                
                value={BudgetProposal.BudgetCategoryID}
                onChange={handleChange}
                inputProps={{
                  name: 'BudgetCategoryID',

                }}
              >
               <MenuItem aria-label="None" value="">
                กรุณาเลือกหมวดหมู่
                </MenuItem>
                {BudgetCategories.map((item: BudgetCategoriesInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>ราคา</p>
             <TextField
               id="BudgetPrice"
               variant="outlined"
               type="number"
               size="medium"
               inputProps={{
                name: 'BudgetPrice',
              }}
               InputLabelProps={{
                 shrink: true,
               }}
               onChange={handleChange}
             />
           </FormControl>
         </Grid>


          <Grid item xs={12}>
          
          <Button
              component={RouterLink}
              to="/budget_proposals"
              variant="contained"
            >
              กลับ
            </Button>

            <Button

              style={{ float: "right" }}

              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}



export default BudgetCreate;
