// jshint esversion: 6
// jshint maxerr: 1000

"use strict";  // JavaScript code is executed in "strict mode"

/**
* @desc final project, Geosoftware1, SoSe2019
* @author name: Katharina Poppinga, matr.: 450 146; name: Paula Scharf, matr.: 450 334
*/

// please put in your own tokens at 'token.js'




/**
* Creates new table row with seven new table cells and appends the row and these cells to given table.
* In addition, this function writes the first given value into the first cell and second given value into the second cell.
* The third, fourth, fifth, sixth and seventh cells are getting IDs for writing in the weather and places-information in subsequently called functions.
*
* @private
* @author Katharina Poppinga
* @param insertFirst - first value, to write in first new created cell
* @param insertSecond - second value, to write in second new created cell
* @param {string} tableName - table to which the new created row and new created cells are appended
*/
function createAndWriteTableWithSevenCells(insertFirst, insertSecond, tableName){

  // counter for the table cell IDs
  z = z + 1;

  // create new table row and seven new table cells and write corresponding values into them
  var row = document.createElement("tr");
  var firstValue = document.createElement("td");
  firstValue.innerHTML = insertFirst;
  var secondValue = document.createElement("td");
  secondValue.innerHTML = insertSecond;
  var thirdValue = document.createElement("td");
  thirdValue.id = "weatherText"+z;
  var fourthValue = document.createElement("td");
  fourthValue.id = "weatherSymbol"+z;
  var fifthValue = document.createElement("td");
  fifthValue.id = "placeName"+z;
  var sixthValue = document.createElement("td");
  sixthValue.id = "placeDistance"+z;
  var seventhValue = document.createElement("td");
  seventhValue.id = "correspondingRoutePoint"+z;

  // append new row and seven new cells to given table
  document.getElementById(tableName).appendChild(row);
  row.appendChild(firstValue);
  row.appendChild(secondValue);
  row.appendChild(thirdValue);
  row.appendChild(fourthValue);
  row.appendChild(fifthValue);
  row.appendChild(sixthValue);
  row.appendChild(seventhValue);
}




/**
* Creating new table row with two new table cells, writing the two given values into these cells and append the row and these cells to given table.
*
* @author Katharina Poppinga
* @param insertFirst - first value, to write in first new created cell
* @param insertSecond - second value, to write in second new created cell
* @param {string} tableName - table to which the new created row and new created cells are appended
*/
function createAndWriteTableWithTwoCells(insertFirst, insertSecond, tableName){

  // create new table row and two new table cells and write corresponding values into them
  var row = document.createElement("tr");
  var firstValue = document.createElement("td");
  firstValue.innerHTML = insertFirst;
  var secondValue = document.createElement("td");
  secondValue.innerHTML = insertSecond;

  // append new row and two new cells to given table
  document.getElementById(tableName).appendChild(row);
  row.appendChild(firstValue);
  row.appendChild(secondValue);
}







/**
* Removes all children of a given HTMLelement (DOM node).
*
* @author Katharina Poppinga
* @param {string} elementId - ID of the element whose children will be removed
*/
function deleteAllChildrenOfElement(elementId){
  // pick the element belonging to given Id
  let element = document.getElementById(elementId);

  // while-loop, while the element has any children (includes also only one child) left, remove the first child of its children
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
