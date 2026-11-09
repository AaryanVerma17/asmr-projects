/**
 * BMI Pro
 * Main application controller.
 */

import {
    calculateBMI,
    imperialToMetric
} from "./bmi.js";

import {
    getHistory,
    addHistory,
    deleteHistory,
    clearHistory
} from "./storage.js";


/* ================================
   DOM ELEMENTS
================================ */

const form = document.getElementById("bmi-form");

const metricInputs = document.getElementById("metric-inputs");

const imperialInputs = document.getElementById("imperial-inputs");

const unitButtons = document.querySelectorAll(".unit-button");

const errorMessage = document.getElementById("error-message");

const resultPlaceholder = document.getElementById("result-placeholder");

const resultContent = document.getElementById("result-content");

const bmiValue = document.getElementById("bmi-value");

const bmiCategory = document.getElementById("bmi-category");

const resultDescription = document.getElementById("result-description");

const resultStatus = document.getElementById("result-status");

const gaugeIndicator = document.getElementById("gauge-indicator");

const healthyRange = document.getElementById("healthy-range");

const weightDifference = document.getElementById("weight-difference");

const saveButton = document.getElementById("save-button");

const resetButton = document.getElementById("reset-button");

const historyBody = document.getElementById("history-body");

const historyEmpty = document.getElementById("history-empty");

const historyTable = document.getElementById("history-table-wrapper");

const clearHistoryButton = document.getElementById("clear-history-button");


/* ================================
   APPLICATION STATE
================================ */

let currentUnit = "metric";

let currentResult = null;

let currentResultSaved = false;


/* ================================
   UNIT SELECTION
================================ */

unitButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedUnit = button.dataset.unit;

        if (selectedUnit === currentUnit) {
            return;
        }

        currentUnit = selectedUnit;

        unitButtons.forEach(item => {

            const active = item === button;

            item.classList.toggle("active", active);

            item.setAttribute("aria-pressed", String(active));

        });

        metricInputs.hidden = currentUnit !== "metric";

        imperialInputs.hidden = currentUnit !== "imperial";

        resetResults();

    });

});


/* ================================
   INPUT READING
================================ */

function getMeasurements() {

    if (currentUnit === "metric") {

        const weight = Number(
            document.getElementById("weight-kg").value
        );

        const height = Number(
            document.getElementById("height-cm").value
        );

        return {
            weightKg: weight,
            heightCm: height
        };

    }

    const weightLbs = Number(
        document.getElementById("weight-lbs").value
    );

    const heightFt = Number(
        document.getElementById("height-ft").value
    );

    const heightInValue =
        document.getElementById("height-in").value;

    const heightIn = heightInValue === ""
        ? 0
        : Number(heightInValue);

    return imperialToMetric(
        weightLbs,
        heightFt,
        heightIn
    );

}


/* ================================
   BMI FORM SUBMISSION
================================ */

form.addEventListener("submit", event => {

    event.preventDefault();

    errorMessage.textContent = "";

    try {

        const measurements = getMeasurements();

        const result = calculateBMI(
            measurements.weightKg,
            measurements.heightCm
        );

        currentResult = result;

        currentResultSaved = false;

        renderResult(result);

    } catch (error) {

        errorMessage.textContent = error.message;

    }

});


/* ================================
   RENDER RESULTS
================================ */

function renderResult(result) {

    resultPlaceholder.hidden = true;

    resultContent.hidden = false;

    bmiValue.textContent = result.bmi.toFixed(2);

    bmiCategory.textContent = result.category;

    resultDescription.textContent = result.description;

    resultStatus.textContent = "Calculated";

    healthyRange.textContent =
        `${result.healthyRange.min} – ${result.healthyRange.max} kg`;

    if (result.weightDifference.direction === "within") {

        weightDifference.textContent = "Within range";

    } else {

        weightDifference.textContent =
            `${result.weightDifference.value.toFixed(2)} kg ${
                result.weightDifference.direction
            }`;

    }

    applyCategoryColor(result.category);

    updateGauge(result.bmi);

    saveButton.disabled = false;

    saveButton.textContent = "Save this calculation";

}


