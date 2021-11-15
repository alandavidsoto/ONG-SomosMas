## Test Suite:  Create / Edit News with NewForm
----


#### Implications:
- Component ```<CreateEditNewForm>```
- Formik error handling and validations.
- Differentiate through props if the form will create or edit a new.
- Check if requests are made successfully.

#### Test ID: OT80-151
 
##### Previous requirements:

- Import the component, testing libraries (React-Testing Library & Jest).
- Define onSubmit mock function
- Since the component uses CKeditor, before each test render the component using waitFor to ensure a properly renderization.
- By default the component will not receive a New.

| Description | How to made the test | Expected result | Result | Comments |
 ------ | ------ | ------ | ------ | ------ 
| When a New is not received by props the form has a submit button with the text 'Crear novedad' | Select the submit button | The button is found and has a text "Crear novedad" | PASS | - |
| When a New is received by props the form has a submit button with the text 'Editar' | Select the submit button | The button is found and has a text "Editar" | PASS | - |
| When a submit is requested with invalid fields, errors appear on the form | Select and click submit button, then select all errors by text | The errors are found in the document | PASS | - |
| Can't submit if the form has errors | Select the submit button and click on it | Submit must been called once and with no arguments  | PASS | - |
| Can create a New | Select the all input fields and complete them, then click submit | After submit is successful, the form is resetted to initial state and the fields are empty| PASS | - |