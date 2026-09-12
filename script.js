const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const swapButton = document.getElementById("swapButton");

const convertedAmount = document.getElementById("convertedAmount");
const exchangeRate = document.getElementById("exchangeRate");
const errorMessage = document.getElementById("errorMessage");
const converterCard = document.querySelector(".converter-card");


// Format currency
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2
    }).format(amount);
}


// Convert currency
async function convertCurrency() {

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    errorMessage.textContent = "";


    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        convertedAmount.textContent = "--";
        exchangeRate.textContent = "Please enter a valid amount.";
        return;
    }


    // If same currency
    if (from === to) {

        convertedAmount.textContent =
            formatCurrency(amount, to);

        exchangeRate.textContent =
            "1 " + from + " = 1 " + to;

        return;
    }


    convertButton.textContent = "Converting...";
    converterCard.classList.add("loading");


    try {

        // API request
        const url =
            "https://api.frankfurter.app/latest?from="
            + from
            + "&to="
            + to;

        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("API Error");
        }


        const data = await response.json();


        // Get exchange rate
        const rate = data.rates[to];


        if (!rate) {
            throw new Error("Exchange rate not found");
        }


        // Calculate converted amount
        const converted = amount * rate;


        // Show result
        convertedAmount.textContent =
            formatCurrency(converted, to);


        exchangeRate.textContent =
            "1 " + from + " = " + rate.toFixed(4) + " " + to;


    } catch (error) {

        console.log(error);

        convertedAmount.textContent = "--";

        exchangeRate.textContent = "";

        errorMessage.textContent =
            "Unable to get exchange rate. Please check your internet connection.";

    }


    convertButton.textContent = "Convert Currency";
    converterCard.classList.remove("loading");
}


// Convert button
convertButton.addEventListener(
    "click",
    convertCurrency
);


// Amount change
amountInput.addEventListener(
    "input",
    function () {

        clearTimeout(window.amountTimer);

        window.amountTimer = setTimeout(
            convertCurrency,
            300
        );
    }
);


// From currency change
fromCurrency.addEventListener(
    "change",
    convertCurrency
);


// To currency change
toCurrency.addEventListener(
    "change",
    convertCurrency
);


// Swap currencies
swapButton.addEventListener(
    "click",
    function () {

        const oldFrom = fromCurrency.value;

        fromCurrency.value =
            toCurrency.value;

        toCurrency.value =
            oldFrom;

        convertCurrency();
    }
);


// Enter key
amountInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            convertCurrency();
        }

    }
);


// Run when page opens
convertCurrency();