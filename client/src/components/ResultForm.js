
import React, {useState,useContext,useEffect } from 'react';
import { FormContext } from './FormContext';
import axios from "axios";
import {handleError} from "./../Utils";


function ResultForm() {

      const {firstName,lastName,email,dataPicker,errors,resultsArray,
        setFirstName,setLastName,setEmail,setDataPicker,setError,setResultsArray} = useContext(FormContext)
      // const [resultsArray, setResultsArray] = useState([]);
        console.log(dataPicker);

      useEffect(() => {
        fetchEvents();
      }, []);


    const fetchEvents =()=> {
      axios.get(`http://localhost:8000/api/event`)
        .then((response) => {
          console.log(response)
          setResultsArray(response.data);
        })
    }

    const addResult =(e)=>{
      e.preventDefault();
       fetch(`http://localhost:8000/api/event`,{
         method: "post",
         body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email:email,
          date: dataPicker
         }),
           headers: new Headers({
          "Content-Type": "application/json",
        })
       })
       .then((response)=>{
         if(response.status === 201){
          console.log(response);
          setError([])
          fetchEvents();
          return;
         }
         if(response.status === 400){
          console.log(response)
           return response.json().then((res)=>{
            setError(res.validationResult.errors);
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
  <div className="container">
    <form
      style={{ borderRadius: "10px", width:"500px", padding: "0 40px" }}
      className="m-5 border bg-light"
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
      {/* {console.log(errors)} */}
      {/* {error ? (
              <strong className="d-flex justify-content-center">
                <span style={{ color: "red" }}>First name need</span>
              </strong>
            ) : (
              ""
      )} */}
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
      {/* {error ? (
              <strong className="d-flex justify-content-center">
                <span style={{ color: "red" }}>Last name need</span>
              </strong>
            ) : (
              ""
      )} */}
      <div className="form-group">
        <label className="label">
          <b>e-mail:</b>
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
          <b>Data Picker</b>
        </label>
        <input
          style={{ cursor: "pointer" }}
          type="date"
          className="form-control"
          name="preparation_time"
          value={dataPicker}
          id="settime"
          step="1"
          onChange={(e) => setDataPicker(e.target.value)}
        />
      </div>
    
      <div className="d-flex justify-content-center">
        <button className=" btn btn-primary" type="submit">
          Add
        </button>
      </div>
      <br />
    </form>
  </div>
    )
}
export default ResultForm;