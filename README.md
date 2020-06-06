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

