import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';

import * as actionTypes from  '../../store/actions'
import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: #fdfcfa',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


function MenuItems({ setCategoryValue }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          MENU
        </ListSubheader>
      }
      className={classes.root}
    >       <Divider />

      <ListItem button onClick={() => setCategoryValue("")}>
        {/* <ListItemIcon>
          <SendIcon />
        </ListItemIcon> */}
        <ListItemText primary="All" />
      </ListItem>
      <ListItem button onClick={() => setCategoryValue("pizza")}>
        {/* <ListItemIcon>
          <SendIcon />
        </ListItemIcon> */}
        <ListItemText primary="Pizza" />
      </ListItem>
      <ListItem button onClick={() => setCategoryValue("pasta")}>
        {/* <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon> */}
        <ListItemText primary="Pasta" />
      </ListItem>
      <ListItem button onClick={() => setCategoryValue("sabzi")}>
        {/* <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon> */}
        <ListItemText primary="Sabzi" />
      </ListItem>
      <ListItem button onClick={() => setCategoryValue("burger")}>
        {/* <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon> */}
        <ListItemText primary="Burger" />
      </ListItem>
      
      {/* <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse> */}
    </List>
  );
}




const mapDispatchToProps = dispatch => {
  return {
      setCategoryValue: (categoryValue) => dispatch({type: actionTypes.SETCATEGORY, payload: categoryValue }), 
  }
}
export default connect(null, mapDispatchToProps)(MenuItems);