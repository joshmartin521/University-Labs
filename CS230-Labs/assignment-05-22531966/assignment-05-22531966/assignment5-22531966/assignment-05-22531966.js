//Id7QiYvSxLvUrV2Q
const { MongoClient, ConnectionPoolClosedEvent } = require("mongodb");
var readline = require('readline');
const mongoose = require('mongoose');
const uri ="mongodb+srv://user:0987654321@cluster0.gr5lpje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//"mongodb+srv://user:Id7QiYvSxLvUrV2Q@customers.sbszibk.mongodb.net/?retryWrites=true&w=majority&appName=customers"
const client = new MongoClient(uri);

//Schema for the customer, item, and order
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

const itemSchema = new mongoose.Schema({
  Manufacturer: { type: String, required: true},
  Model: { type: String, required: true},
  Price: { type: Number, required: true}
},{versionKey: false});

const orderSchema = new mongoose.Schema({
  Email: String,
  Mobile: String,
  orders: [{
    Model: String,
    Quantity: Number
  }]
},{versionKey: false});

// Create models for the customer, item, and order
const Customer = mongoose.model('Customer', customerSchema);
const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

var kb = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function run() {
    try {
      // Connect to the MongoDB cluster
      await mongoose.connect("mongodb+srv://user:0987654321@cluster0.gr5lpje.mongodb.net/PhoneShop");
      console.log("Connected to database");

      // Ask the user for the action they want to perform
      while(true)
      {
        const response = await askQuestion("Would you like to insert, retrieve, update, or delete a customer, item, or order? (Enter 'C', 'R', 'U', or 'D'): ");
        await executeAction(response.toUpperCase());

        const response2 = await askQuestion("Would you like to continue? (yes/no): ");
        if(response2.toLowerCase() !== "yes")
        {
          break;
        }
      }

      // Execute the action
      async function executeAction(action) {
        switch (action) {
            case 'C':
                const entityTypeC = await askQuestion("Enter 'customer', 'item', or 'order' to insert: ");
                switch (entityTypeC.toLowerCase()) {
                    case 'customer':
                        await insertCustomer();
                        break;
                    case 'item':
                        await insertItem();
                        break;
                    case 'order':
                        await insertOrder();
                        break;
                    default:
                        console.log("Invalid entity type for insertion.");
                }
                break;
            case 'R':
                const entityTypeR = await askQuestion("Enter 'customer', 'item', or 'order' to retrieve: ");
                switch (entityTypeR.toLowerCase()) {
                    case 'customer':
                        await getCustomer();
                        break;
                    case 'item':
                        await getItem();
                        break;
                    case 'order':
                        await getOrder();
                        break;
                    default:
                        console.log("Invalid entity type for retrieval.");
                }
                break;
            case 'U':
                const entityTypeU = await askQuestion("Enter 'customer', 'item', or 'order' to update: ");
                switch (entityTypeU.toLowerCase()) {
                    case 'customer':
                        await updateCustomer();
                        break;
                    case 'item':
                        await updateItem();
                        break;
                    case 'order':
                        await updateOrder();
                        break;
                    default:
                        console.log("Invalid entity type for updating.");
                }
                break;
            case 'D':
                const entityTypeD = await askQuestion("Enter 'customer', 'item', or 'order' to delete: ");
                switch (entityTypeD.toLowerCase()) {
                    case 'customer':
                        await deleteCustomer();
                        break;
                    case 'item':
                        await deleteItem();
                        break;
                    case 'order':
                        await deleteOrder();
                        break;
                    default:
                        console.log("Invalid entity type for deletion.");
                }
                break;
            default:
                console.log("Invalid action.");
        }
      }
 
      // Insert a new customer
      async function insertCustomer()
      {
        try {
          // Ask the user for the customer details
          const title = await askQuestion("Enter the title: ");
          const name = await askQuestion("Enter the name: ");
          const surname = await askQuestion("Enter the surname: ");
          const mobile = await askQuestion("Enter the mobile number: ");
          const email = await askQuestion("Enter the email: ");
          const addressLine1 = await askQuestion("Enter the home address line 1: ");
          const addressLine2 = await askQuestion("Enter the home address line 2: ");
          const street = await askQuestion("Enter the home street: ");
          const city = await askQuestion("Enter the home city: ");
          const eircode = await askQuestion("Enter the home eircode: ");
          const shipAddressLine1 = await askQuestion("Enter the shipping address line 1: ");
          const shipAddressLine2 = await askQuestion("Enter the shipping address line 2: ");
          const shipStreet = await askQuestion("Enter the shipping street: ");
          const shipCity = await askQuestion("Enter the shipping city: ");
          const shipEircode = await askQuestion("Enter the shipping eircode: ");
  
          // Create a new Customer instance
        const newCustomer = new Customer({
          Title: title,
          "First Name": name,
          "Last Name": surname,
          Mobile: mobile,
          Email: email,
          "Home Address": {
              "Address Line 1": addressLine1,
              "Address Line 2": addressLine2,
              Town: street,
              City: city,
              Eircode: eircode
          },
          "Shipping Address": {
              "Address Line 1": shipAddressLine1,
              "Address Line 2": shipAddressLine2,
              Town: shipStreet,
              City: shipCity,
              Eircode: shipEircode
          }
      });

      // Save the customer to the database
      await newCustomer.save();
      console.log("Customer inserted successfully");
    } catch (error) {
      // Check if the error is a validation error
      if (error.errors) {
        // Log validation errors
        for (const field in error.errors) {
          console.error(`Validation error for ${field}: ${error.errors[field].message}`);
        }
      } else {
        console.error("Error inserting customer:", error.message);
      }
    }
      }

      // Get a customer
      async function getCustomer() {
        // Ask the user for the customer details
        const name = await askQuestion("Enter the first name of the customer you want to get: ");
        const surname = await askQuestion("Enter the surname of the customer you want to get: ");
        const email = await askQuestion("Enter the email of the customer you want to get: ");
    
        try {
            // Find the customer in the database
            const customer = await Customer.findOne({ "First Name": name, "Last Name": surname, Email: email });
            
            // Log the customer details
            if (!customer) {
                console.log("Customer not found");
            } else {
                console.log("Name: " + customer["First Name"] + " " + customer["Last Name"]);
                console.log("Mobile: " + customer.Mobile);
                console.log("Email: " + customer.Email);
                console.log("Home Address: " + customer["Home Address"]["Address Line 1"] + " " + customer["Home Address"]["Address Line 2"] + " " + customer["Home Address"].Town + " " + customer["Home Address"].City + " " + customer["Home Address"].Eircode);
                console.log("Shipping Address: " + customer["Shipping Address"]["Address Line 1"] + " " + customer["Shipping Address"]["Address Line 2"] + " " + customer["Shipping Address"].Town + " " + customer["Shipping Address"].City + " " + customer["Shipping Address"].Eircode);
            }
        } catch (error) {
            console.error("Error retrieving customer:", error);
        }
    }

      // Delete a customer
      async function deleteCustomer()
      {
        // Ask the user for the customer details
        const name = await askQuestion("Enter the first name of the customer you want to delete: ");
        const email = await askQuestion("Enter the email of the customer you want to delete: ");
        const phone = await askQuestion("Enter the mobile number of the customer you want to delete: ");

        // Find the customer in the database
        var userToBeDeleted = await Customer.findOne({"First Name": name, "Email": email, "Mobile": phone});
        if(userToBeDeleted)
        {
          // Log the customer details
          console.log("Deleting user: (Name: " + userToBeDeleted["First Name"] +" Mobile: " + userToBeDeleted.Mobile + " Email: " + userToBeDeleted.Email + ")");

          // Delete the customer from the database
          result = await Customer.deleteMany({"First Name": name, Email: email, Mobile: phone});
          console.log("Customer deleted successfully");
        }
        else{
          console.log("Customer not found");
        }
      }

      // Update a customer
      async function updateCustomer()
      {
        try{
          // Ask the user for the customer details
          const name = await askQuestion("Enter the first name of the customer you want to update: ");
          const surname = await askQuestion("Enter the surname of the customer you want to update: ");
          const email = await askQuestion("Enter the email of the customer you want to update: ");

          // Find the customer in the database
          var userToBeUpdated = await Customer.findOne({"First Name": name, "Last Name": surname, Email: email});

          //ask the user what they want to update
          if(userToBeUpdated)
          {
            if(await askQuestion("Would you like to update the title? (yes/no)") == "yes")
            {
              userToBeUpdated.Title = await askQuestion("Enter the new Title: ");
            }
            if(await askQuestion("Would you like to update the email? (yes/no)") == "yes")
            {
              userToBeUpdated.Email = await askQuestion("Enter the new email: ");
            }
            if(await askQuestion("Would you like to update the mobile number? (yes/no)") == "yes")
            {
              userToBeUpdated.Mobile = await askQuestion("Enter the new mobile number: ");
            }
            if(await askQuestion("Would you like to update the home address? (yes/no)") == "yes")
            {
              userToBeUpdated["Home Address"]["Address Line 1"] = await askQuestion("Enter the new address line 1: ");
              userToBeUpdated["Home Address"]["Address Line 2"] = await askQuestion("Enter the new address line 2: ");
              userToBeUpdated["Home Address"]["Town"] = await askQuestion("Enter the new street: ");
              userToBeUpdated["Home Address"]["City"] = await askQuestion("Enter the new city: ");
              userToBeUpdated["Home Address"]["Eircode"] = await askQuestion("Enter the new eircode: ");
            }
            if(await askQuestion("Would you like to update the shipping address? (yes/no)") == "yes")
            {
              userToBeUpdated["Shipping Address"]["Address Line 1"] = await askQuestion("Enter the new address line 1: ");
              userToBeUpdated["Shipping Address"]["Address Line 2"] = await askQuestion("Enter the new address line 2: ");
              userToBeUpdated["Shipping Address"]["Town"] = await askQuestion("Enter the new street: ");
              userToBeUpdated["Shipping Address"]["City"] = await askQuestion("Enter the new city: ");
              userToBeUpdated["Shipping Address"]["Eircode"] = await askQuestion("Enter the new eircode: ");
            }

            // Save the updated customer to the database
            await userToBeUpdated.save();
            console.log("Customer updated successfully");
          }
          else{
            console.log("Customer not found");
          }
        }catch(error){
           // Check if the error is a validation error
          if (error.errors) {
            // Log validation errors
            for (const field in error.errors) {
              console.error(`Validation error for ${field}: ${error.errors[field].message}`);
            }
          } else {
            console.error("Error inserting customer:", error.message);
          }
        }
      }

      // Insert an item
      async function insertItem()
      {
        try {
          // Ask the user for the item details
          const manufacturer = await askQuestion("Enter the Manufacturer: ");
          const model = await askQuestion("Enter the Model: ");
          const price = await askQuestion("Enter the Price: ");
  
          // Create a new Item instance
          const newItem = new Item({
            Manufacturer: manufacturer,
            Model: model,
            Price: price
        });
  
        // Save the item to the database
        await newItem.save();
        console.log("Item inserted successfully");
      } catch (error) {
         if (error.errors) {
          for (const field in error.errors) {
            console.error(`Validation error for ${field}: ${error.errors[field].message}`);
          }
        } else {
          console.error("Error inserting customer:", error.message);
        }
      }
      }

      // Get an item
      async function getItem()
      {
        try{
          // Ask the user for the item details
          const manufacturer = await askQuestion("Enter the manufacturer of the Phone you're looking for: ");

          // Find the item in the database
          const result = await Item.find({Manufacturer: manufacturer});

          // Log the item details
          if(result.length == 0)
          {
            console.log("Item not found");
          }
          else{
            result.forEach(doc => {
              console.log("Manufacturer: " + doc.Manufacturer + ", Model: " + doc.Model + ", Price: " + doc.Price);
              console.log("-----------------------------------------------------");
            });
          }
        }catch(error){
          console.error("Error getting item:", error);
        }
      }

      // Delete an item
      async function deleteItem()
      {
        try{
          // Ask the user for the item details
          const manufacturer = await askQuestion("Enter the manufacturer of the item you want to delete: ");
          const model = await askQuestion("Enter the model of the item you want to delete: ");

          // Find the item in the database
          var itemToBeDeleted = await Item.findOne({Manufacturer: manufacturer, Model: model});

          // Log the item details and delete the item
          if(itemToBeDeleted)
          {
            console.log("Deleting item: (Manufacturer: " + itemToBeDeleted.Manufacturer + " Model: " + itemToBeDeleted.Model + " Price: " + itemToBeDeleted.Price +")");

            result = await Item.deleteMany({Manufacturer: manufacturer, Model: model});
            console.log("item deleted successfully");
          }
          else{
            console.log("Item not found");
          }
        }catch(error){
            console.error("Error deleting item:", error);
        }
      }

      // Update an item
      async function updateItem()
      {
        try{
          // Ask the user for the item details
          const manufacturer = await askQuestion("Enter the manufacturer of the item you want to update: ");
          const model = await askQuestion("Enter the model of the item you want to update: ");

          // Find the item in the database
          var itemToBeUpdated = await Item.findOne({Manufacturer: manufacturer, Model: model});
          if(itemToBeUpdated)
          {
            // Ask the user for the new price
            const newPrice = await askQuestion("Enter the new price: ");
            itemToBeUpdated.Price = newPrice;
            await itemToBeUpdated.save();
            console.log("Item's new price set to: " + newPrice);
          }
          else{
            console.log("Item not found");
          }
        }catch(error){
           // Check if the error is a validation error
           if (error.errors) {
            // Log validation errors
            for (const field in error.errors) {
              console.error(`Validation error for ${field}: ${error.errors[field].message}`);
            }
          }
            else { 
              console.error("Error updating item:", error);
            }
        }
      }

      // Insert an order
      async function insertOrder()
      {
        try{
          // Ask the user for the customer details
          const email = await askQuestion("Who is this order for, enter your email: ");
          const mobile = await askQuestion("Enter your mobile number: ");

          const cursor = await Customer.find({Email: email, Mobile: mobile});

          if(cursor.length == 0)
          {
            console.log("Customer not found");
          }
          else{
            // Ask the user for the order details
            let orders = [];
            let num = 0;

            do {
              const order = await askQuestion("What would you like to order? Enter the Model name: ");
              const quantity = await askQuestion("Enter the quantity: ");
              if(await Item.findOne({Model: order}) == null)
              { 
                console.log("Item not found");
              }
              else{
                orders.push({ Model: order, Quantity: quantity });
                num++;
              }
              const response = await askQuestion("Would you like to order something else? (yes/no)");
              if (response.toLowerCase() !== "yes") {
                  break;
              }
            } while (true);

            // Create a new Order instance
            const newOrder = new Order({
              Email: email,
              Mobile: mobile,
              orders: orders
            });

            // Save the order to the database
            await newOrder.save();
            console.log("Order placed successfully");
          }
        } catch (error) {
           // Check if the error is a validation error
           if (error.errors) {
            // Log validation errors
            for (const field in error.errors) {
              console.error(`Validation error for ${field}: ${error.errors[field].message}`);
            }
          } else {
            console.error("Error inserting customer:", error.message);
          }
        }
      }

      // Get an order
      async function getOrder()
      {
        try{
          // Ask the user for the customer details
          const email = await askQuestion("Enter the email of the customer you want to get the orders for: ");
          const mobile = await askQuestion("Enter the mobile number of the customer you want to get the orders for: ");

          // Find the order in the database
          const customerOrders = await Order.find({Email: email, Mobile: mobile});

          if(customerOrders.length == 0)
          {
            console.log("Order not found");
          }
          else{
            //log all the matching orders (customers can have multiple orders)
            customerOrders.forEach(order => {
              console.log("Email: " + order.Email + ", Mobile: " + order.Mobile);
              order.orders.forEach((item, index) => {
                  console.log("Order " + (index + 1) + ": " + item.Model + ", Quantity: " + item.Quantity);
              });
              console.log("-----------------------------------------------------");
            });
          }
        }catch(error){
          console.error("Error getting order:", error);
        }
      }

      // Update an order
      async function updateOrder()
      {
        // Ask the user for the customer details
        const email = await askQuestion("Enter the email of the customer you want to update the order for: ");
        const mobile = await askQuestion("Enter the mobile number of the customer you want to update the order for: ");

        // Find the order in the database
        const resultArray = await Order.find({Email: email, Mobile: mobile});

        if(resultArray.length == 0)
        {
          console.log("Order not found");
        }
        else{
          // Ask the user for the new order details
          const newProduct = await askQuestion("Enter the new product you want to order (Model): ");
          const newQuantity = await askQuestion("Enter the new quantity: ");

          // Find the item in the database
          const foundItem3 = await Item.findOne({Model: newProduct});

          if(foundItem3 == null)
          {
            console.log("Item not found");
          }
          else{
            //log all the matching orders (customers can have multiple orders)
            for(let i = 0; i < resultArray.length; i++)
            {
              console.log("Order " + i +", Email: " + resultArray[i].Email + ", Mobile: " + resultArray[i].Mobile);
              resultArray[i].orders.forEach((item) => {
                  console.log(item.Model + ", Quantity: " + item.Quantity);
              });
              console.log("-----------------------------------------------------");
            }

            // Ask the user for the order they want to update
            var answer = await askQuestion("which order would you like to update? (Enter the order number, if there is only one order, enter 0):");
            if(answer >= resultArray.length || answer < 0)
            {
              console.log("Order not found");
              return;
            }

            // Update the order
            resultArray[answer].orders.push({Model: newProduct, Quantity: newQuantity});
            // Save the updated order to the database
            await resultArray[answer].save();
            console.log("added " + newProduct + " to the order");
        }
      }
    }

    // Delete an order
    async function deleteOrder()
    {
      // Ask the user for the customer details
      const email = await askQuestion("Enter the email of the customer you want to delete the order for: ");
      const mobile = await askQuestion("Enter the mobile number of the customer you want to delete the order for: ");

      // Find the order in the database
      const customerOrders = await Order.find({Email: email, Mobile: mobile});

      if(customerOrders.length == 0)
      {
        console.log("Order not found");
        return
      }
      else{
        //log all the matching orders (customers can have multiple orders)
          for(let i = 0; i < customerOrders.length; i++)
          {
            console.log("Order " + i +", Email: " + customerOrders[i].Email + ", Mobile: " + customerOrders[i].Mobile);
            customerOrders[i].orders.forEach((item) => {
                console.log(item.Model + ", Quantity: " + item.Quantity);
            });
            console.log("-----------------------------------------------------");
          }

          // Ask the user for the order they want to delete
          var answer = await askQuestion("which order would you like to delete? (Enter the order number, if there is only one order, enter 0):");
          if(answer >= customerOrders.length || answer < 0)
          {
            console.log("Order not found");
            return;
          }
          // Delete the order from the database
          await Order.deleteOne({ _id: customerOrders[answer]._id });
          console.log("Order deleted successfully");
        }
    }

    } finally {
      await mongoose.connection.close();
      await client.close();
      kb.close();
      console.log("Connection closed");
    }
  }

  // Function to ask a question
  async function askQuestion(question) {
    return new Promise(resolve => {
        kb.question(question, answer => {
            resolve(answer.trim());
        });
    });
}
  
  run().catch(console.error);

  //the database design has 3 collections, customers, items, and orders. Each customer has a title, first name, last name, mobile, email, home address, and shipping address. Each item has a manufacturer, model, and price. Each order has an email, mobile, and orders which is an array of the items the customer wants to order. The customer and item collections are linked to the order collection by the email and model fields respectively.

