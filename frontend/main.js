const { isValidJumble, solveJumble } = require('./jumbleSolver');

const jumbleForm = document.getElementById("jumbleForm");
const jumbleError = document.getElementById("jumbleError");
const jumbleResults = document.getElementById("jumbleResults");

const loadingComponent = `
    <p class="text-center">Loading...</p>
    <div class="progress w-50 mx-auto">
        <div class="progress-bar progress-bar-striped bg-primary w-100" role="progressbar"></div> 
    </div>
`;

const noResultsComponent = `<p class="text-center text-danger text-decoration-underline fs-4 mb-0 fw-bold">No Results Found</p>`;

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

    // allow loading component to render by setting timeout:
    setTimeout(() => {
        const maxWordLength = validInput.chars.length;
        const results = solveJumble(validInput.chars);
        let resultsHTML = `<div class="accordion">`;

        let panelOpen = true;
        let hasResults = false;

        for (let i = maxWordLength; i >= 2; i--) {
            if (results[i].length) {
                let section = `
                    <section class="accordion-item mb-1">
                        <h2 id="regularHeading${i}" class="accordion-header">
                            <button class="accordion-button text-light bg-primary fs-4 ${panelOpen ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapse${i}" aria-expanded="${panelOpen}" aria-controls="regularCollapse${i}">
                                ${i}-Letter Words
                            </button>
                        </h2>
                        <div id="regularCollapse${i}" class="accordion-collapse collapse ${panelOpen ? 'show' : ''}" aria-labelledby="regularHeading${i}">
                            <div class="accordion-body word-list m-2">
                `;

                const wordList = results[i].map(word => `<div class="text-center bg-info fw-bold rounded-pill px-2 pb-1">${word}</div>`);
                section += wordList.join("");
                section += "</div></div></section>";
                resultsHTML += section;

                hasResults = true;
                panelOpen = false;
            }
        }

        if (!hasResults) {
            resultsHTML = noResultsComponent;
        } else {
            resultsHTML += "</div>";
        }

        jumbleResults.innerHTML = resultsHTML;
    }, 0);
};

jumbleForm.addEventListener("submit", renderResults);