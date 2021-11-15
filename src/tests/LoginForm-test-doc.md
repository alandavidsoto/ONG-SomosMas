## Test Suite:  Login Form 
----

#### Implications:
- Component ```<LoginForm />```
- Formik error handling and validations.
- Check if "isAuthenticated" property from auth reducer changes to "true" 

#### Test ID: OT80-23-148

##### Previous requirements:
- Import the component, testing libraries (React-Testing Library & Jest).
- Import the Redux store.


| Description | How to made the test | Expected result | Result | Comments |
| ------ | ------ | ------ | ------ | ------ |
| Must show error messages and avoid form request after submitting with empty values | Click on submit button | Show error message "No puedes dejar el campo email vacio" Show error message "No puedes dejar el campo contraseña vacio" Don't change isAuthenticated property from store | PASS | - |
| Must show error messages after focusing an input and blurring it | Click on email input, then click outside. Click on password input, then click outside | Show error message "No puedes dejar el campo email vacio" Show error message "No puedes dejar el campo contraseña vacio"  | PASS | - |
| Must show error message after typing an invalid email | Click on email input and type a invalid email format | Show error message "Introduce un email valido" | PASS | - |
| Must show error message when password is shorter than 6 characters | Click on password input and type anything below 6 characters | Show error message "Debe contener al menos 6 caracteres" | PASS | - |
| Must show error message when password doesn't contain a letter | Click on password input and type anything without a letter | Show error message "Debe contener al menos una letra" | PASS | - |
| Must show error message when password doesn't contain a digit | Click on password input and type anything without a digit | Show error message "Debe contener al menos 1 Digito" | PASS | - |
| Must show error message when password doesn't contain a symbol | Click on password input and type anything without a sybom (#@-/) | Show error message "Debe contener al menos 1 simbolo(#@-/)" | PASS | - |
| Must set "isAuthenticated" (auth state in redux) to "true" | Type a valid email on email input, same on password and submit | Dispatch an "loginExample" action. Sets "isAuthenticated" to true | PASS | At the moment API is not connected with this form. Submit will change "user.isAuthenticated" and will set "user.data" with example values in store  | 

-----
-----
