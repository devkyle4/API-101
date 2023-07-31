const mongoose = require("mongoose");
const charactersModel = require("../model/charactersModel");
const jsonData = require("./dc_comics.json");

async function checkAndSaveData(data) {
  try {
    // Check if the data exists based on the 'name' field
    const existingHero = await charactersModel.findOne({ name: data.name });

    if (!existingHero) {
      // If the data doesn't exist, save it to the database
      await charactersModel.create(data);
    } else {
      
      // If the data already exists, log a message or handle it accordingly
      console.log("Hero data already exists:", existingHero.name);
    }
  } catch (error) {
    console.error("Error checking and saving data:", error);
  }
}


async function saveData() {
  try {
    mongoose.connect(
      "mongodb+srv://devkyle4:DC_API@cluster0.fv9xhpc.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB database!!");

    // Loop through each hero in the jsonData array and check/save the data
    for (const charData of jsonData) {
      await checkAndSaveData(charData);
    }

    // Close the MongoDB connection after all data is processed
    mongoose.connection.close();
    console.log("Connection to MongoDB closed.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Call the saveData function to start the data insertion process
saveData();

