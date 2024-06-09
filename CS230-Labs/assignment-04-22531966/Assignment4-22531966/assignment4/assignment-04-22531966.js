const { rejects } = require('assert');
var mysql = require('mysql');
const { resolve } = require('path');
var readline = require('readline');

//create connection
var con = mysql.createConnection({
  host: "webcourse.cs.nuim.ie",
  user: "u230244",
  password: "Uwie8roV2phay7oh",
  database: "cs230_u230244",
});

// Create readline interface
var kb = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

//search for users with the first name provided to the readline
async function searchName() {
    return new Promise((resolve, reject) => {
        kb.question("Would you like to search a name (yes/no): \n", async function(response) {
            if (response.toLowerCase() === 'yes') {
                kb.question("Enter the name you want to search for: \n", function(searchName) {
                    con.query('SELECT * FROM userInfo WHERE `First Name` = ?', [searchName], function(err, result) {
                        if (err) reject(err);
                        if (result.length > 0) {
                            console.log("Users found with name '" + searchName + "':");
                            const userPromises = result.map(user => {
                                return new Promise((resolve, reject) => {
                                    var userDataString = `Title: ${user.Title}, First Name: ${user['First Name']}, Last Name: ${user['Last Name']}, Mobile: ${user['Mobile']}, Email: ${user['Email']}`;
                                    var identifier = user.id;
                                    con.query('SELECT * FROM userHomeAddress WHERE `id` = ?', [identifier], function(err, addressResult) {
                                        if (err) reject(err);
                                        var userAddressString = `Address Line 1: ${addressResult[0]['Address Line 1']}, Address Line 2: ${addressResult[0]['Address Line 2']}, Town: ${addressResult[0]['Town']} , City: ${addressResult[0]['City']}, Eircode: ${addressResult[0]['Eircode']}`;
                                        userDataString = userDataString.concat(', ' + userAddressString);
                                        console.log(userDataString);
                                        resolve();
                                    });
                                });
                            });
                            Promise.all(userPromises)
                                .then(() => {
                                    resolve(); 
                                });
                        } else {
                            console.log("No users found with name '" + searchName);
                            resolve(); 
                        }
                    });
                });
            } else {
                resolve(); 
            }
        });
    });
}

//update user info with matching data provided 
async function updateUser() {
    return new Promise((resolve) => {
        kb.question("Would you like to update a user (yes/no): \n", async function(result){
            if(result.toLowerCase()==="yes"){
                kb.question("Enter the First name you want to update: \n", function(fname) {
                    kb.question("Enter the second name you want to update: \n", function(lname){
                        kb.question("Enter the mobile number of the user you want to update: \n", function(mobile){
                            con.query('SELECT * FROM userInfo WHERE `First Name` = ? AND `Last Name` = ? AND `mobile` = ?', [fname, lname, mobile], function(err, result) {
                                if(err) throw err;
                                if(result.length>0)
                                {
                                    kb.question("Enter the new Mobile number for them: \n", function(mobile){
                                        kb.question("Enter the new Email for them: \n", function(email){
                                            newTitle(resolve, mobile, email, fname, lname);
                                        });
                                    });
                                }
                                else{
                                    console.log("No User with those credentials");
                                    resolve();
                                }

                            });
                        });
                    });
                        
                });
            }
            else{
                resolve();
            }
        });
    });
}

//checks if the new title provided is a valid title for undating user
function newTitle(resolve, mobile, email, fname, lname)
{
    kb.question("Enter the new title for them: \n", function(title){
        if(validTitles(title))
        {
            if(title.toLowerCase()==="other")
            {
                kb.question("please specify: \n", function(otherTitle){
                    con.query('UPDATE userInfo SET Mobile = ?, `Email` = ?, `Title` = ? WHERE `First Name` = ? AND `Last Name` = ?', [mobile, email, otherTitle, fname, lname], function(err, result){
                        if(err) throw(err);
                        resolve();
                    });
                });
            }
            else{
                con.query('UPDATE userInfo SET Mobile = ?, `Email` = ?, `Title` = ? WHERE `First Name` = ? AND `Last Name` = ?', [mobile, email, title, fname, lname], function(err, result){
                    if(err) throw(err);
                    con.query('UPDATE userInfo SET `Title` = ? WHERE `First Name` = ? AND `Last Name` = ?', [title, fname, lname], function(err, result){
                        if(err) throw(err)
                        resolve()
                    });
                });
            }
        }
        else
        {
            console.log("Not a valid title")
            newTitle(resolve, mobile, email, fname, lname);
        }
    });
}

//delete user with matching data
async function deleteUser() {
    return new Promise((resolve, reject) => {
        kb.question("Would you like to delete a user? (yes/no): \n", async function(response){
            if(response.toLowerCase()==="yes"){
                kb.question("Enter name of user to delete: \n", function(name){
                    kb.question("Enter Phone Number of user to delete: \n", function(mobile){
                        kb.question("Enter email of user to delete: \n", function(email){
                            con.query('SELECT * FROM userInfo WHERE `First Name` = ? AND `Mobile` = ? AND `Email` = ?', [name, mobile, email], function(err, result) {
                                if(err) throw err;
                                if(result.length>0)
                                {
                                    const userId = result[0].id;

                                    // Delete from userInfo table
                                    con.query('DELETE FROM userInfo WHERE `Email` = ? AND `Mobile` = ? AND `First Name` = ?', [email, mobile, name], function(err, result){
                                        if(err) throw err;

                                        // Delete from userAddressInfo table
                                        con.query('DELETE FROM userHomeAddress WHERE `id` = ?', [userId], function(err, result){
                                            if(err) throw err;

                                            // Delete from userShippingInfo table
                                            con.query('DELETE FROM userShippingAddress WHERE `id` = ?', [userId], function(err, result){
                                                if(err) throw err;
                                                console.log("Successfully Deleted User");
                                                resolve();
                                            });
                                        });
                                    });
                                }
                                else{
                                    console.log("No User with those credentials");
                                    resolve();
                                }
            
                            });
                        });
                    });
                });
            }
            else{
                resolve();
            }
        });
    });
}

