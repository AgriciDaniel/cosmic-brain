Operatoren der CALC-Library

1  Operators of the CALC Library

Summary

Arithmetic operators

The following operators and expressions can be used to formulate conditions:

Functions

Meaning/ usage

abs(x)

atan(x)

cosh(x)

float(x)

prime(x)

sqrt(x)

acos(x)

Calculates the absolute value

Calculates the arctangent

Calculates the hyperbolic cosine

Transforms the value into a floating-point number

Produces x if x is a prime or calculates the next prime after x if x is no prime

Calculates the square root

Calculates the arccosine

atan2(y,x)

Calculates the arctangent of y/x

exp(x)

log(x)

sin(x)

tan(x)

asin(x)

cos(x)

int(x)

log10(x)

round(x)

Calculates the exponential

Calculates the logarithm

Calculates the sine

Calculates the tangent

Calculates the arcsine

Calculates the cosine

Transforms the value into an integer

Calculates the logarithm

Rounds-up to an integer

round(x,y)

Rounds the value x to y decimal places

sinh(x)

tanh(x)

trunc(x)

trunc(x,y)

string(x)

Calculates the hyperbolic sine

Calculates the hyperbolic tangent

Reduces the value x to an integer value

Reduces the value x to y decimal places

Transforms the value into a string

Logical operators

x and y

The  AND  operator  "and"  produces  the  value  1  (true)  if  both  conditions  are  true.
Otherwise the value 0 (false) will be returned.

MBL_CALC_LIBRARY_OPERATORS.docxVersion: 1.0.1362

Page 1 of 3

x or y

x like y

!x

x + y

x – y

x / y

x * y

x ** y

x << y
x >> y

x < y

x <= y

x > y

x >= y

x == y

x != y

x & y

Operatoren der CALC-Library

The  OR  operator  "or"  produces  the  value  1  (true)  if  one  of  the  conditions  is  true.
Otherwise the value 0 (false) will be returned.

The  comparison  operator  "like"  produces  the  value  1  (true)  if  the  first  operand
corresponds to the pattern of the second operand. Otherwise the value 0 (false) will
be returned.
The pattern may include the following placeholders:
"*"
"?"

0 –n any character
exactly 1 any character





The logical  negation (NOT) operator  produces the  value  0 (false) if  its operand  is
true (nonzero) and the value 1 (true), if its operand is false (0).



Addition

Subtraction

Division

Multiplication

Calculates x to the power of y

The  bit-wise  shift  operators  shift  their  first  operand  to  the  left  (<<)  or  to  the  right
(>>) by the number of positions the second operand specifies.

























Produces 1 (true) if the value x is smaller than y, otherwise 0 (false)

Produces 1 (true) if the value x is smaller than/ equal to y, otherwise 0 (false)

Produces 1 (true) if the value x is higher than y, otherwise 0 (false)

Produces 1 (true) if the value x is higher than/ equal to y, otherwise 0 (false)

Produces 1 (true) if the value x is equal to y, otherwise 0 (false)

Produces 1 (true) if the value x is not equal to y, otherwise 0 (false)

The  bit-wise  AND-operator  compares  each  bit  of  its  first  operand  to  the
corresponding bit of its second operand. If both bits are 1 the corresponding result
bit will be set to 1. Otherwise the corresponding result bit will be set to 0.

MBL_CALC_LIBRARY_OPERATORS.docxVersion: 1.0.1362

Page 2 of 3

Operatoren der CALC-Library

x ^ y

x | y

The bit-wise EXCLUSIVE-OR-operator compares each bit of its first operand to the
corresponding bit of the second operand. If  one bit is 0 and the other bit is 1, the
corresponding result bit will be set to 1. Otherwise the corresponding result bit will
be set to 0.

The  bit-wise  INCLUSIVE-OR-operator  compares  each  bit  of  the  first  operand  to
the  corresponding  bit  of  its  second  operand.  If  either  bits  is  1,  the  corresponding
result bit will be set to 1. Otherwise the corresponding result bit will be set to 0.

Constants

Constants

Value

pi

e

3.141592654

2.718281828

MBL_CALC_LIBRARY_OPERATORS.docxVersion: 1.0.1362

Page 3 of 3

