// from data.js
var tableData = data;


// Function that builds the table with 3 inputs.  Table structure, the data, and 
// a date.  The data is optional.  If not provided it will be seen as undefined. 
// If the user wants to start fresh than the date will be empty "".  If empty
// or undefined than generate the full table.  If a data is provided than only
// provide those sightings.

  function generateTable(table, data, date) {

// for each element or row in the table than insert the row into the HTML table.
    for (let element of data) {

        // Check whether a date is provided.  If provided only pull those
        // rows to be displayed.
        //        console.log(element['datetime'],date);
      if (element['datetime'] === date || date == undefined || date == "") {

        //        console.log(element);
        // Insert the row and than append each cell.
        let row = table.insertRow();
        for (key in element) {
        
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
      }
    }
  }
// Clear out the table from the previous filter
   function clearTable(table,table_size) {

    for (var i=0; i < table_size - 1; i++) {
        table.deleteRow(0);
        
    }
   }

  // set table to start after tbody since the header is there already.
  let table = document.querySelector("tbody");

  // generate the table the first time the page is loaded.
  generateTable(table, tableData);

  // filter table basd on the input from the terminal.
  function checkinput() {
    var date = document.getElementById("datetime").value;
    var table_size = document.getElementById("ufo-table").rows.length;
//    console.log(table_size);
    // clear the table and then check for the right date range.
    clearTable(table, table_size);

    // If in the right date range provde the results otherwise provde an alert
    // and refresh with a full table.
    if (date >= '1/1/2010' && date <='1/13/2010') {
        
        generateTable(table, tableData, date);  
    }
    else {

        alert("Please enter a date between 1/1/2010 and 1/13/2010!");
        generateTable(table, tableData);
    }
}
