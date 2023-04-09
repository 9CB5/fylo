// Global variables
// ================================================================================================
const sliderMin = 0;
const sliderMax = 1000;
const startingValue = 500;
const thumbWidth = 0.02;

// ================================================================================================
function reCalculateGradient(value) {
    let percentage = (value / sliderMax) * 100;
    const offset = (percentage - 2) * thumbWidth;

    percentage -= offset;
    const gradient = `linear-gradient(to right, hsl(6, 100%, 80%), hsl(335, 100%, 65%) ${percentage}%, hsl(229, 57%, 11%) ${percentage}%, hsl(229, 57%, 11%)) !important`;

    const sheets = document.styleSheets[1].cssRules;

    for (const i in sheets) {
        if (sheets[i].selectorText == 'input[type="range"]::-webkit-slider-runnable-track') {
            document.styleSheets[1].deleteRule(i);

            document.styleSheets[1].insertRule(
                `input[type=range]::-webkit-slider-runnable-track {
                    background: ${gradient};
                }`
            , 0);
        }

        if (sheets[i].selectorText == 'input[type="range"]::-moz-range-track') {
            document.styleSheets[1].deleteRule(i);

            document.styleSheets[1].insertRule(
                `input[type=range]::-moz-range-track {
                    height: 1.5rem !important;
                    background: ${gradient};
                }`
            , 0);
        }
    }
}

// ================================================================================================
function updateStorageValues(value) {
    const remainingStorage = document.querySelector(".storage__used-storage");
    const usedStorage = document.querySelector(".storage__remaining-box__sentence__remaining");

    remainingStorage.innerText = sliderMin + Number(value);
    usedStorage.innerText = sliderMax - Number(value);
}

// ================================================================================================
function sliderSetup() {
    const slider = document.querySelector(".slider");

    // Listen in for slider changes
    // --------------------------------------------------------------------------------------------
    slider.addEventListener("input", (event) => {
        const userInput = event.target.value;

        reCalculateGradient(userInput);
        updateStorageValues(userInput);
    })
}

// Main method
// ================================================================================================
function main() {
    sliderSetup();
}

main();