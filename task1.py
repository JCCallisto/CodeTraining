#!/usr/bin/env python3

def is_valid_password(password):
    if len(password) < 8:
        return False
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    special_characters = "!@#$%^&*()-+"
    has_special = any(c in special_characters for c in password)
    return has_upper and has_lower and has_digit and has_special
password = input("Enter your password: ")
if is_valid_password(password):
    print("Password is valid.")
else:
    print("Password is invalid. it is missing one or more of the following: uppercase letter, lowercase letter, digit, special character, or is less than 8 characters long.")
