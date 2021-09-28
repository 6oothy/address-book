window.onload = function() {
  this.clearAddInput();
  this.clearSearchInput();
  this.clearDeleteInput();
  this.clearTable();
};

//    Input fields

const firstName = $("#add-firstName-input");
const lastName = $("#add-lastName-input");
const phone = $("#add-phone-input");
const address = $("#add-address-input");
const searchInputField = $("#search-box-input");
const deleteInputField = $("#delete-contact-id");

//    Prexisting contacts

function Contact(firstName, lastName, phone, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${this.firstName} ${this.lastName}`;
  this.phone = phone;
  this.address = address;
}

// class Contact {
//   constructor(firstName, lastName, phone, address) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.fullName = `${this.firstName} ${this.lastName}`;
//     this.phone = phone;
//     this.address = address;
//   }
// }

let Chris = new Contact(
  "Chris",
  "Booth",
  "123456789",
  "Calle Vallencia 27, 3-1, Barcelona"
);

let Eve = new Contact(
  "Eve",
  "Richards",
  "987654321",
  "Carrer d'en Bot, 3-2, Barcelona"
);

let John = new Contact(
  "John",
  "Smith",
  "555414830",
  "48 Heath Road, London, UK"
);

let Adam = new Contact(
  "Adam",
  "Jones",
  "555414830",
  "647 Eastern Avenue, Manchester, UK"
);

let Paul = new Contact(
  "Paul",
  "Evans",
  "765894557",
  "1234 Wenderly Way, Chicago, IL"
);

let contacts = [Chris, Eve, John, Adam, Paul];
let deletedContacts = [];

//    Input field clearing functions

function clearAddInput() {
  $(".add-firstName").val("");
  $(".add-lastName").val("");
  $(".add-phone").val("");
  $(".add-address").val("");
}

function clearSearchInput() {
  $(".search-input").val("");
}

function clearDeleteInput() {
  $(".delete-input").val("");
}

function clearTable() {
  $("table").empty();
}

//    Display error and success messages

function displayMessage(location, message) {
  $(location)
    .text(message)
    .css("display", "block")
    .delay(5000)
    .fadeOut();
}

//    Main buttons functionality

function buttonToggle(location) {
  let x = $(location);
  if (x.css("display") === "block") {
    x.css("display", "none");
  } else {
    x.css("display", "block");
  }
}

$("#add-contact-button").on("click", function() {
  clearAddInput();
  buttonToggle("#add-contact-input");
});

$("#search-contact-button").on("click", function() {
  clearSearchInput();
  clearTable();
  buttonToggle("#search-contact-input");
});

$("#delete-contact-button").on("click", function() {
  clearDeleteInput();
  buttonToggle("#delete-contact-input");
});

//    Secondary buttons functionality
//    Submission buttons

$("#add-contact-submission").on("click", function() {
  addContact();
});

$("#search-contact-submission").on("click", function() {
  searchContact();
});

$("#delete-contact-submission").on("click", function() {
  deleteContact();
});

//    Search button

$("#search-contact-viewall").on("click", function() {
  viewAllContacts();
});

//    Cancel buttons

$("#add-contact-cancel").on("click", function() {
  clearAddInput();
});

$("#search-contact-cancel").on("click", function() {
  clearTable();
  clearSearchInput();
});

$("#delete-contact-cancel").on("click", function() {
  clearDeleteInput();
});

//    Add contact functionality

function addContact() {
  if (
    firstName.val() !== "" &&
    lastName.val() !== "" &&
    phone.val() !== "" &&
    address.val() !== ""
  ) {
    let newContact = new Contact(
      firstName.val(),
      lastName.val(),
      phone.val(),
      address.val()
    );
    contacts.push(newContact);
    displayMessage(
      "#add-contact-success-error-message",
      "Contact successfully added"
    );
    clearAddInput();
  } else {
    displayMessage(
      "#add-contact-success-error-message",
      "Please fill out all fields to add a contact"
    );
  }
}

//    Search contact functionality

function tableHeaders() {
  let newRow = $("<tr>");
  let tHead1 = $("<th>");
  tHead1.text("Name");
  let tHead2 = $("<th>");
  tHead2.text("Phone");
  let tHead3 = $("<th>");
  tHead3.text("Address");
  $("table")
    .append(newRow, tHead1, tHead2, tHead3)
    .css("display", "block");
}

function populateTable(contact) {
  let newRow = $("<tr>");
  let newTD1 = $("<td>");
  newTD1.text(contact.fullName);
  let newTD2 = $("<td>");
  newTD2.text(contact.phone);
  let newTD3 = $("<td>");
  newTD3.text(contact.address);
  $("table")
    .append(newRow, newTD1, newTD2, newTD3)
    .css("display", "block");
}

function searchContact() {
  clearTable();
  for (let contact of contacts) {
    if (searchInputField.val() === "") {
      displayMessage(
        "#search-contact-success-error-message",
        "Please enter a valid search term"
      );
    } else if (
      searchInputField.val().toLowerCase() ===
        contact.firstName.toLowerCase() ||
      searchInputField.val().toLowerCase() === contact.lastName.toLowerCase() ||
      searchInputField.val().toLowerCase() === contact.fullName.toLowerCase() ||
      searchInputField.val() === contact.phone ||
      searchInputField.val().toLowerCase() === contact.address.toLowerCase()
    ) {
      tableHeaders();
      populateTable(contact);
      clearSearchInput();
      break;
    } else {
      displayMessage(
        "#search-contact-success-error-message",
        "Unable to find contact, please try again"
      );
    }
  }
}

function viewAllContacts() {
  let sortedContacts = contacts.sort(function(a, b) {
    return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1;
  });
  clearTable();
  tableHeaders();
  for (contact of sortedContacts) {
    populateTable(contact);
  }
}

//    Delete contact functionality

function deleteContact() {
  for (contact of contacts) {
    if (deleteInputField.val() === "") {
      displayMessage(
        "#delete-contact-success-error-message",
        "Please enter a valid delete term"
      );
    } else if (
      deleteInputField.val().toLowerCase() === contact.fullName.toLowerCase() &&
      confirm(`Are you sure you want to delete ${contact.fullName}?`)
    ) {
      deletedContacts.push(contacts.splice(contacts.indexOf(contact), 1));
      displayMessage(
        "#delete-contact-success-error-message",
        "Contact deleted"
      );
      clearDeleteInput();
      break;
    } else {
      displayMessage(
        "#delete-contact-success-error-message",
        "Please enter the full name and try again"
      );
    }
  }
}
