import test from "node:test";

import assert from "node:assert/strict";

import {
    calculateBMI,
    getBMICategory,
    getHealthyWeightRange,
    imperialToMetric
} from "../js/bmi.js";


/* ================================
   BMI CALCULATION TESTS
================================ */

test("Calculate BMI correctly using metric values", () => {

    const result = calculateBMI(70, 175);

    assert.equal(result.bmi, 22.86);

    assert.equal(result.category, "Normal weight");

});


test("Calculate BMI for underweight category", () => {

    const result = calculateBMI(45, 175);

    assert.equal(result.category, "Underweight");

});


test("Calculate BMI for overweight category", () => {

    const result = calculateBMI(85, 175);

    assert.equal(result.category, "Overweight");

});


test("Calculate BMI for obesity class I", () => {

    const result = calculateBMI(100, 175);

    assert.equal(result.category, "Obesity Class I");

});


test("Calculate BMI for obesity class II", () => {

    const result = calculateBMI(110, 175);

    assert.equal(result.category, "Obesity Class II");

});


test("Calculate BMI for obesity class III", () => {

    const result = calculateBMI(130, 175);

    assert.equal(result.category, "Obesity Class III");

});


/* ================================
   VALIDATION TESTS
================================ */

test("Reject zero weight", () => {

    assert.throws(
        () => calculateBMI(0, 175),
        /greater than zero/
    );

});


test("Reject negative height", () => {

    assert.throws(
        () => calculateBMI(70, -175),
        /greater than zero/
    );

});


test("Reject unrealistic height", () => {

    assert.throws(
        () => calculateBMI(70, 400),
        /between 50 cm and 300 cm/
    );

});


/* ================================
   CATEGORY BOUNDARY TESTS
================================ */

test("BMI 18.5 should be normal weight", () => {

    assert.equal(
        getBMICategory(18.5).name,
        "Normal weight"
    );

});


test("BMI 25 should be overweight", () => {

    assert.equal(
        getBMICategory(25).name,
        "Overweight"
    );

});


test("BMI 30 should be obesity class I", () => {

    assert.equal(
        getBMICategory(30).name,
        "Obesity Class I"
    );

});


/* ================================
   HEALTHY RANGE TESTS
================================ */

test("Calculate healthy weight range", () => {

    const result = getHealthyWeightRange(175);

    assert.equal(
        Number(result.min.toFixed(2)),
        56.66
    );

    assert.equal(
        Number(result.max.toFixed(2)),
        76.56
    );

});


/* ================================
   IMPERIAL CONVERSION TESTS
================================ */

test("Convert imperial measurements to metric", () => {

    const result = imperialToMetric(154, 5, 9);

    assert.ok(
        Math.abs(result.weightKg - 69.853) < 0.01
    );

    assert.equal(result.heightCm, 175.26);

});