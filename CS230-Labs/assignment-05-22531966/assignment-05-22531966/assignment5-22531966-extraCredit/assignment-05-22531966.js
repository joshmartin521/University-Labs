//Id7QiYvSxLvUrV2Q
const express = require('express');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var readline = require('readline');

  // Define the schema for the customers collection
  const customerSchema = new mongoose.Schema({
    Title: String,
    "First Name": { type: String, required: true },
    "Last Name": { type: String, required: true },
    Mobile: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Check if the value consists only of digits
          return /^\d+$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    Email:  { type: String, required: true },
    "Home Address": {
      "Address Line 1": { type: String, required: true},
      "Address Line 2": String,
      Town: { type: String, required: true},
      City: { type: String, required: true},
      Eircode: String
    },
    "Shipping Address": {
      "Address Line 1": { type: String, required: true},
      "Address Line 2": String,
      Town: { type: String, required: true},
      City: { type: String, required: true},
      Eircode: String
    }
  },{versionKey: false});
  
  // Define the schema for the items collection
  const itemSchema = new mongoose.Schema({
    Manufacturer: { type: String, required: true},
    Model: { type: String, required: true},
    Price: { type: Number, required: true}
  },{versionKey: false});
  
  // Define the schema for the orders collection
  const orderSchema = new mongoose.Schema({
    Email: String,
    Mobile: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Check if the value consists only of digits
          return /^\d+$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    orders: [{
      Model: String,
      Quantity: Number
    }]
  },{versionKey: false});

  // Create the models
  const Customer = mongoose.model('Customer', customerSchema);
  const Item = mongoose.model('Item', itemSchema);
  const Order = mongoose.model('Order', orderSchema);

  // Create the express app
  const app = express();
  const port = 5500;

  // Use the required middlewares
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname));

  var kb = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Connect to the database
  mongoose.connect("mongodb+srv://user:0987654321@cluster0.gr5lpje.mongodb.net/PhoneShop");

  console.log("Welcome to the phone shop");

// Define the routes  
app.get("/", async (req, res) => {
    await res.sendFile(__dirname + "/assignment-05-22531966.html");
});

app.get("/links/items", async (req, res) => {
    await res.sendFile(__dirname + "/assignment-05-22531966page2.html");
});

app.get("/links/orders", async (req, res) => {
    await res.sendFile(__dirname + "/assignment-05-22531966page3.html");
});

