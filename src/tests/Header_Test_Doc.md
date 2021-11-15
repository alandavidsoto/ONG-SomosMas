
 

#### Test ID: OT80-23-149

##### Previous requirements:
- Import the component, testing libraries (React-Testing Library & Jest).
- Import the Redux store.
- Import react-router-dom.
- Import authReducer


| Description | How to made the test | Expected result | Result | Comments |
| ------ | ------ | ------ | ------ | ------ |
|Unauthenticated users| It is verified that the private links are not displayed, but if show public links| There are only the public links and the "login", "Registro" links| PASS|
 |Authenticated users but they are not administrators  | it is verified hide the "Login", "Registro" links and also the "Escritorio" link, but if  show the public links. |There aren't "Login","Registro" and "Escritorio" links in the header. | PASS | - |
|The user is authenticated and is an administrator| It is verified that the "Registration", "Login","Contact" and "Donation" links are hidden and verify that the "Desktop" link is displayed| There are not "Login","Registro", "Contacto","Donación" links but if show the "Escritorio" link  in the header. | PASS | - |

-----
-----