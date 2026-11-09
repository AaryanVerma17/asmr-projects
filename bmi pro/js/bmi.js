/**
 * BMI Pro
 * Core BMI calculation module.
 *
 * Supports:
 * - Metric calculations
 * - Imperial calculations
 * - BMI classification
 * - Healthy weight range
 * - Weight difference
 */

export const BMI_CATEGORIES = [
    {
        name: "Underweight",
        min: 0,
        max: 18.5,
        description:
            "Your BMI is below the standard healthy-weight range."
    },
    {
        name: "Normal weight",
        min: 18.5,
        max: 25,
        description:
            "Your BMI falls within the standard healthy-weight range."
    },
    {
        name: "Overweight",
        min: 25,
        max: 30,
        description:
            "Your BMI is above the standard healthy-weight range."
    },
    {
        name: "Obesity Class I",
        min: 30,
        max: 35,
        description:
            "Your BMI falls within Obesity Class I."
    },
    {
        name: "Obesity Class II",
        min: 35,
        max: 40,
        description:
            "Your BMI falls within Obesity Class II."
    },
    {
        name: "Obesity Class III",
        min: 40,
        max: Infinity,
        description:
            "Your BMI falls within Obesity Class III."
    }
];


/**
 * Validates measurement values.
 */

function validateMeasurements(weightKg, heightCm) {

    if (!Number.isFinite(weightKg) ||
        !Number.isFinite(heightCm)) {
        throw new Error("Please enter valid numerical measurements.");
    }

    if (weightKg <= 0 || heightCm <= 0) {
        throw new Error("Weight and height must be greater than zero.");
    }

    if (weightKg > 500) {
        throw new Error("Weight exceeds the supported limit.");
    }

    if (heightCm < 50 || heightCm > 300) {
        throw new Error("Height must be between 50 cm and 300 cm.");
    }

}


/**
 * Convert imperial measurements to metric.
 */

export function imperialToMetric(weightLbs, heightFt, heightIn) {

    if (
        !Number.isFinite(weightLbs) ||
        !Number.isFinite(heightFt) ||
        !Number.isFinite(heightIn)
    ) {
        throw new Error("Please enter valid imperial measurements.");
    }

    if (weightLbs <= 0 || heightFt < 0 || heightIn < 0) {
        throw new Error("Measurements cannot be negative or zero.");
    }

    if (heightFt > 8 || heightIn >= 12) {
        throw new Error("Please enter a valid height.");
    }

    const totalInches = heightFt * 12 + heightIn;

    if (totalInches <= 0 || totalInches > 118.11) {
        throw new Error("Height must be between 50 cm and 300 cm.");
    }

    if (weightLbs > 1100) {
        throw new Error("Weight exceeds the supported limit.");
    }

    const weightKg = weightLbs * 0.45359237;

    const heightCm = totalInches * 2.54;

    return {
        weightKg,
        heightCm
    };

}


/**
 * Determine BMI category.
 */

export function getBMICategory(bmi) {

    if (!Number.isFinite(bmi) || bmi <= 0) {
        throw new Error("BMI must be a positive number.");
    }

    return BMI_CATEGORIES.find(category =>
        bmi >= category.min && bmi < category.max
    );

}


/**
 * Calculate healthy weight range.
 *
 * Standard adult reference:
 * BMI 18.5 to below 25.
 */

export function getHealthyWeightRange(heightCm) {

    if (
        !Number.isFinite(heightCm) ||
        heightCm < 50 ||
        heightCm > 300
    ) {
        throw new Error("Invalid height.");
    }

    const heightMeters = heightCm / 100;

    return {
        min: 18.5 * heightMeters * heightMeters,
        max: 25 * heightMeters * heightMeters
    };

}


/**
 * Calculate BMI from metric measurements.
 */

export function calculateBMI(weightKg, heightCm) {

    validateMeasurements(weightKg, heightCm);

    const heightMeters = heightCm / 100;

    const bmi = weightKg / (heightMeters * heightMeters);

    const category = getBMICategory(bmi);

    const healthyRange = getHealthyWeightRange(heightCm);

    let weightDifference;

    if (weightKg < healthyRange.min) {

        weightDifference = {
            value: healthyRange.min - weightKg,
            direction: "below",
            message: "Below lower reference boundary"
        };

    } else if (weightKg >= healthyRange.max) {

        weightDifference = {
            value: weightKg - healthyRange.max,
            direction: "above",
            message: "Above upper reference boundary"
        };

    } else {

        weightDifference = {
            value: 0,
            direction: "within",
            message: "Within reference range"
        };

    }

    return {

        bmi: Number(bmi.toFixed(2)),

        category: category.name,

        description: category.description,

        weightKg: Number(weightKg.toFixed(2)),

        heightCm: Number(heightCm.toFixed(2)),

        healthyRange: {
            min: Number(healthyRange.min.toFixed(2)),
            max: Number(healthyRange.max.toFixed(2))
        },

        weightDifference: {
            value: Number(weightDifference.value.toFixed(2)),
            direction: weightDifference.direction,
            message: weightDifference.message
        }

    };

}