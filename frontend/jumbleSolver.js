const words = require('./words');

const factorial = (num) => {
    let result = 1;
    let x = parseInt(num); 
    while (x > 1) {
        result *= x;
        x--;
    };
    return result;
};

const isValidJumble = (jumble) => {
    const result = {errMsg: '', isValid: true, chars: []};

    const text = jumble.trim().toLowerCase();

    // get alphabetical characters from provided jumble string:
    for (const c of text) {
        if (c.match(/[a-z]/)) result.chars.push(c);
    }

    if (result.chars.length < 2) {
        result.errMsg = 'Error: input must contain at least 2 alphabetical characters.';
        result.isValid = false;
    }
    if (result.chars.length > 7) {
        // beyond 7 characters, the function takes more than exponentially longer to run
        result.errMsg = 'Error: input cannot contain more than 7 alphabetical characters.';
        result.isValid = false;
    }

    return result;
};

const solveJumble = (chars) => {
    const maxWordLength = chars.length;
    let totalOptions = []; // an array of unique character arrangements
    let sortedWordList = {} // an object that groups words together by character length in alphabetical order

    // set keys for sorted word list:
    for (let i = maxWordLength; i > 1; i--) {
        sortedWordList[`${i}`] = [];
    }

    // recursive function to get all arrangements of a string and its substrings:
    const solveSubJumble = (arrayChars) => {
        const length = arrayChars.length;

        arrayChars.map((c, i) => {
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
                }                  
                
                if (remLength > 1) {
                    for (let x = 0; x < remLength; x++) {
                        let nestCopy = [...charList]; // make copy so as not to mutate the original list
                        nestCopy.splice(x, 1); // remove one character
                        getNextChar(nestCopy, nestedSet[x]); // repeat with reduced character list to get next character
                    }
                } 
                else {
                    finalOptionSet.push(nestedSet[0][0]);
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

    return sortedWordList;
};

module.exports = { isValidJumble, solveJumble }