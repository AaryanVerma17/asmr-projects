# ==========================================
# CHAPTER 1: INTRODUCTION & THE print() FUNCTION
# ==========================================

# This is my first Python program
print("I like pizza")
print("It's really good")


# ==========================================
# CHAPTER 2: VARIABLES & CORE DATA TYPES
# ==========================================

# Strings
full_name = "Bro Code"
print(f"Hello {full_name}")

# Integers
age = 25
print(f"You are {age} years old")

# Floats
gpa = 3.2
print(f"Your GPA is {gpa}")

# Booleans
is_student = True
print(f"Are you a student? {is_student}")

if is_student:
    print("You are a student")
else:
    print("You are not a student")


# ==========================================
# CHAPTER 3: BASIC ARITHMETIC OPERATORS
# ==========================================

friends = 5

# Addition & Augmented assignment
friends = friends + 1
friends += 1

# Subtraction
friends = friends - 1
friends -= 1

# Multiplication
friends = friends * 2
friends *= 2

# Division (Standard & Integer Division)
friends = friends / 2
friends /= 2
friends = friends // 3
friends //= 3

# Modulus operator (Remainder)
remaining_friends = friends % 3


# ==========================================
# CHAPTER 4: TYPECASTING DATA
# ==========================================

name = "Bro Code"
age = 25
gpa = 3.2
is_student = True

# Getting data types
print(type(name))
print(type(age))
print(type(gpa))
print(type(is_student))

# Typecasting actions
gpa = int(gpa)
age = float(age)
age = str(age)

# Demonstrating boolean behaviors with empty/non-empty values
name = bool(name)
print(name)


# ==========================================
# CHAPTER 5: ACCEPTING USER INPUT
# ==========================================

name = input("Enter your name: ")
print(f"Hello {name}")
print(type(name))

# Inline typecasting during input evaluation
age = int(input("Enter your age: "))
age += 1
print(f"You are {age} years old")


# ==========================================
# CHAPTER 6: CONDITIONAL STATEMENTS (if, elif, else)
# ==========================================

age = int(input("Enter your age: "))

if age >= 65:
    print("You are a senior citizen")
elif age >= 18:
    print("You are an adult")
elif age == 0:
    print("You were just born")
elif age < 0:
    print("You haven't been born yet")
else:
    print("You are a child")

# Example with Booleans and ticket discounts
has_ticket = False
price = 10.0

if age >= 65:
    print(f"The ticket price for a senior is ${price * 0.75}")
elif age >= 18:
    print(f"The ticket price for an adult is ${price}")
else:
    print(f"The ticket price for a child is ${price * 0.50}")

if has_ticket:
    print("You may enter")
else:
    print("You need to buy a ticket")


# ==========================================
# CHAPTER 7: LOGICAL OPERATORS (and, or, not)
# ==========================================

# OR operator example
temp = 25
is_raining = False

if temp > 35 or temp < 0 or is_raining:
    print("The outdoor event is cancelled")
else:
    print("The outdoor event is still scheduled")

# AND / NOT operators example
temp = 20
is_sunny = True

if temp >= 28 and is_sunny:
    print("It is hot outside ☀️")
    print("It is sunny")
elif temp <= 0 and is_sunny:
    print("It is cold outside ❄️")
    print("It is sunny")
elif 28 > temp > 0 and is_sunny:
    print("It is warm outside")
    print("It is still sunny")
elif not is_sunny:
    print("It is cloudy ☁️")


# ==========================================
# CHAPTER 8: LOOP CONTROL WITH while
# ==========================================

# User Input enforcement with a while loop
name = input("Enter your name: ")

while name == "":
    print("You did not enter your name")
    name = input("Enter your name: ")

print(f"Hello {name}")

# Negative verification loop
age = int(input("Enter your age: "))

while age < 0:
    print("Age can't be less than zero")
    age = int(input("Enter your age: "))

print(f"Hello {name} you are {age} years old")


# ==========================================
# CHAPTER 9: ITERATION WITH for LOOPS & TIMER
# ==========================================

import time

# Basic counting increments
for i in range(1, 11):
    print(i)

for i in range(1, 11, 2):
    print(i)

# Iterating over string sequences
name = "Bro Code"
for letter in name:
    print(letter, end="-")
print()  # Print a blank line to reset the ending block character

# Countdown mini-project
for i in range(10, 0, -1):
    print(i)
    time.sleep(1)

print("Happy New Year!")


# ==========================================
# CHAPTER 10: COLLECTIONS (Lists, Tuples, and Sets)
# ==========================================

# --- LISTS ---
fruits = ["apple", "orange", "banana", "coconut"]

# Indexing & Iterating
print(fruits[0])
for fruit in fruits:
    print(fruit, end=" ")
print()

# Mutations
fruits[0] = "pineapple"
fruits.append("mango")
fruits.remove("banana")
fruits.pop(0)
fruits.clear()

# --- TUPLES ---
fruits = ("apple", "orange", "banana", "coconut")
# Note: Tuples are immutable; assignment or structural mutations will raise errors.

# --- SETS ---
fruits = {"apple", "orange", "banana", "coconut"}

# Structural manipulations
fruits.add("mango")
fruits.remove("coconut")
fruits.clear()

# Membership checks using Set Efficiency
fruit = input("Enter a fruit to search for: ")

if fruit in fruits:
    print(f"{fruit} was found")
else:
    print(f"{fruit} was not found")
