// create universal array
let users;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}
function register() {
  // collect user inputs
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let gender = document.getElementById("gender").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let retypePassword = document.getElementById("rPassword").value;

  if (firstname == "" || lastname == "" || phoneNumber == "" || gender == "0") {
    alert("Cannot Save empty fields");
  } else {
    //check password match
    if (password !== retypePassword) {
      alert("Password's don't matchs");
    } else {
      // create a new object out of user inputs
      let userObj = {
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        gender: gender,
        email: email,
        password: password,
      };
      // add objects to the universal array
      users.push(userObj);
      document.getElementById("firstname").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("phoneNumber").value = "";
      document.getElementById("gender").value = "0";
      document.getElementById("password").value = "";
      document.getElementById("email").value = "";

      //save in local storage
      let string = JSON.stringify(users);
      localStorage.setItem("users", string);
      location.href = "/project/login.html";
    }

    // get();
  }
}

function displayContacts(n) {
  //  let item = localStorage.getItem("name");
  //   contactArray = JSON.parse(item);

  let display = "";
  for (let i in n) {
    display += ` <tr>
                <td>${Number(i) + 1}</td>
                <td>${n[i].firstname}</td>
                <td>${n[i].lastname}</td>
                <td>${n[i].gender}</td>
                <td>${n[i].phoneNumber}</td>
                <td><img onclick='editContacts(${i})' src='./assets/edit.png' width="20px"> <img onclick='deleteContact(${i})' src='./assets/bin.png' width="20px"></td>
                </tr>`;
  }

  document.getElementById("table").innerHTML = display;
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete")) {
    contactArray.splice(index, 1);
    displayContacts(contactArray);
  }
}

let updateIndex = null;

function editContacts(n) {
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("updateBtn").classList.remove("d-none");

  document.getElementById("firstname").value = contactArray[n].firstname;
  document.getElementById("lastname").value = contactArray[n].lastname;
  document.getElementById("phoneNumber").value = contactArray[n].phoneNumber;
  document.getElementById("gender").value = contactArray[n].gender;

  updateIndex = n;
}

function updateContact() {
  contactArray[updateIndex].firstname =
    document.getElementById("firstname").value;
  contactArray[updateIndex].lastname =
    document.getElementById("lastname").value;
  contactArray[updateIndex].phoneNumber =
    document.getElementById("phoneNumber").value;
  contactArray[updateIndex].gender = document.getElementById("gender").value;

  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("gender").value = "0";

  document.getElementById("saveBtn").style.display = "block";
  document.getElementById("updateBtn").classList.add("d-none");
  saveSomething();
  get();
  // displayContacts(contactArray);
}

function saveSomething() {
  let string = JSON.stringify(contactArray);
  localStorage.setItem("users", string);
}

function get() {
  let item = localStorage.getItem("users");
  let array = JSON.parse(item);

  displayContacts(array);
}

function loginUser() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let item = localStorage.getItem("users");
  let users = JSON.parse(item);

  for (let i in users) {
    if (users[i].email === email && users[i].password === password) {
      location.href = "/project/dashboard.html";
    } else {
      document.getElementById("display").innerHTML = " User not found";
    }
  }
}
