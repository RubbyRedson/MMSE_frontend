# Setup
## Install
- `git clone <project.git>`
- `npm install`

## Start
The site is build with webpack into a minified javascript file into the `dist` folder. In order to have hot realoading and building your source into this folder you can use webpack. 

Everything should be setup for you via the `package.json` file. If you look in the scripts section of you packacke.json file you will see the following tag. 

```
"start": "webpack-dev-server --port 3211"
```

This will start webpack on `http://localhost:3211` so all you have to do in order to start is run: 

```
npm start
```

This is all you should have to do in order to get started. 