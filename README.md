# Full Stack

Template for a full stack website using the MERN stack. This README should get you set up and ready to code!

### Prerequisites

-   [Node](https://nodejs.org/en/download/)
-   [npm](https://www.npmjs.com/)

### Installing

Software that you need to install. Use the commands below to install these.

-   [MongoDB](https://docs.mongodb.com/manual/installation/)
-   [Webpack](https://www.npmjs.com/package/webpack)
-   [Nodemon](https://nodemon.io/)

```
npm install -g mongodb
npm install -g webpack
npm install -g nodemon
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
First, navigate to the directory (folder) where you want the project to live. (e.g. /documents/code/). Example:

```
cd documents/code
```

Now clone the project into that directory. If it doesn't work, make sure you have authorization to access the repo.

```
git clone https://github.com/svdorn/full-stack.git
```

Now navigate into the project and install all the dependencies.

```
cd full-stack
npm install
```

Now you'll have to add a few things wherever your PATH is set. If you don't know where that is and are working on a Mac, it may be in .bash_profile.
To edit your PATH, enter the following:

```
vim ~/.bash_profile
```

Add the following things. To start editing in vim, press "i" - To finish, press "escape" then ":wq"
Make sure not to change the spacing on any of these, that'll break them!

Top thing: tells Node that you are going to be working on a development server.
Second thing: lets you locally test any emails that get sent (replace the example with your own email address).
Third thing: tells the code what url you'll be using.

```
export NODE_ENV=development
export SITE_NAME=localhost:8081
```

Now you're ready to run the site locally! Open a new terminal window/tab, navigate to your full-stack directory, and run the following command. This will run webpack, which bundles up the files so they can be served.

```
npm run dev
```

Open another new terminal window/tab, navigate to your full-stack directory, and do the following. This runs nodemon, which will keep your local server running and will update every time you save. (Exception - saving .css files doesn't always force an update, so you may have to save some other file as well.)

```
npm run nodemon
```

Go to localhost:8081 and the site should be up. Nice!
Now for a couple random things. Synk is used to check for security vulnerabilities in our npm packages, so install snyk globally like so:

```
npm install -g snyk
```

Use Atom as your text editor. If you have something else that you prefer, go for it, but know that it may make style standardization a little tougher.
If you are using Atom (which you can download from https://atom.io/), go into your preferences and install the package "Prettier." Then make sure it's enabled and press "shift+command+p". Search for "Prettier," then press "enter" on the option that toggles Format on Save. This will format your style so that everyone is using the same conventions.

You're all set up!

## Running the tests

```
npm test
```

## Deployment

You can configure to deploy how you would like, I typically use AWS and AWS Elasticbeanstalk is a good easy place to start (it manages everything for you).

## Built With

-   [React](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Node](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Webpack](https://webpack.js.org/)
-   [Babel](https://babeljs.io/)
-   [Redux Form](https://redux-form.com/7.2.0/)
-   [React-Router](https://github.com/ReactTraining/react-router)

## Author

-   **Stephen Dorn**