// Define the routes for the customers collection
// Define the route for adding a customer
app.route("/users")
    .post(async (req, res) => {
        const userData = req.body;

      if(userData.sal1 == null || userData.sal1 == "") {
        // Create a new customer object
      var newCustomer = new Customer({
        "Title": userData.title,
        "First Name": userData.firstname,
        "Last Name": userData.surname,
        "Mobile": userData.mobile,
        "Email": userData.email,
        "Home Address": {
          "Address Line 1": userData.hal1,
          "Address Line 2": userData.hal2,
          "Town": userData.htown,
          "City": userData.hcity,
          "Eircode": userData.heircode
        },
        "Shipping Address": {
          "Address Line 1": userData.hal1,
          "Address Line 2": userData.hal2,
          "Town": userData.htown,
          "City": userData.hcity,
          "Eircode": userData.heircode
        }
      });
    } else {
      var newCustomer = new Customer({
        "Title": userData.title,
        "First Name": userData.firstname,
        "Last Name": userData.surname,
        "Mobile": userData.mobile,
        "Email": userData.email,
        "Home Address": {
          "Address Line 1": userData.hal1,
          "Address Line 2": userData.hal2,
          "Town": userData.htown,
          "City": userData.hcity,
          "Eircode": userData.heircode
        },
        "Shipping Address": {
          "Address Line 1": userData.sal1,
          "Address Line 2": userData.sal2,
          "Town": userData.stown,
          "City": userData.scity,
          "Eircode": userData.seircode
        }
      });
    }

    try {
      // Save customer to the database
      await newCustomer.save();
      const resultMsg = "Customer: " + userData.firstname + " " + userData.surname + " added successfully";
      res.send(resultMsg);
    } catch (error) {
      console.error(error);
      res.send("invalid data entered, please check the data and try again");
    }
    });

    // Define the route for fetching all the customers
    app.get("/users", async (req, res) => {
        console.log("Fetching data from the database");
        // Fetch all the customers from the database
        var results = await Customer.find({});
        var resultsParagraph = "";
        // Loop through the results and create a paragraph for each customer
        for (var i = 0; i < results.length; i++) {
          resultsParagraph += "<p>" + results[i]["First Name"] + ", " + results[i]["Last Name"] + ", " + results[i].Mobile + ", " + results[i].Email + "</p>";
          resultsParagraph += "<p>" + results[i]["Home Address"]["Address Line 1"] + ", " + results[i]["Home Address"]["Address Line 2"] + ", " + results[i]["Home Address"].Town + ", " + results[i]["Home Address"].City + ", " + results[i]["Home Address"].Eircode + "</p>";
          resultsParagraph += "<p>" + results[i]["Shipping Address"]["Address Line 1"] + ", " + results[i]["Shipping Address"]["Address Line 2"] + ", " + results[i]["Shipping Address"].Town + ", " + results[i]["Shipping Address"].City + ", " + results[i]["Shipping Address"].Eircode + "</p>";
          resultsParagraph += "<br>";
        }
        res.send(resultsParagraph);
    });

    // Define the route for deleting a customer
    app.delete("/users", async (req, res) => {
        console.log("Deleting data from the database");
        const userData = req.body;
        // Delete the customer from the database
        var result = await Customer.deleteMany({"First Name": userData.firstname, "Last Name": userData.surname, "Mobile": userData.mobile, "Email": userData.email});
        if (result.deletedCount == 0) {
            res.send("No user found with the given data");
            return;
        }
        res.send("deleted user " + userData.firstname + " " + userData.surname + " successfully");
    });

    // Define the route for updating a customer
    app.put("/users", async (req, res) => {
        console.log("Updating data in the database");
        const userData = req.body;

        // Create the shipping address object
        var shippingAddress = {
            "Address Line 1": userData.sal1,
            "Address Line 2": userData.sal2,
            "Town": userData.stown,
            "City": userData.scity,
            "Eircode": userData.seircode
        };

        // Update the customer in the database
        var result = await Customer.updateOne({"First Name": userData.ufname, "Last Name": userData.ulname, "Mobile": userData.umobile}, {$set: {"Shipping Address": shippingAddress}});
        if (result.modifiedCount == 0) {
            res.send("No user found with the given data");
            return;
        }
        res.send("updated user " + userData.ufname + " " + userData.ulname + " successfully");
    });

