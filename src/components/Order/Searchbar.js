import React from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import * as actionTypes from  '../../store/actions'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 10,
      background:'#fdfcfa',
      color: '#6e695e',
    },
    search: {
      position: 'relative',
      borderRadius: '20px',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      border: '1px solid #6e695e',

    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6e695e'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  // onChange = (e) => console.log({ [e.target.name]: e.target.value });
  function handleChange(e, setSearchValue) {setSearchValue(e.target.value)};


function SearchAppBar({setSearchValue}) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon align='left'/>
              </div>
              <InputBase
                align='left'
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleChange(e, setSearchValue)}
              />
            </div>          
      </div>
    );
  }

  // const mapStateToProps = state => {
  //   return {
  //     billingItems: state.BIR.billingItems
  //   }
  // }
  const mapDispatchToProps = dispatch => {
    return {
        setSearchValue: (searchValue) => dispatch({type: actionTypes.SETSEARCH, payload: searchValue }), 
    }
  }
  export default connect(null, mapDispatchToProps)(SearchAppBar);