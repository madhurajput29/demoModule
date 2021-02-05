# DemoModule
## Contents

-   [Start Application](#start-application)
-   [Usage](#usage)
-   [Testing](#testing)

## Start Application

First, we need to install the dependencies of the project.

Install all the dependencies:
```console
npm install
```

## Usage

This module provides a findServer(serverArray) function which accepts array of server information and return the available server with the lowest priority.
The same array of server is as follows:
```console
[
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://offline.kratikal.com",
        "priority": 2
    }
]
```

For example, if we execute findServer() function with above same array, it will return below response:
```console
    {
        "url": "http://google.com",
        "priority": 4
    }
```

## Testing

To run tests, issue below command in the root directory of project:

```console
npm test
```

For manual testing, open ./test/manual-test.js file and update the serverArray variable with desired payload and issue below command in the root directory of project:
```console
npm start
```