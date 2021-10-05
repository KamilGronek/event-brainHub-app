import React, { useState,createContext } from 'react';

export const FormContext = createContext();

export const FormProvider =(props)=>{

    const minDate = new Date().toISOString().slice(0, 10);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [datePicker,setDatePicker] = useState(minDate);
    const [errors,setErrors] = useState([]);
    const [resultsArray, setResultsArray] = useState([]);


    return(
        <FormContext.Provider value ={{firstName,lastName,email,datePicker,errors,resultsArray,
        setFirstName,setLastName,setEmail,setDatePicker,setErrors,setResultsArray}}>
           {props.children}
        </FormContext.Provider>

    );


}