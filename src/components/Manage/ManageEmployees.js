import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,
         makeStyles, withStyles, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Sidebar from '../shared/Sidebar';
import HeaderNav from '../shared/HeaderNav';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    table: {
        // minWidth: 650,
      },
    button1: {
        fontSize: 11,
        backgroundColor: '#4798a8',
        color: 'white',
        margin: theme.spacing(1),
    
        '&:hover,&:focus': {
              backgroundColor: '#396880',
            }, 
    },
    button2: {
        fontSize: 11,
        backgroundColor: '#cf4a4a',
        color: 'white',
        margin: theme.spacing(1),

        '&:hover,&:focus': {
            backgroundColor: '#b53535',
          }, 
    }
  });


class ManageEmployees extends React.Component {

//   const classes = useStyles();

    state = {
        employeeToAdd : {
            employee_name: '',
            phone : '',
            age : '',
            gender : '',
            employee_dob : '',
            category : 'server',
            outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a",
        },
        employeeToEdit: null,
        employeeToDelete: null,
        employees: [],
        manageToggle: 'add'
    }

    componentDidMount() {
      axios.post("http://divyansh.zapto.org:3000/employee/fetchall", {outlet_id : "3d75bccf-647a-47bb-8f47-9933a068a91a"})
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              employees: result.data
            });
          },
          (response) => {console.log(response.data)},
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }


    changeManageToggle = (manageToggle) => {
        this.setState({ manageToggle : manageToggle })
    }


    handleAddChange = (event) => {
        var val = event.target.name !== 'nonVeg' ? event.target.value : event.target.checked; 
        var temp = this.state.employeeToAdd;
        temp[event.target.name] = val
        this.setState({employeeToAdd: temp});
        console.log(this.state)
    }

    handleAddSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/employee/new',
            data: this.state.employeeToAdd,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
        e.preventDefault();    
    }

    handleEditState = (employeeToEdit) => {
        this.setState({employeeToEdit: employeeToEdit})
    }

    handleEditChange = (event) => {
        var val = event.target.value; 
        var temp = this.state.employeeToEdit;
        temp[event.target.name] = val
        this.setState({employeeToEdit: temp});
        console.log(this.state.employeeToEdit)
    }

    handleEditSave = () => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/employee/update',
            data: this.state.employeeToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
                alert(JSON.stringify(response.data));

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
        // e.preventDefault(); 


        this.setState({employeeToEdit: null})
    }

    handleDelete = (id) => {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://divyansh.zapto.org:3000/employee/delete/${id}`,
            // data: this.state.employeeToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                this.setState({employees: [...this.state.employees.filter(employee => employee.employee_id!==id)]})
                // alert(JSON.stringify(response.data));
                return this.state.employees;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
            
    }

    buttonToggle = (row, classes) => {
        if(this.state.employeeToEdit != null && this.state.employeeToEdit.employee_id==row.employee_id ){
            return(
            <TableRow key={row.employee_id} onChange={this.handleEditChange}>
            <TableCell align="left"><TextField defaultValue={row.employee_name} name="employee_name"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.phone} name="phone"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.age} name="age"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.gender} name="gender"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.employee_dob} name="employee_dob"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.category} name="category"/></TableCell>
            <TableCell align="left" style={{width: 250}}>
            <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />}  onClick={() => {this.handleEditSave()}}>Save</Button>
            <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.employee_id)}}>Delete</Button>
            </TableCell>
            </TableRow>
            )
        } else {
            return(
            <TableRow key={row.employee_id}>
                    <TableCell align="left">{row.employee_name}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.emloyee_dob}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left" style={{width: 250}}>
                    <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />} onClick={() => {this.handleEditState(row)}}>Edit</Button>
                    <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.employee_id)}}>Delete</Button>
                    </TableCell>
                </TableRow>)
        }
    }; 
  
  render() {

    const { classes } = this.props;

    var content;

    if (this.state.manageToggle == "add"){
        content = 
       ( 
        <Container maxWidth="xs">
        <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
            Add Employees
            </Typography>

            <form className={classes.form} onChange={this.handleAddChange} onSubmit={this.handleAddSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="employee_name"
                        name="employee_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="employee_name"
                        label="Employee Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="phone"
                        label="Contact Number"
                        name="phone"
                        autoComplete="phone"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        autoComplete="age"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                        autoComplete="gender"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="employee_dob"
                        label="Date of Birth"
                        name="employee_dob"
                        autoComplete="employee_dob"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="category"
                        label="Role"
                        name="category"
                        autoComplete="category"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Next
                </Button>
            </form>
        
        </div>
        </Container> )
    }

    else if(this.state.manageToggle == "edit") {

        
        
        content =
        <TableContainer  component={Paper} style={{maxWidth: 600}}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Employee Name</TableCell>
                        <TableCell align="left">Contact Number</TableCell>
                        <TableCell align="left">Age</TableCell>
                        <TableCell align="left">Gender</TableCell>
                        <TableCell align="left">Date of Birth</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.employees.map((row) => (
                        this.buttonToggle(row, classes)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    else {
        content = <p>Please select Add Employee/ Edit Employee</p>
    }

    return (
        <Container maxWidth="xl">
        <Grid container lg={12}>
            <Grid item lg={2}>
                <Sidebar />
            </Grid>
            <Grid item lg={10} >
                <HeaderNav changeManageToggle={this.changeManageToggle} />
            </Grid>
            <Grid container item lg={12} justify="center">
                <CssBaseline />
                    {content}
            </Grid>
        </Grid>
        </Container>
    )}
}

ManageEmployees.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ManageEmployees);



