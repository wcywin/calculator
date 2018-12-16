// Variables set up for the calculator logic
const displayOperation = document.getElementById('it-calc-operation');
const resultValue = document.getElementById('it-calc-result');
const clearBtn = document.getElementById('it-calc-clear');
const saveBtn = document.getElementById('it-calc-save');
const numberBtns = document.getElementsByClassName('it-btn__number');
const operatorBtns = document.getElementsByClassName('it-btn__operator');

// Opening set up of the calculator
let numberBtnsArray = Array.from(numberBtns);
let operatorBtnsArray = Array.from(operatorBtns);
let count = 0;
let displayValue = '0';
let dotIncluded = false;
let operatorIncluded = false;

// Function building the string of values
const updateDisplayOperation = (clickedBtn) => {
    let btnValue = clickedBtn.target.innerText;
    count += 1;

    if (count < 18) {
        // First value clicked is changing the initial 0 into empty string
        if(displayValue === '0') {
            displayValue = '';
        }

        // Checking if there is a dot in the string
        if(!dotIncluded && btnValue === ".") {
            displayValue += '.';
            dotIncluded = true;
        } else if(btnValue !== "." && displayValue.length < 18) {
            displayValue += btnValue;
            console.log(displayValue.length);
            console.log(displayValue);
        }

        // setting the string into the display
        displayOperation.innerText = displayValue;
    } else {
        alert(`Reached max 18 numbers! 
        -> Press equal to calculate the entered operation 
        -> or reset the display to start again!`);
    }
};

// Function responsible for the calculation
const doTheCalculation = (clickedOperator) => {
    let chosenOperator = clickedOperator.target.innerText;
    dotIncluded = false;

    // all operators cases in a switch
    switch (chosenOperator) {
        case '+':
            if(!operatorIncluded) {
                displayValue += '+';
                operatorIncluded = true;
            }
            break;
        case '-':
            if(!operatorIncluded) {
                displayValue += '-';
                operatorIncluded = true;
            }
            break;
        case 'x':
            if(!operatorIncluded) {
                displayValue += 'x';
                operatorIncluded = true;
            }
            break;
        case '÷':
            if(!operatorIncluded) {
                displayValue += '÷';
                operatorIncluded = true;
            }
            break;
        case '=':
            // Set the displayValue string on display
            displayOperation.innerText = displayValue;
            // Change string into array
            const arrayNum = displayValue.split('');

            // Changing multiply and divide operators in the array
            const newArray = arrayNum.map(val => {
                switch(val) {
                    case "x":
                        val = "*";
                        break;
                    case "÷":
                        val = "/";
                        break;
                }
                return val;
            });

            // Re-change the array into new string
            let newDisplayValue = newArray.join('');
            resultValue.innerText = eval(newDisplayValue).toFixed(0).substring(0,8);
            operatorIncluded = false;
            break;
    }
    displayOperation.innerText = displayValue;
};

// Reset function on "AC"
const clearCalculation = () => {
    displayValue = '0';
    displayOperation.innerText = displayValue;
    resultValue.innerText = "0";
    operatorIncluded = false;
    dotIncluded = false;
    count = 0;
};

// Click events
numberBtnsArray.map(val => val.addEventListener('click', updateDisplayOperation));
operatorBtnsArray.map(val => val.addEventListener('click', doTheCalculation));
clearBtn.addEventListener('click', clearCalculation);

// Fetch data to save the result
saveBtn.addEventListener('click', () => {

    // Form data for POST request
    let formData = new FormData();
    formData.append('sum', resultValue.innerText);

    const url = 'https://www.cywinski.pro/calc/store.php';

    fetch(url, {
        method: 'POST',
        mode: "cors",
        body: formData,
    }).then(res => res.json())
    .then(response => console.log('Response:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
});