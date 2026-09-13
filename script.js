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
        return;
    }


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
    }
);


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