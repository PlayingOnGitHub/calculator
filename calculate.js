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

let checkInput = function( userInputString ) {
    let userInputArray = userInputString.split("");

    /* the below statement trims the array */
    userInputArray = userInputArray.filter( (x) => (x==" ") ? false : true )
    let trueOrFalse = true;

    userInputArray.forEach( (currentValue, currentIndex) => {
        let nextValue = userInputArray[currentIndex+1]
        if ( currentValue != "/" && currentValue != "*" && currentValue != "+" && currentValue != "-" && isNaN(+currentValue) && currentValue != "." ) {
            trueOrFalse = false;
        }
        if ( currentValue == "." && isNaN( +nextValue ) || currentValue == "." && nextValue == undefined || currentValue == "." && nextValue == null ) {
            trueOrFalse = false;
        }
        if ( currentValue == "*" && isNaN( +nextValue ) && nextValue != "." && nextValue != "+" && nextValue != "-" || currentValue == "*" && nextValue == undefined || currentValue == "*" && nextValue == null ) {
            trueOrFalse = false;
        }
        if ( currentValue == "/" && isNaN( +nextValue ) && nextValue != "." && nextValue != "+" && nextValue != "-" || currentValue == "/" && nextValue == undefined || currentValue == "/" && nextValue == null ) {
            trueOrFalse = false;
        }
        if ( currentValue == "+" && isNaN( +nextValue ) && nextValue != "-" && nextValue != "+" || currentValue == "-" && isNaN( +nextValue ) && nextValue != "+" && nextValue != "-" ) {
            trueOrFalse = false;
        }
        if ( currentIndex == 0 && currentValue == "/" || currentIndex == 0 && currentValue == "*" ) {
            trueOrFalse = false;
        }
    })

    let multiplePeriodsRegex = /[\.][\d]*[\.]/g;
    userInputString = userInputArray.join("");
    let multiplePeriodsArray = userInputString.match( multiplePeriodsRegex );
    if ( multiplePeriodsArray != null  ) {
        trueOrFalse = false;
    }

    if ( userInputString.length <= 0 ) {
        trueOrFalse = 0;
    }

    return trueOrFalse;

}

const filterZeroes = function( userInput ) {
    let userInputArray = userInput.split("");
    let regexArray = [...userInput.matchAll( /[\+\-][0]{1,}[\d]/g )];
    let numberOfDeletedItems = 0;
    regexArray.forEach( (item, index) => {
        let startOfZeroes = regexArray[index].index+1-numberOfDeletedItems;
        let endOfZeroes  = regexArray[index][0].length-2;
        numberOfDeletedItems += endOfZeroes;
        userInputArray.splice(startOfZeroes, endOfZeroes ); /* deletes zeroes */
    });
    return userInputArray.join("");
}

const reduceSigns = function( mathString ) {
    let mathArray = mathString.split("");
    mathArray = mathArray.filter( (x) => (x==" ") ? false : true );
    let currentIndex = 0;
    while (currentIndex <= mathArray.length - 1 ) {
        let itemArray = mathArray;
        let currentItem = itemArray[currentIndex];
        let previousItem = itemArray[currentIndex-1];
        let previousIndex = currentIndex - 1;

        if ( currentIndex == 0 && currentItem != "-" && currentItem != "+" ) {
            mathArray.splice(currentIndex, 0, "+");
            currentIndex++;
        }
        else {
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
                mathArray.splice(currentIndex, 0, "+");
                currentIndex++;
            }
        }
        currentIndex++;
    }
    mathArray = mathArray.filter( (x) => (x==" ") ? false : true );
    return filterZeroes( mathArray.join("") );
}

const filterIntoArrays = function ( someArray ) {
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
    return [additionArray, subtractionArray, multiplicationAndDivisionArray];
}

