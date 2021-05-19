import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Controls from '../controls/Controls'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding: theme.spacing(2),
        postition:'absolute',
        bottom: theme.spacing(15),
        left: theme.spacing(15),
        zoom: '80%'
    },
    dialogTitle : {
        paddingRight:0
    }
}))

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
