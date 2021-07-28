const path = require("path")
const natural = require("natural");
const { WordTokenizer } = natural;
const fs = require("fs");
const { Console } = require("console");

//THE MAIN SENTIMENT ANALYZER FUNCTION

const analyze = (string) => {
  let negativeWords, positiveWords;
  let negCount = 0;
  let posCount = 0;

  //Firstly, we create a function that reads the two files with positive and negative words, then parse the and put into arrays with .split()

  const getWords = () => {
    negativeWords = fs.readFileSync(
     path.resolve(__dirname, "../dist/negative-words.txt"),
      "utf-8"
    );
    negativeWords = negativeWords.split("\n");
    positiveWords = fs.readFileSync(
      path.resolve(__dirname, "../dist/positive-words.txt"),
      "utf-8"
    );
    positiveWords = positiveWords.split("\n");
  };

  //Then we filter the string, by making it lower case and excluding all characters but letters

  const filterString = () => {
    string = string.toLowerCase().replace(/[^a-zA-Z\s]+/g, "");
  };

  //Then we tokenize and parse the string

  const tokenizeAndParseString = () => {
    let tokenizedArr = string.split(" ");
    let posCount = 0;
    let negCount = 0;

    //Function that iterates through an array of words

    const mapThruArr = (list) => {
      let count = 0;
      let result;

      //Iterate through the string
      //If a stem of a word in the tokenizedArr is found in the list of stems of negative/positive words
      //we increment to the count, which we will lter use to calculate the amount of positive/negative words

      result = tokenizedArr.map((token) => {
        list.map((word) => {
          if (
            // I used natural's PorterStemmer to get stems of words
            natural.PorterStemmer.stem(token) ==
            natural.PorterStemmer.stem(word)
          ) {
            count += 1;
          }
        });

        return count;
      });

      //And then we return the last value of the array which is the count

      return result.slice(-1)[0];
    };

    //We call this function for both lists of words

    negCount = mapThruArr(negativeWords);
    posCount = mapThruArr(positiveWords);

    //And return the final values
    return [posCount, negCount];
  };

  //Here we simply count what group of words is predominant nd return the value (0 - neutral, -1 - negative, 1 - positive)

  const makeAnalysis = (posC, negC) => {
    let result = posC > negC ? 1 : negC > posC ? -1 : 0;
    return result;
  };

  //A simple function controller, where I invoke all the functions

  const functionController = () => {
    getWords();
    filterString();
    [negCount, posCount] = tokenizeAndParseString();
    let res = makeAnalysis(negCount, posCount);
    return res;
  };

  //Call the controller and store the value it returns in the variable
  let res = functionController();

  // Return it and voila
  return res;
};

//Export it so I can use it in index.js
module.exports = {analyze}