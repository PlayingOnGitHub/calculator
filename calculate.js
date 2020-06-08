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
    let additionArray = [];
    let subtractionArray = [];
    let multiplicationAndDivisionArray = [];
    let currentArray = "";
    let currentNumber = "";

    /* example string "+1+3+4/+3/*+3+3/+3+4"*/
    someArray.forEach( (currentItem, currentIndex) => {
        let previousItem = someArray[currentIndex-1];
        if ( currentItem == "+" ) {
            if ( currentArray == "" ) {
                currentArray = "additionArray";
                currentNumber = "+";
            }
            else if ( currentArray == "additionArray" ) {
                currentArray = "additionArray";
                additionArray.push( currentNumber );
                currentNumber = "+";
            }
            else if ( currentArray == "subtractionArray" ) {
                currentArray = "additionArray";
                subtractionArray.push( currentNumber );
                currentNumber = "+";
            }
            else if ( currentArray == "multiplicationAndDivisionArray" ) { /* if previous sign found was "*" */
                if ( !(isNaN(+previousItem)) ) { /* and the previous item was a number? */
                    multiplicationAndDivisionArray.push( currentNumber );
                    multiplicationAndDivisionArray.push( "," ); /* this seperates grouping */
                    currentArray = "additionArray"; /* reset array type for now */
                    currentNumber = "+"
                }
                else {
                    currentNumber += "+";
                }
                /*else if ( previousItem == "*" || previousItem == "/" ) {
                    multiplicationAndDivisionArray.push( currentNumber );
                    currentArray = "multiplicationAndDivisionArray";
                    currentNumber = "+"
                }*/
            }
        }
        else if ( currentItem == "-" ) {
            if ( currentArray == "" ) {
                currentArray = "subtractionArray";
                currentNumber = "-";
            }
            else if ( currentArray == "subtractionArray" ) {
                currentArray = "subtractionArray";
                subtractionArray.push( currentNumber );
                currentNumber = "-";
            }
            else if ( currentArray == "additionArray" ) {
                currentArray = "subtractionArray";
                additionArray.push( currentNumber );
                currentNumber = "-";
            }
            else if ( currentArray == "multiplicationAndDivisionArray" ) { /* if previous sign found was "*" */
                if ( !(isNaN(+previousItem)) ) { /* and the previous item was a number? */
                    multiplicationAndDivisionArray.push( currentNumber );
                    multiplicationAndDivisionArray.push( "," ); /* this seperates grouping */
                    currentArray = "subtractionArray"; /* reset array type for now */
                    currentNumber = "-"
                }
                else {
                    currentNumber += "-";
                }
                /*else if ( previousItem == "*" || previousItem == "/" ) {
                    multiplicationAndDivisionArray.push( currentNumber );
                    currentArray = "multiplicationAndDivisionArray";
                    currentNumber = "-"
                }*/
            }
        }
        else if ( currentItem == "*" ) {
            if ( currentArray == "subtractionArray" ) {
                currentArray = "multiplicationAndDivisionArray";
                currentNumber += "*";
            }
            else if ( currentArray == "additionArray" ) {
                currentArray = "multiplicationAndDivisionArray";
                currentNumber += "*";
            }
            else if ( currentArray == "multiplicationAndDivisionArray" ) {
                if ( !(isNaN(+previousItem)) ) {
                    /* example string: "+3*+3*+3+3".     Look at the "*+3*+3+3" part of it. */
                    currentArray = "multiplicationAndDivisionArray";
                    currentNumber += ""+currentItem;
                }
            }
        }
        else if ( currentItem == "/" ) {
            if ( currentArray == "subtractionArray" ) {
                currentArray = "multiplicationAndDivisionArray";
                currentNumber += "/";
            }
            else if ( currentArray == "additionArray" ) {
                currentArray = "multiplicationAndDivisionArray";
                currentNumber += "/";
            }
            else if ( currentArray == "multiplicationAndDivisionArray" ) {
                if ( !(isNaN(+previousItem)) ) {
                    /* example string: "+3*+3*+3+3".     Look at the "*+3*+3+3" part of it. */
                    currentArray = "multiplicationAndDivisionArray";
                    currentNumber += ""+currentItem;
                }
            }
        }
        else {
            currentNumber += currentItem;
            if ( currentIndex == someArray.length - 1 ) {
                if ( currentArray == "subtractionArray" ) {
                    subtractionArray.push( currentNumber );
                }
                else if ( currentArray == "additionArray" ) {
                    additionArray.push( currentNumber );
                }
                else if ( currentArray == "multiplicationAndDivisionArray" ) {
                    multiplicationAndDivisionArray.push( currentNumber );
                }
            }
        }
    });
    console.log("Addition Array: " + additionArray );
    console.table( additionArray );
    console.log("Subtraction Array: ");
    console.table( subtractionArray );
    console.log("Multiplication and division array: ");
    console.table( multiplicationAndDivisionArray );
}