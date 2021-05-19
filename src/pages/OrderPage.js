import React from 'react'
import PropTypes from 'prop-types';
import { Container, Grid, withStyles, Button} from '@material-ui/core'
import Items from '../components/Order/Items'
import Billing from '../components/Order/Billing'
import SearchAppBar from '../components/Order/Searchbar';
import MenuItems from '../components/Order/MenuItems';
import Sidebar from '../components/shared/Sidebar';
import Navigator from '../components/archive/Navigator';
import Layout from '../components/Layout/Layout';
import SideMenu from '../components/shared/SideMenu';
import CustomerDetails from '../components/Order/CustomerDetails';
import Controls from '../components/controls/Controls';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import InputIcon from '@material-ui/icons/Input';
import { teal, lightGreen, lime } from '@material-ui/core/colors';


const styles = theme => ({
        orderContainer : {
            background: '#fdfcfa',
            // background: 'rgb(145,145,145)',
            // background: 'linear-gradient(90deg, rgba(145,145,145,1) 0%, rgba(255,239,217,1) 100%)',
            width: '100%',
            height: '100vh',
        },
        // submitButton : {
        //     backgroundColor: '#4fc466',
        //     '& :hover': {
        //         backgroundColor: '#378245'
        //     },
        // },
        submitWrap : {
            padding: theme.spacing(3),
        }
});

const OrderButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lightGreen[900]),
      backgroundColor: lightGreen[500],
      '&:hover': {
        backgroundColor: lightGreen[700],
      },
      borderRadius: '50px',
    },
  }))(Button);
const KOTButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lime[900]),
      backgroundColor: lime[600],
      '&:hover': {
        backgroundColor: lime[800],
      },
      borderRadius: '50px',
      marginRight: '10px'
    },
    label: {
        textTransform: 'none',
    }
  }))(Button);


class OrderPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }        

    render() {

        const { classes } = this.props;

    return (
        <React.Fragment>
            {/* <Layout> */}
            <Container maxWidth="xl" style={{marginTop: '1rem'}} className={classes.orderContainer}>
                <Grid container lg={12} spacing={0}>
                    {/* <Grid item lg={2}>
                        <Sidebar />
                    </Grid> */}
                    {/* <Grid item lg={1}>
                        <Navigator />
                    </Grid> */}
                    <Grid item lg={1} md={1} xs={2}>
                        <MenuItems />
                    </Grid>
                    <Grid container lg={5} md={5}  sm={11} direction="row" justify="flex-start" alignItems="stretch">
                        <Grid item lg={10} xs={10} sm={10} >
                            <SearchAppBar />
                        </Grid>
                        <Grid item  lg={10} xs={10} sm={10} >
                            <Items /> 
                        </Grid>
                    </Grid>
                    <Grid container item lg={6} md={6} xs={12} sm={12}>
                        <Grid item lg={12} >
                            <Billing />
                        </Grid>
                        <Grid item lg={12}>
                            <CustomerDetails />
                        </Grid>
                        <Grid container item justify="flex-end" spacing={2} className={classes.submitWrap}>
                            <KOTButton 
                                variant="contained"
                                startIcon = {<AssignmentOutlinedIcon />}
                                size="large"
                            >K . O . T</KOTButton>
                            <OrderButton 
                                variant="contained"
                                startIcon = {<InputIcon />}
                                size="large"
                            >O R D E R</OrderButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* </Layout> */}
        </React.Fragment>
    )

    // return(
    //     <>
    //       <SideMenu />  
    //     </>
    // )
}
}

// OrderPage.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
  export default withStyles(styles)(OrderPage);
