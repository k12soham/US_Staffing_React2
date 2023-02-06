import {React, Component} from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";

const ExportToExcel2 = excelData => {  

  // define the columns we want and their titles
  const tableColumn = ["Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date"];
  // define an empty array of rows
  const data = [];
  const fileName = 'download1';
  const exportType = 'xls';
  let ticketData1 = [];
  //  data.push({fileName});

  // for each ticket pass all its data into an array
  excelData.forEach(exc => {

    ticketData1 = [
      exc.requirement,
      exc.submission,
      exc.first,
      exc.second,
      exc.closure,
      exc.clo_date,
      // exc.employee.emp_name,      

      // called date-fns to format the date on the ticket
      // format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
  
    data.push({Requirement: ticketData1[0], Submission: ticketData1[1],
    FirstInterview: ticketData1[2], SecondInterview: ticketData1[3], Closure: ticketData1[4],
    Date: ticketData1[5]});

  });

  console.log(data);
  exportFromJSON({ data, fileName, exportType });

}
export default ExportToExcel2; 