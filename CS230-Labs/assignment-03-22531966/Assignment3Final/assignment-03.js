var numOfAssigns = 5;
var numOfAssignsCopy = 0;
var addRowLast = true;
var jsonDataCopy = [];
var jsonDataCopy2 = [];
var headersCopy = [];
var rowSelected = false;
var colSelected = false;
var gradeRepresentation = 'percent'; // Initial representation
var jsonData = [                //initial 5 student's data
    {
        "Name": "Josh Martin",
        "StudentID": 22531966,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    },
    {
        "Name": "Paul Martin",
        "StudentID": 225343436,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    },  
    {
        "Name": "Cailum Grimes",
        "StudentID": 22534344,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Aoife Murphy",
        "StudentID": 24554788,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Hugo Keenan",
        "StudentID": 24554788,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Josh Martin",
        "StudentID": 22531966,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Caoimhe Houlihan",
        "StudentID": 2255322,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Morena Bre",
        "StudentID": 2253547,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Lurcan Farley",
        "StudentID": 22532323,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }, 
    {
        "Name": "Adam Murphy",
        "StudentID": 22535245,
        "Assignment1": null,
        "Assignment2": null,
        "Assignment3": null,
        "Assignment4": null,
        "Assignment5": null,
        "Average":0,
    }
  ];
  
  window.onload = function () {     //onload
    numOfAssignsCopy = 5;                                   //set the saved data equal to that of the original table
    jsonDataCopy = JSON.parse(JSON.stringify(jsonData));        
    headersCopy = Array.from(document.getElementById('headers').children);
    displayRows();                                          //display the table
};  

  function displayRows() {     
    rowSelected=false;                              //initially you haven't highlighted a row
    colSelected = false;
    var unsub = 0;                                  //number of unsubmitted assignments
    for (let i = 0; i < jsonData.length; i++) {     //go through the jsonData
        var student = jsonData[i];                  //current student object
        var row = document.createElement("tr");     //make a new table row

        row.id = 'student' + i;                     //give the row a unique ID

        for (let key in student) {                  //loop through each key in the object
                var cell = document.createElement("td");    //make a cell for the data
                cell.id = 'student' + i + '-' + key;        //give the cell an ID
                // Check conditions for cell content and styling
                if(student[key]==null && key.startsWith('Assignment'))
                {
                    unsub++;                //add 1 to unsubmitted assignments
                    cell.textContent = '-'; //update the contents to be -
                    cell.style.textAlign = 'center';    //centre the contents
                    cell.contentEditable = true;        //make it editable
                    cell.style.backgroundColor = 'yellow';      //make background collor yellow
                    cell.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter') {            //call a function when you hit enter to enter the edited data into the table
                            handleEnterKeyPress(i, key);    
                        }
                    });
                }
                else if((key=='Name' && student[key]=='Enter Name')||(key=='StudentID' && student[key]=='New ID'))     //make it so that any new rows added can have their student name and id edited
                {
                    cell.textContent = student[key];    //content is whatever's in the table
                    cell.contentEditable = true;        //make the content editable
                    cell.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter') {    //call a function when you hit enter to enter the edited data into the table
                            handleEnterKeyPress(i, key);
                        }
                    });
                }
                else if(key.startsWith('Assignment')){  //for non 0 assignments
                    cell.textContent = student[key];    //content is whatever's in the table
                    cell.style.textAlign = 'right';     //content is centred
                    cell.contentEditable = true;        //it's editable
                    cell.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter') {    //call a function when you hit enter to enter the edited data into the table
                            handleEnterKeyPress(i, key);
                        }
                    });
                }
                else if(key=== 'Average')       //for the average cells
                {
                    cell.textContent = student[key];    //content is whatever's in the table
                    cell.style.textAlign = 'right';
                    cell.style.backgroundColor = parseFloat(student[key]) < 60 ? 'red' : 'initial';     //backgroud colour is red or default depending on value of cell
                    cell.style.color = parseFloat(student[key]) < 60 ? 'white' : 'initial';             //text colour is white or default depending on value of cell
                    cell.addEventListener('click', function () {
                            toggleGradeRepresentation();
                    });
                }
                else{                           //else to catch all other posibilities
                    cell.textContent = student[key];    //content is whatever's in the table
                    if (key === 'Name') {                               //highlight row when you click a student's name
                        cell.addEventListener('click', function () {
                            changeBGcolour('student'+i);
                        });
                    }
                }
                row.appendChild(cell);          //add the cell onto the row
        }
        
        document.getElementById("data-output").appendChild(row);        //add the row to the table
    }
    //*
    document.getElementById('unsub').innerHTML= "there are " + unsub + " unsubmitted assignments";      //display how many unsubmitted assigmnets
}

function changeBGcolour(rowId)
{
    var row = document.getElementById(rowId);
    if(!rowSelected){
        for(let i = 0; i<row.cells.length; i++)
        {
            row.cells[i].style.backgroundColor = 'pink';        //change background colour of cells to pink
        }
        rowSelected = true;
    }
    else{             //function to highlight row when you click a student's name
        rowSelected = false;
        updateTable();
    }
}

