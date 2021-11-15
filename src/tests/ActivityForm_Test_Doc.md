## Test Suite:  Create / Update Activities with Activity Form 
----

#### Implications:
- Component ```<FormActivity activity={...activity}/>```
- Formik error handling and validations.
- Differentiate through props if the form will create or update an activity.
- Check if requests are made successfully.

#### Test ID: OT80-160

##### Previous requirements:
- Import the component, testing libraries (React-Testing Library & Jest).
- Define functions that return each input, button or element that will be used on the test.
- After each test make a cleanup.
- Since the component uses CKeditor, before each test render the component using waitFor to ensure a properly renderization.
- By default the component will not recive an Activity.


| Description | How to made the test | Expected result | Result | Comments |
| ------ | ------ | ------ | ------ | ------ |
| Loads and display Activity Form | Select the header of the component | The header is found and has a text "Add activity" | PASS | - |
| Can't submit if the form has errors | Select the submit button and click on it, select the name and image field error message elements | The text error message and the image error message must be on the document, and the submit must been called once and with no arguments  | PASS | - |
| Can create a new activity | Select the header of the component, the name input and type a name, then select the image input and ulpoad an image (jpg or png). Once this is made, select the submit button and click on it. | The header is found and has a text "Add activity". If the form is submitted correctly, all the fields are cleared | PASS | - |
| When an Activity is recived by props the form has a title 'Update Activity | Select the header of the component | The header is found and has a text "Edit activity" | PASS | - |
| When all required fields are complete, can make a form submit and update the Activity | Select the header of the component, the name input and type a name, then select the image input and ulpoad an image (jpg or png). Once this is made, select the submit button and click on it. | The header is found and has a text "Edit activity". If the form is submitted correctly, the form is resetted to initial state and the fields are filled with the original values | PASS | - |

-----
-----
