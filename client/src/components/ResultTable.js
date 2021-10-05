import React, { useContext } from "react";
import { FormContext } from './FormContext';

function ResultTable(){

    const {resultsArray} = useContext(FormContext);

    return (
        <tbody>
            {resultsArray.map(result =>(
            <tr key={result.id}>
              <td>{result.firstName}</td>
              <td>{result.lastName}</td>
              <td>{result.email}</td>
              <td>{result.date.slice(0,10)}</td> 
            </tr>
            ))}
        </tbody>
    );
}

export default ResultTable;
