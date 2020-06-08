const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

const operate = function ( a, operator, b ) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

const checkInput = function( userInputString ) {
    let userInputArray = userInputString.split("");

    /* the below statement trims the array */
    userInputArray = userInputArray.filter( (x) => (x==" ") ? false : true )

    return userInputArray.every( (currentValue, currentIndex) => { 
        if ( currentValue != "/" && currentValue != "*" && currentValue != "+" && currentValue != "-" && isNaN(+currentValue) ) {
            return false;
        }
        else {
            return true;
        }
    })
}

const reduceSigns = function( mathString ) {
    let mathArray = mathString.split("");
    mathArray = mathArray.filter( (x) => (x==" ") ? false : true );
    mathArray.forEach( (currentItem, currentIndex, itemArray) => {
        let previousItem = itemArray[currentIndex-1];
        let previousIndex = currentIndex - 1;
        console.log( "Previous Item: " + mathArray[previousIndex] );
        console.log( "Current Item: " + mathArray[currentIndex] );
        if ( previousItem == "-" && currentItem == "-" ) {
            mathArray[previousIndex] = "";
            mathArray[currentIndex] = "+";
        }
        else if ( previousItem == "+" && currentItem == "-" ) {
            mathArray[previousIndex] = "";
            mathArray[currentIndex] = "-";
        }
        else if ( previousItem == "+" && currentItem == "+" ) {
            mathArray[previousIndex] = "";
            mathArray[currentIndex] = "+";
        }
        else if ( previousItem == "-" && currentItem == "+" ) {
            mathArray[previousIndex] = "";
            mathArray[currentIndex] = "-";
        }
        else if ( previousItem == "/" && !(isNaN(+currentItem)) || previousItem == "*" && !(isNaN(+currentItem)) ) {
            mathArray.splice(currentIndex, 0, "+")
        }
    });
    mathArray = mathArray.filter( (x) => (x==" ") ? false : true );
    return mathArray.join("");
}

let filterIntoArrays = function ( someArray ) {
    let additionAndSubtractionArray = [];
    let multiplicationAndDivisionArray = [];
    let currentArray = "";
    let currentNumberString = "";

    /* example string "+1+3+4/+3/*+3+3/+3+4"*/
    someArray.forEach( (currentItem, currentIndex, mathArray) => {
        let previousItem = mathArray[currentIndex-1];
        
    });
}