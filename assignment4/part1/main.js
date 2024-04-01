/*
	Name: Milan Patel
	File: Part-1
	Date: 2024-03-25
	Description: JavaScript file.
*/

// Get references to DOM elements
var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

// Function to return a random value from an array
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Story template and placeholders
var storyText = "It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
var insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var insertY = ["the soup kitchen", "Disneyland", "the White House"];
var insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Event listener for randomize button
randomize.addEventListener('click', result);

// Function to generate and display the random story
function result() {
    var newStory = storyText;
    var xItem = randomValueFromArray(insertX);
    var yItem = randomValueFromArray(insertY);
    var zItem = randomValueFromArray(insertZ);
    
    // Replace placeholders with random values
    newStory = newStory.replace(/:insertx:/g, xItem);
    newStory = newStory.replace(/:inserty:/g, yItem);
    newStory = newStory.replace(/:insertz:/g, zItem);
    
    // Replace custom name if provided
    if(customName.value != '') {
        var name = customName.value;
        newStory = newStory.replace(/Bob/g, name); // Replace all occurrences of "Bob"
    }

    // Convert temperature and weight for UK
    if(document.getElementById("uk").checked) {
        var weight = Math.round(300 * 0.0714286) + ' stone';
        var temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
        newStory = newStory.replace('94 farenheit', temperature);
        newStory = newStory.replace('300 pounds', weight);
    }

    // Display the generated story
    story.textContent = newStory;
    story.style.visibility = 'visible';
}
