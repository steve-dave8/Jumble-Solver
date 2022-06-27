import fetch from "node-fetch";

const rootURL = 'http://api.dictionaryapi.dev/api/v2/entries/en/'

// check if word exists in dictionary:
const lookupWord = async (word) => {
    const response = await fetch(rootURL + word);
    console.log(response.status);
};