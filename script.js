// Sample visitor data
var visitors = [
    { id: 1, firstName: "Stepan", lastName: "Klimchenko", timeOfCreation: "6/15/2023, 2:48:00 PM" },
    { id: 2, firstName: "Maria", lastName: "Mardalena", timeOfCreation: "6/15/2023, 8:31:00 PM" },
    { id: 3, firstName: "Nikolay", lastName: "Sechkin", timeOfCreation: "6/15/2023, 5:39:00 PM" }
  ];
  
  // Visitors table
  function renderVisitorsTable() {
    var tableBody = document.getElementById("visitorTableBody");
    tableBody.innerHTML = "";
  
    for (var i = 0; i < visitors.length; i++) {
      var visitor = visitors[i];
  
      var row = document.createElement("tr");
      row.setAttribute("data-id", visitor.id);
  
      var firstNameCell = document.createElement("td");
      firstNameCell.textContent = visitor.firstName;
      row.appendChild(firstNameCell);
  
      var lastNameCell = document.createElement("td");
      lastNameCell.textContent = visitor.lastName;
      row.appendChild(lastNameCell);
  
      var timeOfCreationCell = document.createElement("td");
      timeOfCreationCell.textContent = visitor.timeOfCreation;
      row.appendChild(timeOfCreationCell);
  
      var actionsCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("class", "btn btn-sm btn-danger");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        deleteVisitor(this);
      });
      actionsCell.appendChild(deleteButton);
  
      var editButton = document.createElement("button");
      editButton.setAttribute("type", "button");
      editButton.setAttribute("class", "btn btn-sm btn-primary");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function() {
        editVisitor(this);
      });
      actionsCell.appendChild(editButton);
  
      row.appendChild(actionsCell);
      tableBody.appendChild(row);
    }
  }
  
  // Add a new visitor
  function addVisitor() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var timeOfCreation = new Date().toLocaleString();
  
    var newVisitor = {
      id: visitors.length + 1,
      firstName: firstName,
      lastName: lastName,
      timeOfCreation: timeOfCreation
    };
  
    visitors.push(newVisitor);
    renderVisitorsTable();
    $('#addVisitorModal').modal('hide');
  }
  
  // Delete a visitor
  function deleteVisitor(element) {
    var visitorId = parseInt(element.closest("tr").getAttribute("data-id"));

    $('#deleteVisitorModal').modal('show');

    visitors = visitors.filter(function(visitor) {
      return visitor.id !== visitorId;
    });
    
    renderVisitorsTable();
    $('#deleteVisitorModal').modal('hide');
  }
  
  // Edit a visitor
  function editVisitor(element) {
    var visitorId = parseInt(element.closest("tr").getAttribute("data-id"));
    
    var visitor = visitors.find(function(visitor) {
      return visitor.id === visitorId;
    });
    
    document.getElementById("editFirstName").value = visitor.firstName;
    document.getElementById("editLastName").value = visitor.lastName;
    
    document.getElementById("editVisitorForm").setAttribute("data-id", visitor.id);
    $('#editVisitorModal').modal('show');
  }
  
  // Save changes
  function saveChanges() {
    var visitorId = parseInt(document.getElementById("editVisitorForm").getAttribute("data-id"));
    
    var visitor = visitors.find(function(visitor) {
      return visitor.id === visitorId;
    });
    
    visitor.firstName = document.getElementById("editFirstName").value;
    visitor.lastName = document.getElementById("editLastName").value;
    
    renderVisitorsTable();
    $('#editVisitorModal').modal('hide');
  }
  
  // Sort the table based on a column
  function sortTable(columnIndex) {
    var header = document.getElementsByClassName("sortable-header")[columnIndex];
    var isAscending = true;
  
    if (header.classList.contains("sorted-asc")) {
      header.classList.remove("sorted-asc");
      header.classList.add("sorted-desc");
      isAscending = false;
    } else {
      header.classList.remove("sorted-desc");
      header.classList.add("sorted-asc");
    }
  
    var dataType = header.getAttribute("data-type");
    var sortedVisitors = visitors.sort(function(a, b) {
      var valueA, valueB;
  
      if (dataType === "string") {
        valueA = a[header.textContent].toUpperCase();
        valueB = b[header.textContent].toUpperCase();
      } else {
        valueA = new Date(a[header.textContent]);
        valueB = new Date(b[header.textContent]);
      }
  
      if (valueA < valueB) {
        return isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return isAscending ? 1 : -1;
      }
  
      return 0;
    });
  
    visitors = sortedVisitors;
    renderVisitorsTable();
  }
  
  // Event listener for adding a visitor
  document.getElementById("addVisitorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addVisitor();
  });
  
  // Event listener for saving changes in the edit visitor modal
  document.getElementById("editVisitorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    saveChanges();
  });
  
  // render of the visitors table
  renderVisitorsTable();
  