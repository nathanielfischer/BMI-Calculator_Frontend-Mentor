// ------------------------ Global Variables ------------------------

let unit = "metric";
let height = undefined;
let weight = undefined;
let bmi = undefined;
let idealMinWeight = undefined;
let idealMaxWeight = undefined;
let heightUnit = "cm";
let weightUnit = "kg";

// ------------------------ Event Listeners ------------------------

document.querySelectorAll("input")[0].addEventListener('click', (event) => {
    unit = "metric";
    updateUnits();
    calculateBMI();
});

document.querySelectorAll("input")[1].addEventListener('click', (event) => {
    unit = "imperial";
    updateUnits();
    calculateBMI();
});

document.querySelectorAll("input")[2].addEventListener('keyup', (event) => {
    height = document.querySelectorAll("input")[2].value;
    calculateBMI();
});

document.querySelectorAll("input")[3].addEventListener('keyup', (event) => {
    weight = document.querySelectorAll("input")[3].value;
    calculateBMI();
});


// ------------------------ Functions ------------------------


const calculateBMI = () => {
    if (evaluateInput()) {
        if (unit === "metric") {
            bmi = weight / ((height / 100) * (height / 100));
            //Calculate ideal BMI in kgs
            idealMinWeight = 18.5 * ((height / 100) * (height / 100));
            idealMaxWeight = 24.9 * ((height / 100) * (height / 100));
        } else {
            bmi = (weight / (height * height)) * 703;
            //Calculate ideal BMI in lbs
            idealMinWeight = 18.5 / 703 * (height * height);
            idealMaxWeight = 24.9 / 703 * (height * height);
        }
        updateDOM("result");
    } else {
        updateDOM("reset");
    }
};


const evaluateInput = () => {
    if (height > 0 && weight > 0) {
        return true;
    } else {
        return false;
    };
};


const updateDOM = (change) => {
    if (change === "result") {
        //hide welcome div
        document.querySelector(".bmi-result").children[0].classList.add("display-none");
        //show radio-grid
        document.querySelector(".bmi-result").children[1].classList.remove("display-none");
        //show radio-grid
        document.querySelector(".bmi-result").children[2].classList.remove("display-none");
        //update BMI Result
        updateBMIresult();
    } else {
        //show welcome div
        document.querySelector(".bmi-result").children[0].classList.remove("display-none");
        //hide radio-grid
        document.querySelector(".bmi-result").children[1].classList.add("display-none");
        //hide radio-grid
        document.querySelector(".bmi-result").children[2].classList.add("display-none");
    }
}


/**
 * - Underweight: BMI less than 18.5
 * - Healthy weight: BMI 18.5 to 24.9
 * - Overweight: BMI 25 to 29.9
 * - Obese: BMI 30 or greater
 */
const updateBMIresult = () => {
    //Update BMI Score in the DOM, rounded to one decimal
    document.querySelector(".bmi-score").innerHTML = Math.round(bmi * 10) / 10;

    //BMI result evaluation
    let evaluation;
    if (bmi < 18.5) {
        evaluation = "underweight";
    } else if (bmi < 25) {
        evaluation = "healthy weight";
    } else if (bmi < 30) {
        evaluation = "overweight";
    } else if (bmi >= 30) {
        evaluation = "obese";
    }

    //Ideal weight text
    let idealWeightSpan = (Math.round(idealMinWeight * 10) / 10) + weightUnit + " - "
        + (Math.round(idealMaxWeight * 100) / 100) + weightUnit + ".";

    //Update text in DOM   
    document.querySelector(".bmi-evaluation").innerHTML = evaluation + ".";
    document.querySelector(".bmi-ideal-weight").innerHTML = idealWeightSpan;
}



const updateUnits = () => {
    if (unit === "metric") {
        heightUnit = "cm";
        weightUnit = "kg";
    } else {
        heightUnit = "inches";
        weightUnit = "lbs";
    }
    document.querySelectorAll(".input-hover-text")[0].innerHTML = heightUnit;
    document.querySelectorAll(".input-hover-text")[1].innerHTML = weightUnit;
}