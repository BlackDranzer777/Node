import { TextField } from '@material-ui/core';
import React from 'react'

export default function Input(props) {

    const {name, label, value, error=null, onChange, ...other} = props;
    return (
        <TextField
                    name={name}
                    variant="outlined"
                    label={label}
                    onChange={onChange}
                    value={value}
                    {...other}
                    {...(error && {error:true, helperText:error})}
                />
    )
}