// Define the routes for the items collection
// Define the route for adding an item
  app.route("/items")
    .post(async (req, res) => {
      const itemData = req.body;
      // Create a new item object
      var newItem = new Item({
        "Manufacturer": itemData.Manufacturer,
        "Model": itemData.Model,
        "Price": itemData.Price
      });
      try {
        // Save the item to the database
        await newItem.save();
        res.send("item: " + itemData.Manufacturer + " " + itemData.Model + " added successfully");
      }
      catch (error) {
        console.error(error);
        res.send("invalid data entered, please check the data and try again");
      }
    });

    // Define the route for fetching all the items
    app.route("/items")
    .get(async (req, res) => {
      console.log("Fetching data from the database");
      // Fetch all the items from the database
      var results = await Item.find({});
      var resultsParagraph = "";
      // Loop through the results and create a paragraph for each item
      for (var i = 0; i < results.length; i++) {
        resultsParagraph += "<p>" + results[i].Manufacturer + ", " + results[i].Model + ", " + results[i].Price + "</p>";
      }
      res.send(resultsParagraph);
  });

  // Define the route for deleting an item
  app.route("/items").delete(async (req, res) => {
    const itemData = req.body;
    // Delete the item from the database
    var result = await Item.deleteMany({"Manufacturer": itemData.Manufacturer, "Model": itemData.Model});
    if (result.deletedCount == 0) {
        res.send("No item found with the given data");
        return;
    }
    res.send("deleted item " + itemData.Manufacturer + " " + itemData.Model + " successfully");
  });

  // Define the route for updating an item
  app.route("/items").put(async (req, res) => {
    const itemData = req.body;
    try{
      // Create the item object
      var newItem = new Item({
        "Manufacturer": itemData.Manufacturer,
        "Model": itemData.Model,
        "Price": itemData.Price
      });

      // Update the item in the database
      var result = await Item.updateOne({"Manufacturer": itemData.Manufacturer, "Model": itemData.Model}, {$set: {"Price": itemData.Price}});
      if (result.modifiedCount == 0) {
          res.send("No item found with the given data");
          return;
      }
      res.send("updated item " + itemData.Manufacturer + " " + itemData.Model + " successfully");

    } catch (error) {
      res.send("invalid data entered, please check the data and try again");
    }
  });

  // Define the routes for the orders collection
  // Define the route for adding an order
  app.route("/orders").post(async (req, res) => {
    const orderData = req.body;
    console.log(orderData);
    // Create a new order object
    var newOrder = new Order({
      "Email": orderData.Email,
      "Mobile": orderData.Mobile,
      "orders": orderData.orders
    });

    // Check if the items in the order are in the database
    for (var i = 0; i < newOrder.orders.length; i++) {
      var item = await Item.findOne({"Manufacturer": orderData.orders[i].Manufacturer, "Model": newOrder.orders[i].Model});
      if (item == null) {
          res.send("one or more items in the order are not found in the database");
          return;
      }
    }

    try {
      // Save the order to the database
      await newOrder.save();
      res.send("order for " + orderData.Email + " added successfully");
    }
    catch (error) {
      console.error(error);
      res.send("invalid data entered, please check the data and try again");
    }  
  });

  // Define the route for fetching all the orders
  app.route("/orders").get(async (req, res) => {
    console.log("Fetching data from the database");
    // Fetch all the orders from the database
    var results = await Order.find({});
    var resultsParagraph = "";
    // Loop through the results and create a paragraph for each order
    for (var i = 0; i < results.length; i++) {
      resultsParagraph += "<p>" + results[i].Email + ", " + results[i].Mobile + ", " ;
      for (var j = 0; j < results[i].orders.length; j++) {
        resultsParagraph += results[i].orders[j].Model + " (" + results[i].orders[j].Quantity + ") ";
      }
      resultsParagraph += "</p>";
    }
    res.send(resultsParagraph);
  });

  // Define the route for deleting an order
  app.route("/orders").delete(async (req, res) => {
    const orderData = req.body;
    // check if the order exists
    var resultArray = await Order.find({"Email": orderData.email, "Mobile": orderData.mobile});
    if (resultArray.length == 0) {
        res.send("No order found with the given data");
        return;
    }
    try{
      // Delete the order from the database
      var result = await Order.deleteOne({_id : resultArray[(orderData.num)-1]._id});
      if (result.deletedCount == 0) {
        res.send("No order found with the given data");
        return;
    }
    res.send("deleted order for " + orderData.email + " successfully");
    } catch (error) {
      res.send("invalid data entered, please check the data and try again");
    }
  });

  // Define the route for updating an order
app.route("/orders").put(async (req, res) => {
  const orderData = req.body;

  // check if the order exists
  var resultArray = await Order.find({"Email": orderData.email, "Mobile": orderData.mobile});
  if (resultArray.length == 0) {
      res.send("No order found with the given data");
      return;
  }

  // check if the item exists
  var item = await Item.findOne({"Model": orderData.model});
  if (item == null) {
      res.send("No item found with the given data");
      return;
  }
  
  // check if the order number is valid
  if(orderData.num > resultArray.length || orderData.num < 1) {
    res.send("No order found with the given data");
    return;
  }

  // Update the order in the database
  var tragetOrder = resultArray[(orderData.num)-1];
  tragetOrder.orders.push({"Model": orderData.model, "Quantity": orderData.quantity});

  try{
    // Save the updated order to the database
    await tragetOrder.save();
    res.send("updated order for " + orderData.email + " successfully");
  } catch (error) {
    res.send("invalid data entered, please check the data and try again");
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server running on port: " + port);
});

