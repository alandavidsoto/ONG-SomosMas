## Test Suite:  Organization Form
----

#### Implications:
- Component ```<UpdateOrganizationDataForm />```
- Formik error handling and validations.
- Check if "submit is successful if all fields are valid" 

#### Test ID: OT80-154

##### Previous requirements:
- Import the component and testing libraries methods (React-Testing Library & Jest).


| Description | How to made the test | Expected result | Result | Comments |
| ------ | ------ | ------ | ------ | ------ |
| Must show error messages after submitting with empty values | Delete value of input, then click on submit button | Show multiple error messages | PASS | - |
| After a successful submit, the redux dispatch function should be called| Select and Type valid values for inputs, then click submit | The Redux dispatch function is call | PASS | The submit function of the form calls the store.dispatch function and saves the data in the store| 

-----
-----