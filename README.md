<img src="https://cdn.loom.com/images/originals/e067d531174048a3b5860d4e255f5383.jpg?Expires=1637353629&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy9lMDY3ZDUzMTE3NDA0OGEzYjU4NjBkNGUyNTVmNTM4My5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MzczNTM2Mjl9fX1dfQ__&Signature=Kuh03WL22W5WroPiwgNPfRZefxqeIfLRZxDWfFMWNBddhRo~6l9S0qSvGmvxhiZKUMhgWew13bbM3SC6D4LZq~A5dQqosEiOf76pKX5BjyPOi6F~FDFuaQltG~6Zpm2x1FykRcutAyeI4oWPB-HSxd8BIiJpmYcck6C8sJcHvmE~MfHwrvglYo6d72uhDRXjZWWJHnaqSAukkIKSQghhvpZL1gZmAfqgIqyyUzipIm5A~-ZUQLyKA7I89~T3MQZ72RF0RyUKb2ysrJEOuv6Qnazaa-wtP8Lzm~Wcgn~7psuW1vSDK08t6ukEGOveofV0As0NovdKEUyP6EJWU1JpEQ__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ"  width="350" />

# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Setup Alert`

The SetupAlert.js file export a "sweetAlert" function .

¿how to use?

when you need to offer feedback to the user. You can call the sweetAlert function passing it the following parameters:

#### `sweetAlert("success")`

#### `sweetAlert("error")`

#### `sweetAlert("info", text)`

### Setup Spinner

The SetupSpinner.js file provides a custom "useSpinner" Hook.

<i> const spinner = useSpinner() </i>

this customHook return an object with the next properties:

- state: inicialized in false .<br />
- set: change the state to true <br />
- remove: change the state to false<br />
- loader: show the spinner <br />

¿how to use?

- before starting an http request use the "set" method <br />
- after it returns the data. use the "remove" method <br />
- when dynamically displaying the data extracted from a web service. we must return the following: `return ({ (spinner.state)? spinner.loader : data.map (callback) })`

### Skeleton component

```
import Skeleton from "src/components/Skeleton"
```

#### Props:

- variant ( "rectangle" | "circle" | "text" ):
  - rectangle: render a rectangle
  - circle: render a perfect circle
  - text: simulate text
- width (number):
  Must be a number and it will be a measure in pixels, except for "text" where it will be a percentage % measure. If width is missing Skeleton will render with 100% width of it's parent element.
- height (number):
  Must be a number and it will be a measure in pixels. If height is missing Skeleton will render with 100% height of it's parent element.
- animation ("none"):
  Default animation is pulse but you can deactivate it passing "none" to animation prop.
- className (string):
  Any className you want to pass to Skeleton element.

## Setup Progress

This component receives a boolean type prop called "progressStatus", if it does not receive it, by default it will show the component.

    Options for progressStatus:
     - true: It will show the component
     - false: It hide the component

**Example**:
You can use a useState:
const [statusProgress, setStatusProgress] = **useState**(false);

- setStatusProgress(true) --> It will show the component
- setStatusProgress(false) --> It hide the component

<SetupProgress **progressStatus**={TypeBoolean} />
