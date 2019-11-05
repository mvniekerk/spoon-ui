[![npm version](https://badge.fury.io/js/%40grindrodbank%2Fspoon-ui.svg)](https://badge.fury.io/js/%40grindrodbank%2Fspoon-ui)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FGrindrodBank%2Fspoon-ui.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FGrindrodBank%2Fspoon-ui?ref=badge_shield)
# spoon-ui
React components that are silver and lickable.

## Run the demo app locally
To run the demo app on your machine, you will need [Node.js](https://nodejs.org/en/download/package-manager/), [yarn](https://yarnpkg.com/lang/en/docs/install/) and [Npm](https://www.npmjs.com/get-npm) installed. Then:

```bash
yarn; npm start
```

## Build the Docker image
To build the Docker image:
```bash
docker build . -t spoon-ui:latest
```

## Run the spoon-ui demo application using Docker
To run the demo application on port 80 using Docker:
```bash
docker run -p 80:80 spoon-ui:latest
```

Then open your browser then at this address: http://localhost:80 

## Usage
 Look at reusable components in `lib/components`. 
 
 These can be imported for example like this:

```javascript
import { Alert } from spoon-ui/components
```
 See the demo app for detailed usage examples.

## Folder structure

The folder structure looks like this:

<pre>── <font color="#729FCF"><b>spoon-ui</b></font>
   ...
    ├── <font color="#729FCF"><b>app</b></font>              - Demo application using the components and classes with example usage.
    ├── <font color="#729FCF"><b>lib</b></font>              - Folders containing reusable classes.
    │   ├── <font color="#729FCF"><b>components</b></font>   - A collection of reusable UI components. 
    │   ├── <font color="#729FCF"><b>config</b></font>       - Helper classes for configuring storage, icons, notifications.
    │   ├── <font color="#729FCF"><b>reducers</b></font>     - State managers / reducers. 
    │   │                  Currently for locale changes, route position 
    │   │                  and the side menu component
    │   └── <font color="#729FCF"><b>util</b></font>         - Miscellaneous util classes.
   ...
 </pre>




## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FGrindrodBank%2Fspoon-ui.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FGrindrodBank%2Fspoon-ui?ref=badge_large)