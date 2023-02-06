import { React, Component } from "react";
import { useState } from "react";
import exportFromJSON from "export-from-json";
import { format } from "date-fns";

const ExportToExcel = excelData => {  

  // define the columns we want and their titles
  const tableColumn = ["Sr No.", "Requirement", "Submission", "First", "Second", "Closure", "Date", "Employee Name"];
  // define an empty array of rows
  const data = [];
  const fileName = 'download1';
  const exportType = 'xls';
  let ticketData1 = [];

  // for each ticket pass all its data into an array
  excelData.forEach(exc => {
    // console.log(exc);

    // const ticketData = [
    ticketData1 = [
      // <td></td>,
      exc.requirement,
      exc.submission,
      exc.first,
      exc.second,
      exc.closure,
      exc.clo_date,
      exc.employee.emp_name,      

      // called date-fns to format the date on the ticket
      // format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
  
    data.push({requirement: ticketData1[0], submission: ticketData1[1],
    first: ticketData1[2], second: ticketData1[3], closure: ticketData1[4],
    clo_date: ticketData1[5], emp_name: ticketData1[6]});

  });
  // console.log(ticketData1);
  console.log(data);
  // console.log("typeof tableRows : " + typeof (tableRows));
  exportFromJSON({ data, fileName, exportType });

}
export default ExportToExcel; 