//add a new user to the database
async function addUser() {
    return new Promise((resolve, reject) => {
        kb.question("Would you like to add a user (yes/no)\n", async function(response) {
            if (response.toLowerCase() === "yes") {
                promptTitle(resolve);
            } else {
                resolve();
            }
        });
    });
}

//check if new users title is a valid one
function promptTitle(resolve) {
    kb.question("Title (Mx, Ms, Mr, Mrs, Dr or Other(specify)): \n", function(title) {
        if (validTitles(title)) {
            if(title.toLowerCase() === "other")
            {
                kb.question("Please Specify: \n", function(otherTitle){
                    promptUserInfo(resolve, otherTitle);
                });
            }
            else{
                promptUserInfo(resolve, title);
            }
        } else {
            console.log("Not a valid title");
            promptTitle(resolve);
        }
    });
}

//get the rest of new user's info
function promptUserInfo(resolve, title) {
    kb.question("First Name *: \n", function(fname) {
        if (!fname.trim()) {
            console.log("First Name is required.");
            return promptUserInfo(resolve, title);
        }
        kb.question("Surname *: \n", function(lname) {
            if (!lname.trim()) {
                console.log("Surname is required.");
                return promptUserInfo(resolve, title);
            }
            kb.question("Mobile *: \n", function(mobile) {
                if (!mobile.trim()) {
                    console.log("mobile is required.");
                    return promptUserInfo(resolve, title);
                }
                kb.question("Email *: \n", function(email) {
                    if (!email.trim()) {
                        console.log("email is required.");
                        return promptUserInfo(resolve, title);
                    }
                   console.log("Home Address:");
                    kb.question("Address Line 1 *: ", function(hal1){
                        if (!hal1.trim()) {
                            console.log("Home Address Line 1 is required.");
                            return promptUserInfo(resolve, title);
                        }
                        kb.question("Address Line 2: ", function(hal2){
                            kb.question("Town *:", function(htown){
                                if (!htown.trim()) {
                                    console.log("Town is required.");
                                    return promptUserInfo(resolve, title);
                                }
                                kb.question("City *: ", function(hcity){
                                    if (!hcity.trim()) {
                                        console.log("City is required.");
                                        return promptUserInfo(resolve, title);
                                    }
                                    kb.question("Eircode:", function(heircode)
                                    {
                                        kb.question("Use the same address for your shipping address? (yes/no):", function(answer){
                                            if(answer.toLowerCase() === "yes")
                                            {
                                                con.query('INSERT INTO userInfo (Title, `First Name`, `Last Name`, Mobile, Email) VALUES(?,?,?,?,?)', [title, fname, lname, mobile, email]);
                                                con.query('INSERT INTO userHomeAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES(?,?,?,?,?)', [hal1,hal2,htown,hcity,heircode]);
                                                con.query('INSERT INTO userShippingAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES(?,?,?,?,?)', [hal1,hal2,htown,hcity,heircode]);
                                                resolve();
                                            }
                                            else{
                                                console.log("Shipping Address:");
                                                    kb.question("Address Line 1 *: ", function(sal1){
                                                        if (!sal1.trim()) {
                                                            console.log("Shipping Address Line 1 is required.");
                                                            return promptUserInfo(resolve, title);
                                                        }
                                                        kb.question("Address Line 2: ", function(sal2){
                                                            kb.question("Town *:", function(stown){
                                                                if (!stown.trim()) {
                                                                    console.log("Town is required is required.");
                                                                    return promptUserInfo(resolve, title);
                                                                }
                                                                kb.question("City *: ", function(scity){
                                                                    if (!scity.trim()) {
                                                                        console.log("City is required.");
                                                                        return promptUserInfo(resolve, title);
                                                                    }
                                                                    kb.question("Eircode:", function(seircode)
                                                                    {
                                                                        con.query('INSERT INTO userInfo (Title, `First Name`, `Last Name`, Mobile, Email) VALUES(?,?,?,?,?)', [title, fname, lname, mobile, email]);
                                                                        con.query('INSERT INTO userHomeAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES(?,?,?,?,?)', [hal1,hal2,htown,hcity,heircode]);
                                                                        con.query('INSERT INTO userShippingAddress (`Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES(?,?,?,?,?)', [sal1,sal2,stown,scity,seircode]);
                                                                        resolve();
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

//validate title
function validTitles(title)
{
    title = title.toLowerCase();
    const validTitles = ['mx', 'ms', 'mr', 'mrs', 'dr', 'other', ''];
    if(validTitles.includes(title))
    {
        return true;
    }
    else{
        return false;
    }
}

//flow of execution
(async () => {
        await addUser();
        await searchName();
        await updateUser();
        await deleteUser();
        // All operations completed
        con.end(); // Close connection
        kb.close();
})();

});




 