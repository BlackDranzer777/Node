import React from 'react'
import PropTypes from 'prop-types';
import { Container, Grid, withStyles} from '@material-ui/core'
import Items from '../components/Order/Items'
import Billing from '../components/Order/Billing'
import SearchAppBar from '../components/Order/Searchbar';
import MenuItems from '../components/Order/MenuItems';
import Sidebar from '../components/shared/Sidebar';
import Navigator from '../components/archive/Navigator';
import Layout from '../components/Layout/Layout';


const styles = theme => ({
        orderContainer : {
            background: '#fdfcfa',
            // background: 'rgb(145,145,145)',
            // background: 'linear-gradient(90deg, rgba(145,145,145,1) 0%, rgba(255,239,217,1) 100%)',
            width: '100%',
            height: '100vh',
        }
});


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
                    <Grid item lg={2}>
                        <Sidebar />
                    </Grid>
                    {/* <Grid item lg={1}>
                        <Navigator />
                    </Grid> */}
                    <Grid item lg={1} md={1} xs={2}>
                        <MenuItems />
                    </Grid>
                    <Grid container lg={4} md={4}  sm={11} direction="column" justify="flex-start" alignItems="stretch">
                        <Grid item lg={10} xs={10} sm={10} order={1}>
                            <SearchAppBar />
                        </Grid>
                        <Grid item style={{marginTop: '1rem'}} order={2}>
                            <Items /> 
                        </Grid>
                    </Grid>
                    <Grid item lg={5} md={5} xs={12} sm={12}>
                        <Billing />
                    </Grid>
                </Grid>
            </Container>
            {/* </Layout> */}
        </React.Fragment>
    )
}
}

OrderPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OrderPage);
