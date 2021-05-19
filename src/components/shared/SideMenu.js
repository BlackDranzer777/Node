import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Collapse, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, PersonAddOutlined } from '@material-ui/icons';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    sideMenu : {
        display: 'flex',
        flexDirection : 'column',
        position : 'fixed',
        left: '0px',
        height: '100%',
        backgroundColor : '#253053',
    },
    drawerPaper:{
        backgroundColor : '#253053',
        color: 'white',
        width: '250px',
        outlineColor: 'white',
        '& .MuiSvgIcon-root':{
            color: 'white'
        }
    },
    toolbar: theme.mixins.toolbar,

    
}));

export default function SideMenu() {
    const classes = useStyles();
    // const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState(true);


    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };
    
    const handleClick = () => {
        setOpen(!open);
    };

    // const container = window !== undefined ? () => window().document.body : undefined;


    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider classes={{root: classes.divider}} />
          <List>
              <ListItem button component={Link} to={'/order'} style={{color: 'inherit'}}>
                <ListItemIcon><FastfoodIcon /></ListItemIcon>
                <ListItemText primary={'ORDER'}/>
              </ListItem>
          </List>
    
          <Divider classes={{root: classes.divider}} />
    
          <List>
    
              <ListItem button onClick={handleClick} style={{color: 'inherit'}}>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary={'MANAGE'}/>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
    
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} component={Link} to={'/items'}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={'Menu'} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to={'/restaurants'}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={'Restaurant'} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to={'/outlets'}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={'Outlets'} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to={'/employees'}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={'Employees'} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to={'/customers'}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={'Customers'} />
                  </ListItem>
                </List>
              </Collapse>
          </List>
          
          <Divider classes={{root: classes.divider}} />
          <List>
              <ListItem button component={Link} to={'/signup'} style={{color: 'inherit'}}>
                <ListItemIcon><PersonAddOutlinedIcon /></ListItemIcon>
                <ListItemText primary={'SignUp'}/>
              </ListItem>
          </List>
          <Divider classes={{root: classes.divider}} />
          <List>
              <ListItem button component={Link} to={'/login'} style={{color: 'inherit'}}>
                <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                <ListItemText primary={'Login'}/>
              </ListItem>
          </List>
        </div>
      );


    return  (
        <div className={classes.sideMenu}>
            <h6>ascascasc</h6>
            <Drawer
                classes={{paper: classes.drawerPaper,}}
                variant="permanent"
                open
            >
            {drawer}
          </Drawer>
        </div>
    )
}