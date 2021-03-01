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


class ManageOutlets extends React.Component {

//   const classes = useStyles();

    state = {
        outletToAdd : {
            outlet_name: '',
            outlet_location : "london",
            restaurant_id : "a01c1a90-9e01-4549-942e-cf3c00376089",
        },
        outletToEdit: null,
        outletToDelete: null,
        outlets: [],
        manageToggle: 'add'
    }

    componentDidMount() {
      axios.post("http://divyansh.zapto.org:3000/outlet/fetchall", { restaurant_id : "a01c1a90-9e01-4549-942e-cf3c00376089"})
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              outlets: result.data
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
        var temp = this.state.outletToAdd;
        temp[event.target.name] = val
        this.setState({outletToAdd: temp});
        console.log(this.state)
    }

    handleAddSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/outlet/new',
            data: this.state.outletToAdd,
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

    handleEditState = (outletToEdit) => {
        this.setState({outletToEdit: outletToEdit})
    }

    handleEditChange = (event) => {
        var val = event.target.value; 
        var temp = this.state.outletToEdit;
        temp[event.target.name] = val
        this.setState({outletToEdit: temp});
        console.log(this.state.outletToEdit)
    }

    handleEditSave = () => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/outlet/update',
            data: this.state.outletToEdit,
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


        this.setState({outletToEdit: null})
    }

    handleDelete = (id) => {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://divyansh.zapto.org:3000/outlet/delete/${id}`,
            // data: this.state.outletToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                this.setState({outlets: [...this.state.outlets.filter(outlet => outlet.outlet_id!==id)]})
                // alert(JSON.stringify(response.data));
                return this.state.outlets;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
            
    }

    buttonToggle = (row, classes) => {
        if(this.state.outletToEdit != null && this.state.outletToEdit.outlet_id==row.outlet_id ){
            return(
            <TableRow key={row.outlet_id} onChange={this.handleEditChange}>
            <TableCell align="left"><TextField defaultValue={row.outlet_name} name="outlet_name"/></TableCell>
            <TableCell align="left"><TextField defaultValue={row.outlet_location} name="outlet_location"/></TableCell>
            <TableCell align="left" style={{width: 250}}>
            <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />}  onClick={() => {this.handleEditSave()}}>Save</Button>
            <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.outlet_id)}}>Delete</Button>
            </TableCell>
            </TableRow>
            )
        } else {
            return(
            <TableRow key={row.outlet_id}>
                    <TableCell align="left">{row.outlet_name}</TableCell>
                    <TableCell align="left">{row.outlet_location}</TableCell>
                    <TableCell align="left" style={{width: 250}}>
                    <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />} onClick={() => {this.handleEditState(row)}}>Edit</Button>
                    <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.outlet_id)}}>Delete</Button>
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
            Add Outlets
            </Typography>

            <form className={classes.form} onChange={this.handleAddChange} onSubmit={this.handleAddSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="outlet_name"
                        name="outlet_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="outlet_name"
                        label="Outlet Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="outlet_location"
                        label="Outlet Location"
                        name="outlet_location"
                        autoComplete="outlet_location"
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
                        <TableCell align="left">Outlet Name</TableCell>
                        <TableCell align="left">Outlet Location</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.outlets.map((row) => (
                        this.buttonToggle(row, classes)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    else {
        content = <p>Please select Add outlet/ Edit outlet</p>
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

ManageOutlets.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ManageOutlets);



