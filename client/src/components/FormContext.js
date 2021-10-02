import React, { useState,createContext } from 'react';

export const FormContext = createContext();

export const FormProvider =(props)=>{

    const minDate = new Date().toISOString().slice(0, 10);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    // const [dataPicker,setDataPicker] = useState("00:00:00");
    const [dataPicker,setDataPicker] = useState(minDate);
    const [errors,setError] = useState([]);
    const [resultsArray, setResultsArray] = useState([]);


    return(
        // <FormContext.Provider value ={[setFirstName,setLastName,setEmail,dataPicker,setDataPicker,setVisibleResultsTable,error]}>
        <FormContext.Provider value ={{firstName,lastName,email,dataPicker,errors,resultsArray,
        setFirstName,setLastName,setEmail,setDataPicker,setError,setResultsArray}}>

           {props.children}
        </FormContext.Provider>

    );


}