import { React, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDF1 = tickets => {


  let recruiterName = localStorage.getItem("recruiterName");
  let empID = localStorage.getItem("recruiterID")
  let sessionreq = localStorage.getItem("requisitionID")
  let  sessionreq2= localStorage.getItem("reqID");
  let a = new Date();
  let currentdate = format(a, "dd-MMM-yyyy");
  let cate = localStorage.getItem("cate");
  let startdate = localStorage.getItem("startdate");
  let enddate = localStorage.getItem("enddate");


  let doc = new jsPDF();


  // define the columns we want and their titles
  const tableColumn = ["Sr No.", "Candidate Name", "Status", "Date", "Client Rate", "Submit Rate"];
  // define an empty array of rows
  const tableRows = [];

  let index = 1;
  // for each ticket pass all its data into an array
  tickets.map(st => {
    if (st.recruiter.recruiter_id == empID && st.status=="Submitted" &&(st.candidate == null || st.candidate.deleted == 1)) {

    

      const ticketData = [

        index++,

        st.candidate.candidate_id == null ?
          (
            console.log("null")
          ) :
          (
            st.candidate.candidate_name

          ),

        

      // st.statustbl.map(sr => 
      //  sr.status
     
      //    ),

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



  const date = Date().split(" ");





  if(cate=='Current')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s current month submission report", 14, 15);

  }
  else if(cate=='Last_Month')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s last month submission report", 14, 15);
   
  }
  else if(cate=='Quarterly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s quarterly submission report", 14, 15);

  }
  else if(cate=='Half_yearly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s half yearly submission report", 14, 15);
    doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Yearly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
   
  }
  else if(cate=='Customize')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 32  },);
    doc.text(recruiterName+"'s submission report", 14, 15);
  doc.text("From: " +startdate+ " To: "+enddate, 14, 23);

  }
  else{
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s " +cate+ " submission report", 14, 15);

  }





  // we define the name of our PDF file.
  doc.save(`Submission report.pdf`);
};

export default GeneratePDF1;