const { promises:fs } = require("fs");
const path = require("path");
let pathName = path.join(__dirname, "Files");

clock();
//read();

function clock() {
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  var time = h + ":" + m + ":" + s;
  document.getElementById("time").innerHTML = time;
  console.log(time);
  setTimeout(clock, 1000);
}
/*
function read() {
  for
}*/

document.getElementById("batal").addEventListener("click", back);
document.getElementById("icon_button").addEventListener("click", back);
document.getElementById("icon_button1").addEventListener("click", open_modal);
document.getElementById("form_submit").addEventListener("submit", onFormSubmit);
document.getElementById("header").style.background = "#7b4397";
document.getElementById("submit").addEventListener("click", open_modal);
document.getElementById("firststart").addEventListener("click", open_modal);
document.getElementById("addData").addEventListener("click", open_crud);

document.getElementById("CommandON").addEventListener("click", function () {
  command("ON");
});
document.getElementById("CommandOFF").addEventListener("click", function () {
  command("OFF");
});

function open_modal(event) {
  location.href = "#open-modal";
}

function open_crud(event) {
  location.href = "#open-crud";
}

function back(event) {
  location.href = "#";
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// var selectedRow = null;
CommadnON = false;
CommadnOFF = false;

var file = 0;

function onFormSubmit(event) {
  event.preventDefault();
  if (validate(event)) {
    file++;
    var formData = readFormData(event);
    createFile(formData, file);
    insertNewRecord(formData);
    resetForm();
  } else {
  }
}

function createFile(data, filenumber) {
  let file = path.join(pathName, `${filenumber}.json`);
  var command;
  switch (data.Command) {
    case "ON":
      {
        command = 1;
      }
      break;
    case "OFF":
      {
        command = 0;
      }
      break;
    default:
      command = null;
  }

  let contents =
    '{"time":"' +
    data.Times +
    '","runtime":' +
    data.Runtimes +
    ',"sector":' +
    data.Sector +
    ',"command":' +
    command +
    "}";
  fs.writeFile(file, contents, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file number " + filenumber + " was saved!");
  });
}

function command(state) {
  switch (state) {
    case "OFF":
      {
        CommadnON = false;
        CommadnOFF = true;
      }
      break;
    case "ON":
      {
        CommadnON = true;
        CommadnOFF = false;
      }
      break;
    default:
      CommadnON = false;
      CommadnOFF = false;
  }
}

function readFormData(event) {
  var formData = {};
  formData["Times"] = document.getElementById("Times").value;
  formData["Runtimes"] = document.getElementById("Runtimes").value;
  formData["Sector"] = document.getElementById("Sector").value;

  if (CommadnON == true && CommadnOFF == false) {
    formData["Command"] = "ON";
  } else if (CommadnON == false && CommadnOFF == true) {
    formData["Command"] = "OFF";
  } else if (CommadnON == false && CommadnOFF == false) {
    formData["Command"] = null;
  }
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  var row =
    document.getElementById("employeeList").getElementsByTagName("tr").length -1;
  cell0 = newRow.insertCell(0);
  cell0.innerHTML = null;
  cell1 = newRow.insertCell(1);
  cell1.innerHTML = data.Times;
  cell2 = newRow.insertCell(2);
  cell2.innerHTML = runtimes(data.Runtimes);
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.Sector;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = data.Command;

  console.log("Row Number " + row);
  console.log("time '" + data.Times + "'");
}

function runtimes(Runtimes) {
  if (Runtimes === "") {
    return "∞";
  } else {
    return Runtimes + " Minute";
  }
} //data.Runtimes + " Minute";

function resetForm() {
  document.getElementById("Times").value = "";
  document.getElementById("Runtimes").value = "";
  document.getElementById("Sector").value = "";
  CommadnON = false;
  CommadnOFF = false;
  selectedRow = null;
}
/*
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("Times").value = selectedRow.cells[0].innerHTML;
  document.getElementById("Runtimes").value = selectedRow.cells[1].innerHTML;
  document.getElementById("Sector").value = selectedRow.cells[2].innerHTML;
  document.getElementById("Command").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.Times;
  selectedRow.cells[1].innerHTML = formData.Runtimes;
  selectedRow.cells[2].innerHTML = formData.Sector;
  selectedRow.cells[3].innerHTML = formData.Command;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}
*/

function validate(event) {
  if (document.getElementById("Times").value === "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
