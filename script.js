<<<<<<< HEAD
const taskList = document.getElementById("taskList");
const resetButton = document.getElementById("resetButton");


// Store original order
const originalOrder = Array.from(
    taskList.children
).map(item => item.querySelector(".task-text").textContent);


// Get all draggable items
let draggedItem = null;


// ==============================
// DRAG START
// ==============================

function dragStart(event) {

    draggedItem = this;

    this.classList.add("dragging");

    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData(
        "text/plain",
        this.querySelector(".task-text").textContent
    );
}


// ==============================
// DRAG END
// ==============================

function dragEnd() {

    this.classList.remove("dragging");

    document.querySelectorAll(".task-item").forEach(item => {
        item.classList.remove("drag-over");
    });

    draggedItem = null;

    updateNumbers();
}


// ==============================
// DRAG OVER
// ==============================

function dragOver(event) {

    event.preventDefault();

    if (this === draggedItem) {
        return;
    }

    this.classList.add("drag-over");
}


// ==============================
// DRAG LEAVE
// ==============================

function dragLeave() {

    this.classList.remove("drag-over");
}


// ==============================
// DROP
// ==============================

function drop(event) {

    event.preventDefault();

    this.classList.remove("drag-over");

    if (!draggedItem || this === draggedItem) {
=======
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
>>>>>>> 770a5a7a6ff74cc697bd2015bb4fa323f0fd2769
        return;
    }


<<<<<<< HEAD
    const allItems = [
        ...taskList.querySelectorAll(".task-item")
    ];

    const draggedIndex =
        allItems.indexOf(draggedItem);

    const targetIndex =
        allItems.indexOf(this);


    if (draggedIndex < targetIndex) {

        taskList.insertBefore(
            draggedItem,
            this.nextSibling
        );

    } else {

        taskList.insertBefore(
            draggedItem,
            this
        );
    }


    updateNumbers();
}


// ==============================
// UPDATE NUMBERS
// ==============================

function updateNumbers() {

    const items =
        taskList.querySelectorAll(".task-item");


    items.forEach((item, index) => {

        const number =
            item.querySelector(".task-number");

        number.textContent =
            String(index + 1).padStart(2, "0");
    });
}


// ==============================
// RESET LIST
// ==============================

resetButton.addEventListener(
    "click",
    function () {

        const items =
            [...taskList.querySelectorAll(".task-item")];


        originalOrder.forEach(taskName => {

            const item =
                items.find(item =>
                    item.querySelector(".task-text")
                        .textContent === taskName
                );


            if (item) {
                taskList.appendChild(item);
            }
        });


        updateNumbers();
=======
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
>>>>>>> 770a5a7a6ff74cc697bd2015bb4fa323f0fd2769
    }
);


<<<<<<< HEAD
// ==============================
// ADD DRAG EVENTS
// ==============================

function addDragEvents() {

    const items =
        taskList.querySelectorAll(".task-item");


    items.forEach(item => {

        item.addEventListener(
            "dragstart",
            dragStart
        );

        item.addEventListener(
            "dragend",
            dragEnd
        );

        item.addEventListener(
            "dragover",
            dragOver
        );

        item.addEventListener(
            "dragleave",
            dragLeave
        );

        item.addEventListener(
            "drop",
            drop
        );
    });
}


// Start application
addDragEvents();

updateNumbers();
=======
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
>>>>>>> 770a5a7a6ff74cc697bd2015bb4fa323f0fd2769
