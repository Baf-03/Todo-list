const saveBtn = document.getElementById('save');
const table = document.getElementById("myTable");
const searchArea = document.getElementById('enter_search');

let count = 1;
let tableData = [];

setInterval(function() {
  document.getElementById("changingText").style.color =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
}, 500);

// Load data from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem("tabledata");
  if (storedData) {
    tableData = JSON.parse(storedData);
    count = tableData.length + 1;
    renderTable();
  }
});

// Function to handle form submission
function submit() {
  const value = searchArea.value.trim();
  if (value !== '') {
    const rowData = {
      index: count,
      value: value,
      status: "Not Completed"
    };
    tableData.push(rowData);
    count++;
    renderTable();
    localStorage.setItem("tabledata", JSON.stringify(tableData));
    searchArea.value = '';
  }
}


saveBtn.addEventListener("click", submit);

//------------------------------delete row---------------------------------------------
function deleteRow(event) {
  const row = event.target.closest("tr");
  const rowIndex = row.rowIndex;
  tableData.splice(rowIndex - 1, 1);
  count--;
  renderTable();
  localStorage.setItem("tabledata", JSON.stringify(tableData));
}

//------------------------------mark a row as completed---------------------------------------------


function complete(event) {
  const row = event.target.closest("tr");
  const rowIndex = row.rowIndex;
  event.target.style.background = "gray";
  tableData[rowIndex - 1].status = "Completed";
  renderTable();
  localStorage.setItem("tabledata", JSON.stringify(tableData));
}



//-----------------------------render the table---------------------------------------------

function renderTable() {
  table.innerHTML = `<thead>
                        <tr>
                          <th>#</th>
                          <th>Task</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>`;

  const tbody = document.createElement('tbody');

  tableData.forEach((rowData) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${rowData.index}</td>
                     <td>${rowData.value}</td>
                     <td>${rowData.status}</td>
                     <td>
                       <button class="complete_class">Complete</button>
                       <button class="delete_button">Delete</button>
                     </td>`;

    row.querySelector('.delete_button').addEventListener('click', deleteRow);
    row.querySelector('.complete_class').addEventListener('click', complete);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}
function clearSearch(){
  searchArea.value="";
}


renderTable();




