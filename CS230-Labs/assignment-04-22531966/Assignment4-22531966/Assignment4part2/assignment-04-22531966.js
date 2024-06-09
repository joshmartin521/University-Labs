const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const con = mysql.createConnection({
    host: "webcourse.cs.nuim.ie",
    user: "u230244",
    password: "Uwie8roV2phay7oh",
    database: "cs230_u230244",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

const app = express();
const port = 5500;

//allow requests from all origins
app.use(cors());

//parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Route for root
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/assignment-04-22531966.html");
});

// Route for API user
app.route("/users")
    //if the request method is post
    .post((req, res) => {
        //variable to store request body
        const userData = req.body;

        // SQL queries to insert user data into the database
        const sql = 'INSERT INTO userInfo (Title, `First Name`, `Last Name`, Mobile, Email) VALUES (?,?,?,?,?)';
        const sql2 = 'INSERT INTO userHomeAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES (?,?,?,?,?)';
        const sql3 = 'INSERT INTO userShippingAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES (?,?,?,?,?)';

        con.query(sql, [userData.title, userData.firstname, userData.surname, userData.mobile, userData.email], function(err, result) {
            if (err) throw err;
        });
        con.query(sql2, [userData.hal1, userData.hal2, userData.htown, userData.hcity, userData.heircode], function(err, result) {
            if (err) throw err;
        });
        if(userData.sal1)
        {
            con.query(sql3, [userData.sal1, userData.sal2, userData.stown, userData.scity, userData.seircode], function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
        else
        {
            con.query(sql3, [userData.hal1, userData.hal2, userData.htown, userData.hcity, userData.heircode], function(err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }

        // Write response with 200 status
        var addedUser = "added user " + userData.firstname + " " + userData.surname + " succesfully";
        res.send(addedUser);
    })
    //if the request method is get
    .get((req, res) => {
        //SQL query to fetch user data from the database
        const sql = `SELECT userInfo.*, 
        (SELECT \`Address Line 1\` FROM userHomeAddress WHERE userInfo.id = userHomeAddress.id) AS \`Address Line 1\`, (SELECT \`Address Line 2\` FROM userHomeAddress WHERE userInfo.id = userHomeAddress.id) AS \`Address Line 2\`, (SELECT \`Town\` FROM userHomeAddress WHERE userInfo.id = userHomeAddress.id) AS \`Town\`, (SELECT \`City\` FROM userHomeAddress WHERE userInfo.id = userHomeAddress.id) AS \`City\`, (SELECT \`Eircode\` FROM userHomeAddress WHERE userInfo.id = userHomeAddress.id) AS \`Eircode\` ,
        (SELECT \`Address Line 1\` FROM userShippingAddress WHERE userInfo.id = userShippingAddress.id) AS \`Shipping Address Line 1\`, (SELECT \`Address Line 2\` FROM userShippingAddress WHERE userInfo.id = userShippingAddress.id) AS \`Shipping Address Line 2\`, (SELECT \`Town\` FROM userShippingAddress WHERE userInfo.id = userShippingAddress.id) AS \`Shipping Town\`, (SELECT \`City\` FROM userShippingAddress WHERE userInfo.id = userShippingAddress.id) AS \`Shipping City\`, (SELECT \`Eircode\` FROM userShippingAddress WHERE userInfo.id = userShippingAddress.id) AS \`Shipping Eircode\` 
        FROM userInfo`;
        
        //retrieve the data
        con.query(sql, function(err, result) {
            if (err) {
                console.error("Error retrieving data from database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        });
    })
    //if the request method is delete
    .delete((req, res) => {
        //variable to store request body
        const userData = req.body;

        // SQL queries to delete user data from the database
        const sql = `
            DELETE userInfo, userHomeAddress, userShippingAddress
            FROM userInfo
            LEFT JOIN userHomeAddress ON userInfo.id = userHomeAddress.id
            LEFT JOIN userShippingAddress ON userInfo.id = userShippingAddress.id
            WHERE
            userInfo.\`First Name\` = ? AND
            userInfo.\`Last Name\` = ? AND
            userInfo.\`Mobile\` = ? AND
            userInfo.\`Email\` = ?
        `;

        //delete the user
        con.query(sql, [userData.firstname, userData.surname, userData.mobile, userData.email], function(err, result) {
            if (err) throw err;
            console.log("Deleted Successfully");
            var deletedUser;
            if(result.affectedRows>0)
            {
                deletedUser = "deleted user " + userData.firstname + " " + userData.surname + " succesfully";
            }
            else{
                deletedUser = "no user found";
            }
            res.send(deletedUser);
        });
    })

    //if the request method is put
    .put((req, res) => {
        //variable to store request body
        const userData = req.body;

        // SQL queries to update user data in the database
        const sql = 'UPDATE userShippingAddress INNER JOIN userInfo ON userShippingAddress.id = userInfo.id SET userShippingAddress.`Address Line 1` = ?, userShippingAddress.`Address Line 2` = ?, userShippingAddress.Town = ?, userShippingAddress.City = ?, userShippingAddress.Eircode = ? WHERE userInfo.`First Name` = ? AND userInfo.`Last Name` = ? And userInfo.Mobile = ?';

        //update the user
        con.query(sql, [userData.sal1, userData.sal2, userData.stown, userData.scity, userData.seircode, userData.ufname, userData.ulname, userData.umobile], function(err, result) {
            if (err) throw err;
            console.log("Updated Successfully");
            var updatedUser;
            if(result.affectedRows > 0)
            {
                updatedUser ="updated user " + userData.ufname + " " + userData.ulname + " succesfully";
            }
            else{
                updatedUser = "No matching user found";
            }
            res.send(updatedUser);
        });
    });

// Start server
app.listen(port, () => {
    console.log("Server running on port: " + port);
});