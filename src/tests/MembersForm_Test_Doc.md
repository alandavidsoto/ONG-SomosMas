## Test Suite:  Create / Edit Members with members Form 
----


#### Implications:
- Component ```<CreateEditMembersForm member={member}/>```
- Formik error handling and validations.
- Differentiate through props if the form will create or edit a member.
- Check if requests are made successfully.

#### Test ID: OT80-153
 
##### Previous requirements:

- Import the component, testing libraries (React-Testing Library & Jest).
- Define onSubmit mock function
- Since the component uses CKeditor, before each test render the component using waitFor to ensure a properly renderization.
- By default the component will not receive a Member.

| Description | How to made the test | Expected result | Result | Comments |
 ------ | ------ | ------ | ------ | ------ 
| When a Member is not received by props the form has a submit button with the text 'Create Member' | Select the submit button | The button is found and has a text "Create Member" | PASS | - |
| When a Member is received by props the form has a submit button with the text 'Edit Member' | Select the submit button | The button is found and has a text "Edit Member" | PASS | - |
| When a submit is requested with invalid fields, errors appear on the form | Select and click submit button, then select all errors by text | The errors are found in the document | PASS | - |
| Can't submit if the form has errors | Select the submit button and click on it | Submit must been called once and with no arguments  | PASS | - |
| Can create a new member | Select the all input fields and complete them with the newMember object value, then click submit | After submit is successful, the form is resetted to initial state and the fields are empty| PASS | - |
| Can edit a new member | Select the an input field and clear its value, then complete with updated member information, then click submit | After submit is successful, the form is resetted to initial state and the fields are empty| PASS | - |