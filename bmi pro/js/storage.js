/**
 * BMI Pro
 * LocalStorage management.
 */

const STORAGE_KEY = "bmi-pro-history";


/**
 * Retrieve calculation history.
 */

export function getHistory() {

    try {

        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) {
            return [];
        }

        const parsedData = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
            return [];
        }

        return parsedData;

    } catch (error) {

        console.error("Unable to retrieve history:", error);

        return [];

    }

}


/**
 * Save history to LocalStorage.
 */

function saveHistory(history) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
        );

        return true;

    } catch (error) {

        console.error("Unable to save history:", error);

        return false;

    }

}


/**
 * Add a new calculation.
 */

export function addHistory(result) {

    const history = getHistory();

    const record = {

        id: crypto.randomUUID(),

        date: new Date().toISOString(),

        bmi: result.bmi,

        category: result.category,

        weightKg: result.weightKg,

        heightCm: result.heightCm

    };

    history.unshift(record);

    // Keep the latest 50 records.
    const updatedHistory = history.slice(0, 50);

    if (!saveHistory(updatedHistory)) {
        throw new Error("Could not save calculation history.");
    }

    return record;

}


/**
 * Delete one record.
 */

export function deleteHistory(id) {

    const history = getHistory();

    const updatedHistory = history.filter(
        record => record.id !== id
    );

    return saveHistory(updatedHistory);

}


/**
 * Clear all records.
 */

export function clearHistory() {

    try {

        localStorage.removeItem(STORAGE_KEY);

        return true;

    } catch (error) {

        console.error("Unable to clear history:", error);

        return false;

    }

}