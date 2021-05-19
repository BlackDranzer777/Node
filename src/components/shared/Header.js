import React, { useState, useEffect } from 'react'
import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar, Typography, withStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import { authenticationService } from '../../_services';
import { history } from '../../_helpers';

const styles = theme => ({
    root : {
        backgroundColor : '#fff',
        transform: 'translateƵ(0)'
    },
    searchInput:{
        opcaity:'0.6',
        padding:'0px 8px',
        fontSize:'0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px'
        }
    },
    username:{
        color: 'rgb(0,0,0,0.7)',
        paddingRight: 9
    } 
});


class Header extends React.Component {

    logout = () => {
        authenticationService.logout();
        history.push('/login');
    }

    render(){

        const currentUser = authenticationService.currentUserValue;

        // const {currentUser} = this.state;
        const {classes} = this.props;

        console.log(currentUser, 'header');

        return (
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item>
                            <InputBase 
                                placeholder="Search topics"
                                className={classes.searchInput}
                                startAdornment={<SearchIcon fontSize="small" />} 
                            />
                        </Grid>
                        <Grid item sm></Grid>
                            <Grid item>
                                {/* <Badge badgeContent={4} color="secondary">
                                    <NotificationsNoneIcon fontSize="small" />
                                </Badge>    */}
                                <Typography variant="h6" className={classes.username}>
                                    {currentUser.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.logout}>
                                    <Badge color="secondary">
                                        <PowerSettingsNewIcon fontSize="small" />
                                    </Badge>   
                                </IconButton>
                            </Grid>
                        </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header)