const calculateMultiplicationAndDivisionArray = function( testArray ) {
    let item1accumulator = "";
    let currentNumber = "";
    let currentArray = "division";
    let divideByZero = false;
    
    testArray.forEach( (item, index) => {
        let previousItem = testArray[index-1];
        let nextItem = testArray[index+1];
        let nextNextItem = testArray[index+2];
        let previousPreviousItem = testArray[index-2];

        if ( index == 0 ) { /* beginning behavior */
            currentNumber = item;
        }
        else if ( index == testArray.length-1 ) { /* end behavior */
            currentNumber += item;
            if ( currentArray == "division" && currentNumber.length > 0 ) {
                item1accumulator /= +currentNumber;
            }
            else if ( currentArray == "multiplication" && currentNumber.length > 0 ) {
                item1accumulator *= +currentNumber;
            }
        }
        else { /* middle behavior */
            if ( !(isNaN(+item)) ) {
                currentNumber += item;
            }
            else {
                if (item == "/") {
                    if ( nextNextItem == "0" ) {
                        divideByZero = true;
                    }
                    if ( item1accumulator == "" || item1accumulator == undefined || !item1accumulator ) {
                        item1accumulator = +currentNumber;
                    }
                    else {
                        if ( currentArray == "division" && currentNumber.length > 0 ) {
                            item1accumulator /= +currentNumber;
                        }
                        else if ( currentArray == "multiplication" && currentNumber.length > 0 ) {
                            item1accumulator *= +currentNumber;
                        }
                    }
                    currentArray = "division";
                }
                else if (item == "*") {
                    if ( item1accumulator == "" || item1accumulator == undefined || !item1accumulator ) {
                        item1accumulator = +currentNumber;
                    }
                    else {
                        if ( currentArray == "division" && currentNumber.length > 0 ) {
                            item1accumulator /= +currentNumber;
                        }
                        else if ( currentArray == "multiplication" && currentNumber.length > 0 ) {
                            item1accumulator *= +currentNumber;
                        }
                    }
                    currentArray = "multiplication";
                }
                else if (item == "+" || item == "-") {
                    currentNumber = item;
                }
            }
        }
    });
    if (divideByZero) {
        return "In Soviet Union, zero dividez by yOU!";
    }
    return item1accumulator;
}

const getMultiplicationAndDivisionArrayTotal = function( multiplicationAndDivisionArray ) {
    let multiplicationAndDivisionArrayParts = multiplicationAndDivisionArray.join("").split(",");
    let breakOnZero = false;
    let multiplicationAndDivisionTotal = multiplicationAndDivisionArrayParts.reduce( ( accumulator, item ) => {
        let currentArray = item.split("");
        if ( calculateMultiplicationAndDivisionArray( currentArray ) == "In Soviet Union, zero dividez by yOU!" ) {
            breakOnZero = true;
        }
        if ( item != "," ) {
            accumulator += +calculateMultiplicationAndDivisionArray( currentArray );
        }
        return accumulator;
    }, 0);

    if (breakOnZero) {
        return "In Soviet Union, zero dividez by yOU!";
    }

    return multiplicationAndDivisionTotal;
}

const getAdditionAndSubtractionArrayTotal = function( additionArray, subtractionArray ) {
    let additionAndSubtractionArray = additionArray.concat( subtractionArray );
    return +additionAndSubtractionArray.reduce( (accumulator, item) =>  accumulator += +item , 0 );
}

const getSolution = function( userInput ) {
    let validOrInvalidInput = checkInput( userInput );
    if ( !validOrInvalidInput && validOrInvalidInput !== 0 ) {
        return "Invalid Entry";
    }
    else if ( validOrInvalidInput == 0 ) {
        return 0;
    }
    let mathString = reduceSigns( userInput )
    mathString = reduceSigns( mathString );
    let mathArrays = filterIntoArrays( mathString.split("") );
    let additionSubtractionTotal = getAdditionAndSubtractionArrayTotal( mathArrays[0], mathArrays[1] );
    let multiplicationDivisionTotal = getMultiplicationAndDivisionArrayTotal( mathArrays[2] );
    /* snarky divide by zero remark */
    if ( multiplicationDivisionTotal == "In Soviet Union, zero dividez by yOU!" ) {
        alert("In Soviet Union, zero dividez by yOU!")
        return "0";
    }
    let solution = +additionSubtractionTotal + +multiplicationDivisionTotal;
    return +solution;
}

function logNumber(e) {
    let id = this.id;
    let text = document.getElementById("userInput");
    let textArray = text.value.split("");
    let textValue = text.value;
    let previousItem = textValue[textValue.length-1]
    if ( previousItem == "*" && id == "/" ) {
        textArray[textArray.length-1] = "/";
        let joinedInput = textArray.join("");
        text.value = joinedInput;
    }
    else if ( previousItem == "/" && id == "*") {
        textArray[textArray.length-1] = "*";
        let joinedInput = textArray.join("");
        text.value = joinedInput;
    }
    else if ( previousItem == "+" && id == "/" && textValue != "+" || previousItem == "-" && id == "/" && textValue != "-" ) {
        textArray[textArray.length-1] = "/";
        let joinedInput = textArray.join("");
        text.value = joinedInput;
    }
    else if ( previousItem == "+" && id == "*" && textValue != "+" || previousItem == "-" && id == "*" && textValue != "-" ) {
        textArray[textArray.length-1] = "*";
        let joinedInput = textArray.join("");
        text.value = joinedInput;
    }
    else if ( previousItem == "." && id == "." || previousItem == "/" && id == "/" || previousItem == "*" && id == "*" || id == "/" && textValue == "" || id == "*" && textValue == "" || textValue == "0" && id == "/" || textValue == "0" && id == "*" ) {
        /* just do nothing */
    }
    else if ( text.value.length == 1 && +text.value == 0 && id != "/" && id != "*" && id != "+" && id != "-" ) {
        text.value = id;
    }
    else {
        text.value += id;
    }
}


