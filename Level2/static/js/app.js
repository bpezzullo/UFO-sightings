// from data.js
var tableData = data;
var text, len, i, a
var citykey = [],  cix, cityselected = [];
var statekey = [], stx, stateselected = [];
var countrykey = [], cox;
var shapekey = [], shx, shapeselected = [];
var itemselected = [];

function generateDropDowns(data) {
  var keys = ['city','state','country','shape'];

  for (let datarow of data) {

    let cix = (datarow[keys[0]]);
    a = citykey.indexOf(cix);
    if (a === -1) {
      citykey.push(cix);
    }

    let stx = (datarow[keys[1]]);
    a = statekey.indexOf(stx);
    if (a === -1) {
      statekey.push(stx);
    }

  
    let cox = (datarow[keys[2]]);
    a = countrykey.indexOf(cox);
    if (a === -1) {
      countrykey.push(cox);
    }


    let shx = (datarow[keys[3]]);
    a = shapekey.indexOf(shx);
    if (a === -1) {
      shapekey.push(shx);
    }

  }

  len = citykey.length;

  text = "<option>All</option>";
  for (i = 0; i < len; i++) {
    text += "<option>" + citykey[i] + "</option>";
  }
  
  document.getElementById("cityselect").innerHTML = text;

  len = statekey.length;

  text = "<option>All</option>";
  for (i = 0; i < len; i++) {
    text += "<option>" + statekey[i] + "</option>";
  }
  
  document.getElementById("stateselect").innerHTML = text;

  len = countrykey.length;

  text = "<option>All</option>";
  for (i = 0; i < len; i++) {
    text += "<option>" + countrykey[i] + "</option>";
  }
  
  document.getElementById("countryselect").innerHTML = text;
  
  len = shapekey.length;

  text = "<option>All</option>";
  for (i = 0; i < len; i++) {
    text += "<option>" + shapekey[i] + "</option>";
  }
  
  document.getElementById("shapeselect").innerHTML = text;

}



// Function that builds the table with 3 inputs.  Table structure, the data, and 
// a date.  The data is optional.  If not provided it will be seen as undefined. 
// If the user wants to start fresh than the date will be empty "".  If empty
// or undefined than generate the full table.  If a data is provided than only
// provide those sightings.

  function generateTable(table, data, date, city, state, country, shape) {

// for each element or row in the table than insert the row into the HTML table.
    for (let element of data) {

        // Check whether a date is provided.  If provided only pull those
        // rows to be displayed.

      if (element['datetime'] === date || date == undefined || date == "") {
        if (cityselected.indexOf(element['city']) != -1 || city == undefined || cityselected.indexOf('All') != -1 || cityselected.length === 0)  {
          if (stateselected.indexOf(element['state']) != -1 || state == undefined || stateselected.indexOf('All') != -1 || stateselected.length === 0) {
            if (element['country'] === country || country == undefined || country === 'All') {
              if (shapeselected.indexOf(element['shape']) != -1 || shape == undefined || shapeselected.indexOf('All') != -1 || shapeselected.length === 0) {
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

  function itemsselected(keyname) {
   itemselected = [];
   for (var i=0; i < keyname.options.length; i++){
    if (keyname.options[i].selected==true){
      itemselected.push(keyname.options[i].text);
    }
   }
   return itemselected
  }
  // set table to start after tbody since the header is there already.
  let table = document.querySelector("tbody");


  // generate the table the first time the page is loaded.
  generateTable(table, tableData);

  generateDropDowns(tableData);

  // filter table basd on the input from the terminal.
  function checkinput() {
    var date = document.getElementById("datetime").value;
    var city = document.getElementById("cityselect");
    var state = document.getElementById("stateselect");
    var country = document.getElementById("countryselect").value;
    var shape = document.getElementById("shapeselect");

    var table_size = document.getElementById("ufo-table").rows.length;

    // determine selection
    cityselected = itemsselected(city);
    console.log(cityselected);
    stateselected = itemsselected(state);
    console.log(stateselected);
    shapeselected = itemsselected(shape);
    console.log(shapeselected);
//    itemsselected(city);
    console.log(country);

    // clear the table and then check for the right date range.
    clearTable(table, table_size);
    // If in the right date range provde the results otherwise provde an alert
    // and refresh with a full table.
    if (date >= '1/1/2010' && date <='1/13/2010' || date == "") {
        
        generateTable(table, tableData, date, city, state, country, shape);  
    }
    else {

        alert("Please enter a date between 1/1/2010 and 1/13/2010!");
        generateTable(table, tableData);
    }
}

