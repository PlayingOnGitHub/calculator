I created a couple of functions that add, subtract, divide, and multiply.
The "operate" function takes two numbers and an operator "+", "-", "/", "*".
If we made a tree, the tree would like like this:

-> Operate
     -> Add
     -> Subtract
     -> Divide
     -> Multiply

------------------------------------------------------------------------------

Thought process:
/* filter out all bad input that needs to be retried */
/* reduce consecutive divides down to one if grouped together and do the same with multiplication signs.. addition signs.... and then subtraction signs */
/* now add a plus sign to every number unless that number already has a minus sign or plus in front of it */
/* imagine this as +4/-4+10/+10-10/-10+1-0 */
/* group all the pluses and minuses together to be computed */
/* group all the divides and multiplies together to be computed */
/* take the sum of all divides and multiplies and add this to sum of pluses and minuses */

-------------------------------------------------------------------------------

I added two functions.
-> checkInput( string ) - checks if the input is a string containing only signs, basic operations, and numbers.
-> reduceSigns( string ) - This function changes double negatives into positives and cuts out extra "+", "*", and "/" signs.

-------------------------------------------------------------------------------

I improved the reduceSigns( string ) function. It works now.
I'm currently trying to filter my data into different arrays so I can process different math strings.

-------------------------------------------------------------------------------

filterIntoArrays( array ) now works!
It took me awhile but I got my functions to work pretty well!

-------------------------------------------------------------------------------

I got calculateMultiplicationAndDivisionArray( testArray ) to work! 
-> This takes a multiplication/division string and returns a solution to the string.

-------------------------------------------------------------------------------

Updated reduceSigns( mathString ).
-> The function now adds a "+" to the start of the string if the first number has no preceding "+" or "-". This is for consistency.

-------------------------------------------------------------------------------

Added multiplicationAndDivisionArrayTotal( multiplicationAndDivisionArray )
-> This function goes through multiplication/division arrays and calculates those arrays using the "calculateMultiplicationAndDivisionArray( testAray )" function.

-------------------------------------------------------------------------------

+ Changed name of MultiplicationAndDivisionArrayTotal to getMultiplicationAndDivisionArrayTotal.
     -> Also made it to where the function will not loop over "," in array.

+ Added function getAdditionAndSubtractionArrayTotal( additionArray, subtractionArray ).
     -> This function adds everything in additionArray and subtractionArray and returns the total value.

+ Added function getSolution( mathString ).
     -> This function puts everything together by solving a basic mathematical string.

-------------------------------------------------------------------------------

Patched reduceSigns bug.

-------------------------------------------------------------------------------

Added "In Soviet Union, zero dividez by yOU!" if user trys to divide by zero. Don't do it, Man.

-------------------------------------------------------------------------------

Next goal is to filter out extra zeroes preceeding a number. Example: 00000000047 should equal 47.
+ Added filterZeroes( userInput );

-------------------------------------------------------------------------------

Function checkInput( userString ) checks to see if multiple decimal points were put into a number. This acts as an additional filtering step.
Function checkInput( userString ) now makes sure the user does not enter an empty string.
Function checkInput( userString ) now checks for an empty decimal point.

-------------------------------------------------------------------------------

Had fun creating the styling for my calculator.

Added logNumber() which is ran when a user selects a digit or operation on the calculator.
Added run() which runs the entire project and makes the caclulator work.

-------------------------------------------------------------------------------

Patched checkInput( userString ). Function now looks for reoccuring "*"'s and "/"'s.