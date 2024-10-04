const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'a.txt'); // Adjust path as necessary
const jsonFilePath = path.join(__dirname, 'data.json');

// Function to remove extra spaces from a file
function removeExtraSpaces(filePath) {
    // Read the content of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return;
        }

        // Remove extra spaces (replace multiple spaces with a single space)
        const cleanedContent = data.replace(/\s+/g, ' ').trim();
        console.log('removed spaces');
        

        // Write the cleaned content back to the same file
        writeToFile(filePath, cleanedContent);
    });
}

// Function to write cleaned content to a file
function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to the file: ${err}`);
            return;
        }
        console.log('Write file success');
    });
}

// removeExtraSpaces(filePath);
// writeToFile(filePath," han v                  iddan ")

// Function to write data to a JSON file
function writeJsonFile(filePath, data) {
    
    // Convert data to JSON format
    const jsonData = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces indentation

    // Write JSON data to file
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error(`Error writing to JSON file: ${err}`);
            return;
        }
        console.log('JSON file created successfully.');
    });
}

// Function to read data from a JSON file
function readJsonFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the JSON file: ${err}`);
            return;
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);
        console.log('Data read from JSON file:', jsonData);
    });
}

// Specify the path to your JSON file (data.json in the current directory)


// Example data to write to the JSON file
const exampleData = {
    name: "Raman",
    age: 30,
    city: "New York",
    hobbies: ["reading", "gaming", "traveling"]
};

// Write the example data to the JSON file
writeJsonFile(jsonFilePath, exampleData);

// Read the data back from the JSON file
readJsonFile(jsonFilePath);