function calculateAverages(row) {           //method to calculate the average of a row
    var avg = 0;        //variable to hold average
    for (let key in jsonData[row]) {
        if (key.startsWith("Assignment")) {
            avg += parseInt(jsonData[row][key]) || 0;       //if the key is Assignment1,2,3,4...n add it to avg
        }
    }
    jsonData[row]["Average"] = Math.floor(avg / numOfAssigns);      //update average with the new average calculation
}

function handleEnterKeyPress(index, assignmentKey) {
    var cellId = 'student' + index + '-' + assignmentKey;       //variable that holds the ID of the cell
    if(assignmentKey == 'Name' || assignmentKey == 'StudentID') //if the cell is a name of StudentID cell
    {
        var nameValue = document.getElementById(cellId).textContent;    
        jsonData[index][assignmentKey] = nameValue;                     //Update the jsonData with the value of the cell
    }
    else{
        var cellContent = document.getElementById(cellId).textContent.trim();       // Get the new value from the contentEditable cell 
        var newValue = cellContent === '' ? null : parseInt(cellContent);           //if it's empty set it to null else set it to the value      
        if(newValue<0 || newValue>100 || isNaN(newValue))                    
        {
            newValue = null;                               //handle erronous values
        }
        jsonData[index][assignmentKey] = newValue;       // Update the jsonData with the new value
    }
        calculateAverages(index);       // Recalculate averages for the specific row
        updateTable();                  //rebuild the table with the new data
}

function updateTable() {
    clearTable();       //clear existing table   
    displayRows();      // Redraw the table with the updated values

    //*
}

function clearTable() {
    var dataOutput = document.getElementById("data-output");        //reference to the table
    while (dataOutput.firstChild) {                                 //loop through all tables child elements
        dataOutput.removeChild(dataOutput.firstChild);              //remove the first child element      
    }
}


function addRow() {
    var newStudent = {
        "Name": "Enter Name",           //new Student
        "StudentID": "New ID", 
    };

    for (let i = 1; i <= numOfAssigns; i++) {           // Add the new assignment keys to the new student
        var assignmentName = "Assignment" + i;
        newStudent[assignmentName] = null;              //set the vale of all the assignments to empty
    }
    newStudent['Average'] = 0;                          //Set average to 0 initially
    jsonData.push(newStudent);                          //add the new student to the array
    addRowLast = true;                                  
    updateTable();                                      //update the table
}

function addAssignment() {
    numOfAssigns++;                                 // Increment the number of assignments
    var currentAssingNum = numOfAssigns;
    var assignmentName = "Assignment" + currentAssingNum;       //name of new assignment

    if (assignmentName) {
        for (let i = 0; i < jsonData.length; i++) {         // Add the new assignment key to each student in jsonData
            jsonData[i][assignmentName] = null;
        }

        var th = document.createElement("th");              // Create a new table header element
        th.textContent = "Assignment " + currentAssingNum;                    //set header name
        th.id = 'Assign'+currentAssingNum +'Col';


        th.addEventListener('click', function () {
            highlightCol('Assignment' + currentAssingNum);    //add on click function to highlight column
        });


        var headersRow = document.getElementById('headers');        // Append the new table header to the headers row
        var avgHeader = headersRow.lastElementChild;                //reference to the last column
        headersRow.insertBefore(th, avgHeader);                     //insert the new header before

        jsonData.forEach(function(student) {                // Rearrange student objects in jsonData so the new assignment is before the average
            var reorderedStudent = {};
            reorderedStudent["Name"] = student["Name"];
            reorderedStudent["StudentID"] = student["StudentID"];

            for (let key in student) {                                  //rebuild each student object with new assignments before average
                if (key.startsWith("Assignment")) {
                    reorderedStudent[key] = student[key];
                }
            }

            reorderedStudent["Average"] = student["Average"];           
            jsonData[jsonData.indexOf(student)] = reorderedStudent;     //replace the old student data with new one
        });

        for (let i = 0; i < jsonData.length; i++) {
            calculateAverages(i);                               //recalculate the averages
        }

        updateTable();                  // Redraw the table with the updated values
        addRowLast = false;
        console.log(jsonData);
    }
}

function toggleGradeRepresentation() {
    var avgHeaderCell = document.querySelector('#headers th:last-child');               // Get the header cell for the "Average [%]" column

    var avgCells = document.querySelectorAll('#data-output td:last-child');             // Get all the cells in the "Average [%]" column

    switch (gradeRepresentation) {                          // Toggle between representations
        case 'percent':
            gradeRepresentation = 'letter';                     //change grade representation
            avgHeaderCell.textContent = 'Average [Letter]';     //change content of header
            // Update each average cell with letter grades
            avgCells.forEach(function (cell, index) {
                cell.textContent = getLetterGrade(jsonData[index]['Average']);      //change the average display format
            });
            break;
        case 'letter':
            gradeRepresentation = '4.0';
            avgHeaderCell.textContent = 'Average [4.0]';
            // Update each average cell with 4.0 scale grades
            avgCells.forEach(function (cell, index) {
                cell.textContent = getFourPointScale(jsonData[index]['Average']);
            });
            break;
        case '4.0':
            gradeRepresentation = 'percent';
            avgHeaderCell.textContent = 'Average [%]';
            // Update each average cell with percentage grades
            avgCells.forEach(function (cell, index) {
                cell.textContent = jsonData[index]['Average'];
            });
            break;
        default:
            break;
    }
}

