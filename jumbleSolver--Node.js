var checkWord = require('check-word');
var prompt = require('prompt');
// const { performance } = require('perf_hooks');

const factorial = (num) => {
    let result = 1;
    let x = parseInt(num); 
    while (x > 1) {
      result *= x;
      x--;
    };
    return result;
};


let availableDict = true;
const tag = 'en';
let words;

try {
    words = checkWord(tag); // setup the language for check
} catch (error) {
    availableDict = false;
}


const solveJumble = async () => {
    if (!availableDict) {
        console.log(`Error: dictionary not available for language tag '${tag}'`);
        return;
    }

    console.log('Enter a word jumble: ');
    prompt.start();
    const { jumble } = await prompt.get(['jumble']);

    const text = jumble.trim().toLowerCase();

    if (!/^[a-z]+$/.test(text)) {
        console.log('Notice: non-alphabetical characters will be ignored.');
    }
    
    // get alphabetical characters from provided jumble string:
    let chars = [];
    for (const c of text) {
        if (c.match(/[a-z]/)) chars.push(c);
    }
    
    if (chars.length < 2) {
        console.log('Error: input must contain at least 2 alphabetical characters.');
        return;
    }
    if (chars.length > 7) {
        // beyond 7 characters, the function takes more than exponentially longer to run
        console.log('Error: input cannot contain more than 7 alphabetical characters.');
        return;
    }
    
    const maxWordLength = chars.length;
    let totalOptions = []; // an array of unique character arrangements
    let sortedWordList = {} // an object that groups words together by character length in alphabetical order

    // const time1 = performance.now();

    // set keys for sorted word list:
    for (let i = maxWordLength; i > 1; i--) {
        sortedWordList[`${i}`] = [];
    }

    let uniqueCharSets = [];

    // recursive function to get all arrangements of a string and its substrings:
    const solveSubJumble = (arrayChars) => {
        const charList = [...arrayChars];
        charList.sort();
        const unique = charList.join("");   
        // improve performance for jumbles with duplicate letters:
        if (!uniqueCharSets.includes(unique)) {
            uniqueCharSets.push(unique);
        } else {
            return;
        }

        const length = arrayChars.length;

        arrayChars.forEach((c, i) => {
            let optionSet = [];
            const numOptions = factorial(length - 1);

            for (let x = 0; x < numOptions; x++) {
                optionSet.push(c);
            }

            let copy = [...arrayChars];
            copy.splice(i, 1);

            // will be an array of strings with each string having a length between 2 and maxWordLength:
            let finalOptionSet = [];

            const getNextChar = (charList, opSet) => {
                const remLength = charList.length;
                let nestedSet = [];
                const subOptions = factorial(remLength - 1);
                let start = 0;
                let end = subOptions;
    
                for (let x = 0; x < remLength; x++) {
                    nestedSet.push(opSet.slice(start, end));
                    start += subOptions;
                    end += subOptions;
    
                    for (let y = 0; y < nestedSet[x].length; y++) {
                        nestedSet[x][y] += charList[x];
                    }

                    if (remLength > 1) {
                        let nestCopy = [...charList]; // make copy so as not to mutate the original list
                        nestCopy.splice(x, 1); // remove one character
                        getNextChar(nestCopy, nestedSet[x]); // repeat with reduced character list to get next character
                    }
                    else {
                        const potentialWord = nestedSet[0][0];
                        // English words typically do not consist of only consonants
                        if (!potentialWord.match(/\b[^aeiouy]+\b/g)) {
                            finalOptionSet.push(potentialWord);
                        }
                    }
                }
            };

            getNextChar(copy, optionSet);

            finalOptionSet.forEach(option => {
                if (!totalOptions.includes(option)) {
                    totalOptions.push(option);
                }
            });

            if (copy.length > 1) solveSubJumble(copy);
        });  
    };

    solveSubJumble(chars);

    let wordList = []; // container for valid word options

    totalOptions.forEach(option => {
        if (words.check(option)) wordList.push(option);
    });

    wordList.sort();

    wordList.forEach(word => {
        sortedWordList[`${word.length}`].push(word);
    });

    console.log('Solutions:');
    console.log(sortedWordList);

    // const time2 = performance.now();
    // const runTime = ((time2 - time1)/1000).toFixed(2);
    // console.log(`Solved in ${runTime} seconds`);
};


solveJumble();