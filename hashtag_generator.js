// Author: Evan Fisher-Perez
// File: hashtag_generator.js
// Description: Take user input and output a hashtag

// import readline module
const readline = require("readline");

// takes the array of words and capitalizes the first letter if the word is not a number
function capitalize(array) {
  return array.map((word) => {
    if (isNaN(word)) {
      const start = word.charAt(0).toUpperCase()
      const remainderOfWord = word.slice(1)
      return start + remainderOfWord
    }else {
      return word
    }
  })
}

async function hashtagGenerator() {

  // create interface for input and output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // question user to enter strings or integers
  // this needs to be an awaited promise so we can take the output of rl.question and return it
  // output will either be false if an error was reached or the hashtag
  const output = await new Promise((res) => {
    rl.question('Input String to Become Hashtag: ',(input) => {

      // split separated by whitespace character
      // filter removes blank strings to deal with leading spaces or empty string
      const inputArray = input.split(/\s+/).filter(string => !!string)
 
      // if empty string, print error message and return false
      if (inputArray.length === 0) {
        rl.close()

        // in a real application could throw an error stating that empty strings are not allowed
        return res(false)
      }
 
      const formattedArray = capitalize(inputArray)
      const str = "#" + formattedArray.join('')
 
      // if the string is longer than 140 chars return false
      if (str.length > 140) {
        rl.close()

        // in a real application could throw an error stating the maximum char limit
        return res(false)
      }
      rl.close()
      res(str)
    });  
  })
  return output
}


// the function to generate a hashtag is ran and the output is printed
// needs a .then because it is an async function with an awaited promise
hashtagGenerator().then((output) => console.log(output))
