const { isValidJumble, solveJumble } = require('./jumbleSolver');

const jumbleForm = document.getElementById("jumbleForm");
const jumbleError = document.getElementById("jumbleError");
const jumbleResults = document.getElementById("jumbleResults");

const loadingComponent = `
    <p class="text-center">Loading...</p>
    <div class="progress w-50 mx-auto">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div> 
    </div>
`;

const renderResults = (e) => {
    e.preventDefault();
    jumbleResults.innerHTML = "";
    const jumble = e.target.elements.jumbleText.value;
    const validInput = isValidJumble(jumble);

    if (!validInput.isValid) {
        jumbleError.innerText = validInput.errMsg;
        return;
    }
    jumbleError.innerText = "";

    jumbleResults.innerHTML = loadingComponent;

    const maxWordLength = validInput.chars.length;
    const results = solveJumble(validInput.chars);
    let resultsHTML = `<div class="accordion">`;

    // TODO: map results to accordion
    
    resultsHTML += "</div>";

    jumbleResults.innerHTML = resultsHTML;
};

jumbleForm.addEventListener("submit", renderResults);