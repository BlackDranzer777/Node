import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

export default function DatePicker(props) {

    const {name, label, value, onChange} = props;

    const convertToDefault = (name,value)=>({
        target:{
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="dd/MMM/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefault(name, date))}>
            </KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    )
}
