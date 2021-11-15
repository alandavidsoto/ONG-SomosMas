## Test Suite:  Register form
----

#### Implications:
- Component ```<RegisterForm />```
- Formik error handling and validations.
- Check if "isAuthenticated" property from auth reducer changes to "true"

#### Test ID: OT80-147
 
##### Previous requirements:

- Import the component, testing libraries (React-Testing Library & Jest).
- import the redux store 


| Description | How to made the test | Expected result | Result | Comments |
 ------ | ------ | ------ | ------ | ------ 
| should show errors when user submits form with empty fields | Click on submit button | Show error messages | PASS | - |
| should show error message when name contains symbols and numbers except space  | Click on name input and type an invalid name | Show error message "No puede contener numeros y simbolos" | PASS | - |
| Must show error message after typing an invalid email | Click on email input and type a invalid email format | Show error message "Introduce un email valido" | PASS | - |
| Must show error message when password is shorter than 6 characters | Click on password input and type anything below 6 characters | Show error message "Debe contener al menos 6 caracteres" | PASS | - |
| Must show error message when password doesn't contain a letter | Click on password input and type anything without a letter | Show error message "Debe contener al menos una letra" | PASS | - |
| Must show error message when password doesn't contain a digit | Click on password input and type anything without a digit | Show error message "Debe contener al menos 1 Digito" | PASS | - |
| Must show error message when password doesn't contain a symbol | Click on password input and type anything without a sybom (#@-/) | Show error message "Debe contener al menos 1 simbolo(#@-/)" | PASS | - |
| It should show an error message when the repeatPassword field is not equal to the password field | Click the repeatPassword input and type any that is not equal to the password input  | Show error message "Las contraseña deben ser iguales" | PASS | - |
| Must show an error message when the input checkbox is not clicked  | Click on submit button | Show error message "Debes aceptar los términos y condiciones" | PASS | - |
| Must set "isAuthenticated" (auth state in redux) to "true" | Type a valid name on name input, a valid email on email input, same on password and same on repeatPassword,click the checkbox. then submit | Dispatch a "registerExample" action. Sets "isAuthenticated" to true | PASS | At the moment API is not connected with this form. Submit will change "user.isAuthenticated" and will set "user.data" with example values in store  |

-----
-----