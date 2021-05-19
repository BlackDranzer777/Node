import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../controls/Controls';
import { authenticationService } from '../../_services';


const initialFValues = {
    outlet_id: 0,
    outlet_name: '',
    outlet_location: '',
}

export default function OutletForm(props) {
    const {addOrEdit, recordForEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('outlet_name' in fieldValues)
            temp.outlet_name = fieldValues.outlet_name ? "" : "This field is required.";
        if('outlet_location' in fieldValues)
            temp.outlet_location = fieldValues.outlet_location ? "" : "This field is required.";
        setErrors({
            ...temp
        })

        if(fieldValues == values)
            return Object.values(temp).every(x => x == "");
    }

    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()){
            addOrEdit(values, resetForm);
        }
    } 
    
    useEffect(()=>{
        if(recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    

    return (
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    name="outlet_name"
                    label="Outlet Name"
                    value={values.outlet_name}
                    error={errors.outlet_name}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Controls.Input
                    name="outlet_location"
                    label="Outlet Location"
                    value={values.outlet_location}
                    error={errors.outlet_location}
                    onChange={handleInputChange}
                />
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                    />
                </div>
            </Grid>
        </Grid>
        </Form>
    )
}


