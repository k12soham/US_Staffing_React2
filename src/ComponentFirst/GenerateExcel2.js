import { React, useState, useEffect } from "react";

import exportFromJSON from "export-from-json";
import { format } from "date-fns";
import { downloadExcel } from "react-export-table-to-excel";
import { read, utils, writeFile } from 'xlsx';
// Date Fns is used to format the dates we receive
// from our API call


// define a generatePDF function that accepts a tickets argument
const GenerateExcel2 = tickets => {

console.log(tickets)

  let recruiterName = localStorage.getItem("recruiterName");
  let empID = localStorage.getItem("recruiterID")
  let sessionreq = localStorage.getItem("requisitionID")
  let  sessionreq2= localStorage.getItem("reqID");
  let a = new Date();
  let currentdate = format(a, "dd-MMM-yyyy");
  let cate = localStorage.getItem("cate");
  let startdate = localStorage.getItem("startdate");
  let enddate = localStorage.getItem("enddate");
  let rec= localStorage.getItem("rec");



  // define the columns we want and their titles
  const tableColumn =[ ["Sr No.","Job Posting ID","Recruiter Name", "Candidate Name", "Status", "Date", "Client Rate", "Submit Rate"]];
  // define an empty array of rows
  const tableRows = [];
  const sstt = [];
  let index = 1;
  // for each ticket pass all its data into an array
  tickets.map(st => {
    if ( st.status=="Submitted"&& (st.candidate == null || st.candidate.deleted == 1)&&(st.recruiter.recruiter_id==rec||rec=="all")) {

    

      const ticketData = [

        index++,
        st.requisition.id,

        st.recruiter.recruiter_id == null ?
        (
          console.log("null")
        ) :
        (
          st.recruiter.recruiter_name

        ),

        st.candidate.candidate_id == null ?
          (
            console.log("null")
          ) :
          (
            st.candidate.candidate_name

          ),

   

      st.status,
        
       
  
            st.status_date,

  
  


        st.candidate.candidate_id == null ?
          (
            console.log("null")
          ) :
          (
            st.requisition.client_rate

          ),




        st.candidate.candidate_id == null ?
          (
            console.log("null")
          ) :
          (
            st.candidate.submitted_rate

          )



      ];

 

      tableRows.push(ticketData);
    

    }


  });



let title,title2;


  if(cate=='Current')
  {
    
    title=[[recruiterName+"'s current month submission report"]]
    
  }
  else if(cate=='Last_Month')
  {
    
    title=[[recruiterName+"'s last month submission report"]]

  }
  else if(cate=='Quarterly')
  {
 
    title=[[recruiterName+"'s quarterly submission report"]]
   
  }
  else if(cate=='Half_yearly')
  {
  
    title=[[recruiterName+"'s half yearly submission report"]]

  }
  else if(cate=='Yearly')
  {
  
    title =[[recruiterName+"'s yearly submission report"]]

  }
  else if(cate=='Customize')
  {

    title=[[recruiterName+"'s submission report From: " +startdate+ " To: "+enddate]]

  }
  else
  {
    
     title=[[recruiterName+"'s " +cate+ " submission report"]]
    
   
  }


  const wb = utils.book_new();
  const ws = utils.json_to_sheet([]);
  utils.sheet_add_aoa(ws, title, { origin: 'E4', skipHeader: true});      
  utils.sheet_add_aoa(ws, tableColumn, { origin: 'D7'});
  utils.sheet_add_json(ws, tableRows, { origin: 'D8', skipHeader: true });
  utils.book_append_sheet(wb, ws, 'Report');
  writeFile(wb, 'Submission report.xlsx');


};

export default GenerateExcel2;