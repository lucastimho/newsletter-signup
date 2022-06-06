const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  
  const jsonData = JSON.parse.stringify(data);
  
  const url = "https://us4.api.mailchimp.com/3.0/lists3bcf3cbb34";
  
  console.log(firstName, lastName, email);
})
app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})