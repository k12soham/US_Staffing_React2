import { React, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const GeneratePDF2 = tickets => {

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


  let doc = new jsPDF();









  // doc1.setFontSize(10)


  // define the columns we want and their titles
  const tableColumn = ["Sr No.", "Job Posting ID","Recruiter Name","Candidate Name", "Status", "Date", "Client Rate", "Submit Rate"];
  // define an empty array of rows
  const tableRows = [];
  const sstt = [];
  let index = 1;
  // for each ticket pass all its data into an array

  tickets.map(st => {
    if ( st.status=="Submitted" && (st.candidate == null || st.candidate.deleted == 1)&&(st.recruiter.recruiter_id==rec||rec=="all")) {

    

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

 

      //  tableRows.push(sstt)
      console.log(ticketData)
      tableRows.push(ticketData);
    
      // tableRows.push(sstt)
    }


  });





  // startY is basically margin-top


  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left


  // doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // doc.text(recruiterName + "'s report for Requisition ID: '"+ sessionreq2+"'", 14, 15);



  if(cate=='Current')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s current month submission report", 14, 15);
   // doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Last_Month')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s last month submission report", 14, 15);
    //doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Quarterly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s quarterly submission report", 14, 15);
    //doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Half_yearly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s half yearly submission report", 14, 15);
    //doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Yearly')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s yearly submission report", 14, 15);
    //doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }
  else if(cate=='Customize')
  {
    doc.autoTable(tableColumn, tableRows, { startY: 32  },);
    doc.text(recruiterName+"'s submission report", 14, 15);
  doc.text("From: " +startdate+ " To: "+enddate, 14, 23);
  //doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 30);
  }
  else{
    doc.autoTable(tableColumn, tableRows, { startY: 26  },);
    doc.text(recruiterName+"'s " +cate+ " submission report", 14, 15);
   // doc.text("Requisition ID: '"+ sessionreq2+"'", 14, 23);
  }

  doc.save(`Submission report.pdf`);
};

export default GeneratePDF2;