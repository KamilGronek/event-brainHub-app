import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ResultForm from "./components/ResultForm";
import ResultTableHeader from "./components/ResultTableHeader";
import ResultTable from "./components/ResultTable";
import {FormProvider} from "./components/FormContext";



function App() {
  return (
    <FormProvider>
          <div className="App">
            <ResultForm/>
                   <div className="container">
                      <div className="text-center">
                        <h1 className="">Results:</h1>
                      </div>
                      <table className="table table-striped table-hover table-sm table-responsive-sm">
                        <ResultTableHeader/>
                        <ResultTable/>
                      </table>
                  </div>   
          </div>
    </FormProvider>
  );
}

export default App;