/* This function replaces * with / if user is switching back and fourth between * and / signs. I do the same the same with periods by using preventDefault. **
****** Also stops user from multiplying or dividing at start of string etc   ********************/
function checkKey(e) {
    let key = e.keyCode;
    let currentInput = document.getElementById("userInput").value;
    let lastCharacterUsed = currentInput[currentInput.length-1];
    let lastCharacterKeyValue = "";
    let userInputArray = currentInput.split("");

    if ( lastCharacterUsed != undefined && lastCharacterUsed != null ) {
        lastCharacterKeyValue = lastCharacterUsed.charCodeAt(0);
    }
    if ( +key == 191 && +lastCharacterKeyValue == 42 ) {
        userInputArray[userInputArray.length-1] = "/";
        let newInput = userInputArray.join("");
        e.preventDefault();
        document.getElementById("userInput").value = newInput;
    }
    if ( +key == 56 && +lastCharacterKeyValue == 47 ) {
        userInputArray[userInputArray.length-1] = "*";
        let newInput = userInputArray.join("");
        e.preventDefault();
        document.getElementById("userInput").value = newInput;
    }
    if ( +key == 56 && +lastCharacterKeyValue == 43 || +key == 56 && +lastCharacterKeyValue == 45 ) {
        userInputArray[userInputArray.length-1] = "*";
        let newInput = userInputArray.join("");
        e.preventDefault();
        document.getElementById("userInput").value = newInput;
    }
    if ( +key == 191 && +lastCharacterKeyValue == 45 || +key == 191 && +lastCharacterKeyValue == 43 ) {
        userInputArray[userInputArray.length-1] = "/";
        let newInput = userInputArray.join("");
        e.preventDefault();
        document.getElementById("userInput").value = newInput;
    }
    if ( +key == 191 && currentInput == "" || +key == 56 && currentInput == "" ) {
        e.preventDefault();
        document.getElementById("userInput").value = "0";
    }
    if ( +key == 191 && +currentInput == 0 || +key == 56 && +currentInput == 0 || +key == 190 && +lastCharacterKeyValue == 46 || +key == 191 && +lastCharacterKeyValue == 47 || +key == 56 && +lastCharacterKeyValue == 42 ) {
        e.preventDefault();
    }

    if ( +key == 13 ) {
        document.getElementById("userInput").value = getSolution(currentInput);
    }

    if ( +key == 27 ) {
        document.getElementById("userInput").value = "0";
    }

}

function run() {
    let one = document.getElementById("1");
    let two = document.getElementById("2");
    let three = document.getElementById("3");
    let four = document.getElementById("4");
    let five = document.getElementById("5");
    let six = document.getElementById("6");
    let seven = document.getElementById("7");
    let eight = document.getElementById("8");
    let nine = document.getElementById("9");
    let zero = document.getElementById("0");
    let period = document.getElementById(".");
    let plus = document.getElementById("+");
    let minus = document.getElementById("-");
    let divide = document.getElementById("/");
    let multiply = document.getElementById("*");
    let clear = document.getElementById("clear");
    let enter = document.getElementById("enter");

    one.addEventListener("click", logNumber, true);
    two.addEventListener("click", logNumber, true);
    three.addEventListener("click", logNumber, true);
    four.addEventListener("click", logNumber, true);
    five.addEventListener("click", logNumber, true);
    six.addEventListener("click", logNumber, true);
    seven.addEventListener("click", logNumber, true);
    eight.addEventListener("click", logNumber, true);
    nine.addEventListener("click", logNumber, true);
    zero.addEventListener("click", logNumber, true);
    period.addEventListener("click", logNumber, true);
    plus.addEventListener("click", logNumber, true);
    minus.addEventListener("click", logNumber, true);
    divide.addEventListener("click", logNumber, true);
    multiply.addEventListener("click", logNumber, true);
    clear.addEventListener("click", () => { document.getElementById("userInput").value = "0"; }, true);
    enter.addEventListener("click", () => {
        let userInput = document.getElementById("userInput").value;
        document.getElementById("userInput").value = getSolution(userInput);
    }, true);

    let textbox = document.getElementById("userInput");
    textbox.addEventListener("keydown", checkKey, true);
    textbox.value = "0";

    let screen = document.querySelector(".screen");
    screen.addEventListener("click", () => { document.getElementById("userInput").focus(); }, true );

}

run();