// Function to convert percentage to letter grade
function getLetterGrade(percentage) {
    if (percentage >= 93) return 'A';
    else if (percentage >= 90) return 'A-';
    else if (percentage >= 87) return 'B+';
    else if (percentage >= 83) return 'B';
    else if (percentage >= 80) return 'B-';
    else if (percentage >= 77) return 'C+';
    else if (percentage >= 73) return 'C';
    else if (percentage >= 70) return 'C-';
    else if (percentage >= 67) return 'D+';
    else if (percentage >= 63) return 'D';
    else if (percentage >= 60) return 'D-';
    else return 'F';
}

// Function to convert percentage to 4.0 scale
function getFourPointScale(percentage) {
    if (percentage >= 93) return 4.0;
    else if (percentage >= 90) return 3.7;
    else if (percentage >= 87) return 3.3;
    else if (percentage >= 83) return 3.0;
    else if (percentage >= 80) return 2.7;
    else if (percentage >= 77) return 2.3;
    else if (percentage >= 73) return 2.0;
    else if (percentage >= 70) return 1.7;
    else if (percentage >= 67) return 1.3;
    else if (percentage >= 63) return 1.0;
    else if (percentage >= 60) return 0.7;
    else return 0.0;
}

function save()
{
    jsonDataCopy = JSON.parse(JSON.stringify(jsonData));                    //copy jsonData into jsonDataCopy     
    headersCopy = Array.from(document.getElementById('headers').children);      //save the headers to an array
    numOfAssignsCopy = numOfAssigns;                                    //make a copy of the number of assignments at that time
}

function restore() {
    jsonData = JSON.parse(JSON.stringify(jsonDataCopy));            //make jsonData equal to the jsonDataCopy
    numOfAssigns = numOfAssignsCopy;                                //set numOfAssigns equal to that of the backup
    var headersRow = document.getElementById('headers');            //reference to headers
    
    while (headersRow.firstChild) {                                 // Clear existing headers
        headersRow.removeChild(headersRow.firstChild);
    }
    for(let i = 0; i<headersCopy.length; i++)                       // Append the saved headers
    {
        headersRow.appendChild(headersCopy[i]);
    }

    //*
    updateTable();                                //redraw table  
}



function highlightCol(index) {
    if(!colSelected){                       //If column isn't already selected
        for(let i = 0; i<jsonData.length; i++)
        {
            document.getElementById('student'+i+'-'+index).style.backgroundColor = 'pink';
        }
        colSelected = true;                
    }
    else if(colSelected){                           //if you've already selected a column
        colSelected = false;        
        updateTable();      //redraw table
    }
}

function deleteRow()
{
    jsonDataCopy2 = [];
    for(let i = 0; i<jsonData.length; i++)
    {
        if(document.getElementById('student'+i+'-Name').style.backgroundColor == 'pink')
        {

        }
        else{
            jsonDataCopy2.push(jsonData[i]);
        }
    }
    jsonData = JSON.parse(JSON.stringify(jsonDataCopy2)); 
    updateTable();
}

// function deleteCol() {
//     jsonDataCopy2 = []; // Initialize the copy array
//     var headersRow = document.getElementById('headers'); // Get the headers row
//     var headersToRemove = headersRow.querySelectorAll('th');
//     var columnToRemove = 0; // Array to store columns to be removed

//     // Iterate over each row in the original data
//     for (let j = 0; j < jsonData.length; j++) {
//         var newRow = {}; // Create a new row object
//         newRow['Name'] = jsonData[j]['Name'];
//         newRow['StudentID'] = jsonData[j]['StudentID'];

//         // Iterate over each column in the original row
//         for (let i = 0; i < headersToRemove.length; i++) {
//             // Check if the cell is highlighted (pink)
//             if (document.getElementById('student' + j + '-Assignment' + (i)) &&
//                 document.getElementById('student' + j + '-Assignment' + (i)).style.backgroundColor == 'pink') {
//                 columnToRemove=i; // Add the index of the column to be removed
//             } else if (document.getElementById('student' + j + '-Assignment' + (i))) {
//                 // Copy the data if the cell is not highlighted
//                 newRow['Assignment' + (i)] = jsonData[j]['Assignment' + (i)];
//             }
//         }

//         // Copy other properties from the original row
//         newRow['Average'] = jsonData[j]['Average'];

//         // Push the new row into the copy array
//         jsonDataCopy2.push(newRow);
//     }

//     // Remove columns from headers
//     headersRow.removeChild(headersRow.querySelector('#Assign' + columnToRemove + 'Col'));


//     // Assign the modified copy array to jsonData
//     jsonData = JSON.parse(JSON.stringify(jsonDataCopy2));

//     // Update the table
//     updateTable();
// }


