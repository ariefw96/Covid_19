# BlanjaIn React-Native

## Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements-for-development)
- [Installation](#installation-for-development)
- [Screenshot](#screenshot)
- [Related Project](#related-project)

## Description

COVID 19 DATA CENTER is an mobile App that can be used to report Covid'19 Cases.

## Features

- Add, Read, Edit, and Delete Cases ( User )
- Read all cases ( Admin )
- Read all cases by Region ( Admin )
- Table and Statistic per Region ( Admin )
- Notification when new Victim cases added ( Admin )

## Requirements for Development

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactNative`](https://reactnative.dev/)
- [`Socket.io`](https://socket.io/)
- [`Backend`](https://github.com/ariefw96/firebase_covid)


## Installation for Development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/ariefw96/blanjaIn-React-Native.git`
3. Open the folder and type `npm install` or `yarn install` for install dependencies from package.json
4. Create file **_.env_** in root directory with the following contents :

```bash
BASE_URL = "your_backend_API_URL"
```

Example :

- http://host_backend:port_backend is http://localhost:8000

so, you can write in .env file like this :

```bash
BASE_URL = "http://localhost:8000"
```

5. Before run this project, you must configure and run backend. You can find backend for this project [here](https://github.com/ariefw96/firebase_covid)
6. Type `npm run server` in terminal for running backend.
7. If you want to build this project, type `react-native start --reset-cache` then `react-native run-android`.

## Related Project

**restful-API**


[`BlanjaIn-restAPI`](https://github.com/ariefw96/firebase_covid)