/* ================================
   CATEGORY COLOR
================================ */

function applyCategoryColor(category) {

    const colors = {

        "Underweight": "#63a6ff",

        "Normal weight": "#42d6a4",

        "Overweight": "#f5c45e",

        "Obesity Class I": "#ff9b65",

        "Obesity Class II": "#ff806f",

        "Obesity Class III": "#ff6685"

    };

    const color = colors[category];

    bmiCategory.style.color = color;

    bmiCategory.style.backgroundColor = `${color}20`;

    resultStatus.style.color = color;

}


/* ================================
   GAUGE POSITION
================================ */

function updateGauge(bmi) {

    /*
       Visual scale:
       BMI 10 to BMI 50.

       The scale is a visualization, not a
       clinical measurement scale.
    */

    const minBMI = 10;

    const maxBMI = 50;

    const percentage =
        ((bmi - minBMI) / (maxBMI - minBMI)) * 100;

    const position = Math.max(
        0,
        Math.min(100, percentage)
    );

    gaugeIndicator.style.left = `${position}%`;

}


/* ================================
   SAVE CALCULATION
================================ */

saveButton.addEventListener("click", () => {

    if (!currentResult || currentResultSaved) {
        return;
    }

    try {

        addHistory(currentResult);

        currentResultSaved = true;

        saveButton.textContent = "✓ Saved successfully";

        saveButton.disabled = true;

        renderHistory();

    } catch (error) {

        errorMessage.textContent = error.message;

    }

});


/* ================================
   HISTORY RENDERING
================================ */

function renderHistory() {

    const history = getHistory();

    historyBody.replaceChildren();

    historyEmpty.hidden = history.length > 0;

    historyTable.hidden = history.length === 0;

    history.forEach(record => {

        const row = document.createElement("tr");

        const dateCell = document.createElement("td");

        const bmiCell = document.createElement("td");

        const categoryCell = document.createElement("td");

        const weightCell = document.createElement("td");

        const actionCell = document.createElement("td");

        dateCell.textContent = new Date(
            record.date
        ).toLocaleString();

        bmiCell.textContent = Number(record.bmi).toFixed(2);

        const categoryLabel = document.createElement("span");

        categoryLabel.className = "history-category";

        categoryLabel.textContent = record.category;

        categoryCell.appendChild(categoryLabel);

        weightCell.textContent =
            `${Number(record.weightKg).toFixed(2)} kg`;

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-record";

        deleteButton.textContent = "Delete";

        deleteButton.type = "button";

        deleteButton.setAttribute(
            "aria-label",
            `Delete calculation from ${dateCell.textContent}`
        );

        deleteButton.addEventListener("click", () => {

            deleteHistory(record.id);

            renderHistory();

        });

        actionCell.appendChild(deleteButton);

        row.append(
            dateCell,
            bmiCell,
            categoryCell,
            weightCell,
            actionCell
        );

        historyBody.appendChild(row);

    });

}


/* ================================
   CLEAR HISTORY
================================ */

clearHistoryButton.addEventListener("click", () => {

    const history = getHistory();

    if (history.length === 0) {
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to delete all calculation history?"
    );

    if (!confirmed) {
        return;
    }

    if (clearHistory()) {
        renderHistory();
    }

});


/* ================================
   RESET RESULTS
================================ */

function resetResults() {

    currentResult = null;

    currentResultSaved = false;

    resultPlaceholder.hidden = false;

    resultContent.hidden = true;

    resultStatus.textContent = "Awaiting input";

    errorMessage.textContent = "";

    gaugeIndicator.style.left = "0%";

}


/* ================================
   RESET FORM
================================ */

resetButton.addEventListener("click", () => {

    resetResults();

    form.reset();

    errorMessage.textContent = "";

});

form.addEventListener("reset", () => {

    resetResults();

});


/* ================================
   INITIALIZE APP
================================ */

function initializeApp() {

    renderHistory();

    metricInputs.hidden = false;

    imperialInputs.hidden = true;

    console.log("BMI Pro initialized successfully.");

}

initializeApp();