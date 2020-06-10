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
    if ( !validOrInvalidInput ) {
        return "Please enter #'s & basic operations only";
    }
    let mathString = reduceSigns( userInput )
    mathString = reduceSigns( mathString );
    let mathArrays = filterIntoArrays( mathString.split("") );
    let additionSubtractionTotal = getAdditionAndSubtractionArrayTotal( mathArrays[0], mathArrays[1] );
    let multiplicationDivisionTotal = getMultiplicationAndDivisionArrayTotal( mathArrays[2] );
    /* snarky divide by zero remark */
    if ( multiplicationDivisionTotal == "In Soviet Union, zero dividez by yOU!" ) {
        return "In Soviet Union, zero dividez by yOU!";
    }
    let solution = +additionSubtractionTotal + +multiplicationDivisionTotal;
    return +solution;
}

