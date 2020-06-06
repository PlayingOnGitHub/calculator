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
    /* this trims all whitespace in string */
    mathArray = mathArray.filter( (currentItem, currentIndex) => { 
        if ( currentItem == " " ) {
            return false;
        }
        else {
            return true;
        }
    } );
    for ( let i = 0; i <= mathArray.length-1; i++ ) {
        let currentItem = mathArray[i];
        let previousItem = mathArray[i-1];
        let nextItem = mathArray[i+1];
        if ( i == 0 ) {
            if ( mathArray[i] != "+" || mathArray[i] != "-") {
                mathArray.unshift("+");
            }
        }
        else {
            if (currentItem == "-" && previousItem == "-" ) {
                mathArray[i] = "+";
                mathArray[i-1] = "";
            }
            else if (currentItem == "+" && previousItem == "-" || currentItem == "-" && previousItem == "+") {
                mathArray[i] = "-";
                mathArray[i-1] = "";
            }

            if (previousItem == "/" && nextItem != "+" || previousItem == "/" && nextItem != "-") {
                mathArray[i] = "+";
            }

            else if (previousItem == "*" && nextItem != "+" || previousItem == "*" && nextItem != "-") {
                mathArray[i] = "+";
            }

            /* important that the if statement below is after previous if and else if statements.
               The if statement below cleans up the plus signs */
            if (currentItem == "+" && previousItem == "+") {
                mathArray[i] = "+";
                mathArray[i-1] = "";
            }
        }
    }
    /* trim one more time */
    mathArray = mathArray.filter( (currentItem, currentIndex) => { 
        if ( currentItem == " " ) {
            return false;
        }
        else {
            return true;
        }
    } );
    return mathArray.join("");
}