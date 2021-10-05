
import React, {useContext,useEffect } from 'react';
import { FormContext } from './FormContext';
import {handleError} from "./../Utils";


function ResultForm() {

      const {firstName,lastName,email,datePicker,errors,
        setFirstName,setLastName,setEmail,setDatePicker,setErrors,setResultsArray} = useContext(FormContext)

      const url = `http://localhost:8000/api/event`

      useEffect(() => {
        fetchEvents();
      }, []);


    const fetchEvents =()=> {
      fetch(`${url}`)
       .then(response => {
         return response.json();
       })
        .then((data) => {
          setResultsArray(data);
        })
        .catch((error) => {
          console.log(error)
        });
    }

    const addResult =(e)=> {
      e.preventDefault();
       fetch(`${url}`,{
         method: "post",
         body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email:email,
          date: datePicker
         }),
           headers: new Headers({
          "Content-Type": "application/json",
        })
       })
       .then((response)=>{
         if(response.status === 201){
          console.log(response);
          setErrors([])
          fetchEvents();
          return;
         }
         if(response.status === 400){
          console.log(response)
           return response.json().then((res)=>{
            setErrors(res.validationResult.errors);
            console.log(res.validationResult.errors)
           })
         }       
       })
       .catch((error) => {
         console.log(error)
       });
    }

  const handleErrorForField = (field)=>{
    return handleError(errors, field);
 }

return(
  <div className="container d-flex justify-content-center align-items-center">
    <form
      className="m-5 border bg-light form"
      onSubmit={addResult}
    >
      <h4 className="p-3 d-flex justify-content-center">BrainHub App</h4>
      <div className="form-group">
        <label className="label">
          <b>First name:</b>
        </label>
        <input
          className="form-control"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      {handleErrorForField("firstName")}
      <div className="form-group">
        <label className="label">
          <b>Last name:</b>
        </label>
        <input
          className="form-control"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      {handleErrorForField("lastName")}
      <div className="form-group">
        <label className="label">
          <b>E-mail:</b>
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {handleErrorForField("email")}
      <div className="form-group">
        <label className="label">
          <b>Date Picker:</b>
        </label>
        <input
          style={{ cursor: "pointer" }}
          type="date"
          className="form-control"
          name="preparation_time"
          value={datePicker}
          id="settime"
          step="1"
          onChange={(e) => setDatePicker(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center button">
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  </div>
    )
}
export default ResultForm;