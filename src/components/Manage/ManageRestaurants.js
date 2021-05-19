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


class ManageRestaurants extends React.Component {

//   const classes = useStyles();

    state = {
        restaurantToAdd : {
            restaurant_name: '',
            user_id : "4fde28c9-5c13-4429-abe0-032137621baf"
        },
        restaurantToEdit: null,
        restaurantToDelete: null,
        restaurants: [],
        manageToggle: 'add'
    }

    componentDidMount() {
      axios.post("http://divyansh.zapto.org:3000/restaurant/fetchall", { user_id :"4fde28c9-5c13-4429-abe0-032137621baf" })
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              restaurants: result.data
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
        var temp = this.state.restaurantToAdd;
        temp[event.target.name] = val
        this.setState({restaurantToAdd: temp});
        console.log(this.state)
    }

    handleAddSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/restaurant/new',
            data: this.state.restaurantToAdd,
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

    handleEditState = (restaurantToEdit) => {
        this.setState({restaurantToEdit: restaurantToEdit})
    }

    handleEditChange = (event) => {
        var val = event.target.value; 
        var temp = this.state.restaurantToEdit;
        temp[event.target.name] = val
        this.setState({restaurantToEdit: temp});
        console.log(this.state.restaurantToEdit)
    }

    handleEditSave = () => {
        axios({
            method: 'post',
            url: 'http://divyansh.zapto.org:3000/restaurant/update',
            data: this.state.restaurantToEdit,
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


        this.setState({restaurantToEdit: null})
    }

    handleDelete = (id) => {
        // console.log(id)
        axios({
            method: 'delete',
            url: `http://divyansh.zapto.org:3000/restaurant/delete/${id}`,
            // data: this.state.itemToEdit,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                //handle success
                console.log(response.data);
                this.setState({restaurants: [...this.state.restaurants.filter(restaurant => restaurant.restaurant_id!==id)]})
                // alert(JSON.stringify(response.data));
                return this.state.restaurants;
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); 
            
    }

    buttonToggle = (row, classes) => {
        if(this.state.restaurantToEdit != null && this.state.restaurantToEdit.restaurant_id==row.restaurant_id ){
            return(
            <TableRow key={row.restaurant_id} onChange={this.handleEditChange}>
            <TableCell align="left"><TextField defaultValue={row.restaurant_name} name="restaurant_name"/></TableCell>
            <TableCell align="left" style={{width: 250}}>
            <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />}  onClick={() => {this.handleEditSave()}}>Save</Button>
            <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.restaurant_id)}}>Delete</Button>
            </TableCell>
            </TableRow>
            )
        } else {
            return(
            <TableRow key={row.restaurant_id}>
                    <TableCell align="left">{row.restaurant_name}</TableCell>
                    <TableCell align="left" style={{width: 250}}>
                    <Button variant="contained" size="small" className={classes.button1} startIcon={<SaveIcon />} onClick={() => {this.handleEditState(row)}}>Edit</Button>
                    <Button variant="contained"  size="small" className={classes.button2} startIcon={<DeleteIcon />} onClick={() => {this.handleDelete(row.restaurant_id)}}>Delete</Button>
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
            Add Restaurant
            </Typography>

            <form className={classes.form} onChange={this.handleAddChange} onSubmit={this.handleAddSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="restaurant_name"
                        name="restaurant_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="restaurant_name"
                        label="Restaurant Name"
                        autoFocus
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
                        <TableCell align="left">Restaurant Name</TableCell>
                        {/* <TableCell align="center">Total Quantity</TableCell> */}
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.restaurants.map((row) => (
                        this.buttonToggle(row, classes)
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    else {
        content = <p>Please select Add Item/ Edit Restaurant</p>
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

ManageRestaurants.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ManageRestaurants);



