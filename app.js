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

  const options = {
    method: "POST",
    auth: "lho: fd8d2a94f77b14c7c113e1d4a29c6120-us4"
  }

  const request = https.request(url, options, function(response) {
    
    if (response.statusCode === 200) {
      res.send("Successfully subscribed!");
    } else {
      res.send("There was an error with signing up, please try again!");
    }
    
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
})
app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})