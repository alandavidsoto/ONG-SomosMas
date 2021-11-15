## Test Suite:  Contact Form 
----

#### Implications:
- Component ```<ContactForm />```
- Formik error handling and validations.
- Check if "submit is successful if all fields are valid" 

#### Test ID: OT80-150

##### Previous requirements:
- Import the component and testing libraries methods (React-Testing Library & Jest).


| Description | How to made the test | Expected result | Result | Comments |
| ------ | ------ | ------ | ------ | ------ |
| Must show error messages after submitting with empty values | Click on submit button | Show multiple error message "Requerido" | PASS | - |
| Must show error phone messages if number is too short | Select and type in phone input field a number with less than 8 digits, then click submit button | Show error message "Minimo 8 caracteres" | PASS | - |
| After a successful submit, the form should reset | Select and Type valid values for name, email, phone and message inputs, then click submit | The values of the inputs are reseted | PASS | The submit function of the form, after validation and success connection with the api, resets the form| 

-----
-----