

import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ResultForm from "./components/ResultForm";
import ResultTableHeader from "./components/ResultTableHeader";
import ResultTable from "./components/ResultTable";
import {FormProvider} from "./components/FormContext";



function App() {

  return (
    <>
    <FormProvider>
          <div className="App">
            <ResultForm/>
            <>
                
                  <div className="text-center">
                    <h1 className="">Results:</h1>
                  </div>
                   <div className="container">
                    <table className="table table-striped table-hover table-sm table-responsive-sm col-lg-10 offset-lg-1">
                      <ResultTableHeader/>
                      <ResultTable/>
                    </table>
                  </div>
            </>      
          </div>
    </FormProvider>
    </>
  );
}

export default App;



