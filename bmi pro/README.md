# BMI Pro — Smart Health & Wellness Calculator

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-5-orange)
![CSS3](https://img.shields.io/badge/CSS3-3-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Dependencies](https://img.shields.io/badge/Dependencies-None-success)

**BMI Pro** is a modern, responsive Body Mass Index calculator designed to help users calculate their BMI, understand their weight classification, and explore useful health reference information.

Built entirely using Vanilla JavaScript, HTML5 and CSS3, the application offers an interactive dashboard without requiring any external frameworks or libraries.

## Features

### 1. Multiple Measurement Systems
- Metric: Kilograms and centimeters.
- Imperial: Pounds, feet and inches.
- Automatic conversion to metric measurements for consistent calculations.

### 2. BMI Calculation Engine
- Accurate BMI calculation.
- Adult BMI classification.
- Input validation.
- Boundary-condition handling.

### 3. BMI Classification

| Category | BMI |
|---|---:|
| Underweight | Below 18.5 |
| Normal weight | 18.5–24.9 |
| Overweight | 25–29.9 |
| Obesity Class I | 30–34.9 |
| Obesity Class II | 35–39.9 |
| Obesity Class III | 40 or above |

### 4. Interactive BMI Dashboard
- Large BMI result display.
- Animated BMI indicator.
- Category-based color coding.
- Personalized calculation outputs.

### 5. Health Reference Insights
- Estimated healthy adult weight range.
- Difference from the reference weight boundaries.
- Explanations of BMI classifications.

### 6. Calculation History
- Save calculations.
- Retrieve previous results.
- Delete individual records.
- Clear calculation history.
- Persistent browser storage using LocalStorage.

### 7. Responsive Design
- Desktop-friendly dashboard.
- Tablet support.
- Mobile-friendly interface.
- Modern dark theme.

## Technology Stack

| Technology | Implementation |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript ES6+ | Calculation engine and application logic |
| LocalStorage | Persistent calculation history |
| SVG/CSS | Visual elements |
| Node.js | Development server and testing |

No third-party JavaScript libraries or frameworks are required.

## Project Structure

```text
bmi-pro/
│
├── index.html
├── package.json
├── server.js
├── README.md
│
├── css/
│   └── styles.css
│
├── js/
│   ├── bmi.js
│   ├── storage.js
│   └── app.js
│
└── tests/
    └── bmi.test.js
```

## Installation and Setup

### Prerequisites

- Node.js 18 or above (for the development server and tests).
- A modern web browser.
- Git (optional).

### Step 1: Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bmi-pro.git
```

### Step 2: Navigate into the project

```bash
cd bmi-pro
```

### Step 3: Start the application

```bash
npm start
```

### Step 4: Open in browser

```text
http://localhost:3000
```

Alternatively, open `index.html` using VS Code Live Server.

## Running Tests

Run the built-in Node.js test suite:

```bash
npm test
```

Check JavaScript syntax:

```bash
npm run check
```

## BMI Formula

The application uses the standard BMI formula.

**Metric formula:**

BMI = Weight (kg) / Height (m)²

**Imperial formula:**

BMI = 703 × Weight (lbs) / Height (inches)²

Imperial measurements are converted into metric values before the core calculation.

## Data Storage

BMI Pro uses browser LocalStorage to store calculation history.

- No external database is required.
- Data persists within the same browser.
- Users can remove individual records or clear their history.

## Health Disclaimer

BMI is a screening measure and is not a diagnostic tool. The standard adult BMI classifications are intended for adults aged 20 and above. BMI does not directly measure body fat or account for differences in muscle mass, fat distribution, pregnancy, or all population-specific health considerations. Consult a qualified healthcare professional for individual health assessments.

## Future Enhancements

Potential future development:

- BMI trend charts.
- Weekly and monthly health dashboards.
- User authentication.
- Personal health profiles.
- CSV and PDF report exports.
- Goal tracking.
- Progressive Web App support.
- Accessibility enhancements.
- More population-specific BMI interpretation.

## License

This project is released under the MIT License.

---

**BMI Pro — Understand your body. Track your health.**