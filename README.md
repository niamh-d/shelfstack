# Shelfstack

## What

A student group project by Elis Mätlik ([@vikatimees](https://github.com/vikatimees)), Sian Fairley ([@sianfairley](https://github.com/sianfairley)) and Niamh Doyle.

## Running

### Start expresss server

1. In the terminal run:

```
npm start
```

Don't kill it; let it run.

### Start frontend dev server

2. In a fresh, second terminal run:

```
cd client
npm run dev
```

Don't kill it; let it run.

### Run mysql

3. In a third terminal run:

```
mysql -u root -p
<enter your mysql password>
USE shelfstack;
```

Or if you already have set up mysql so you skip entering password:

```
mysql
USE shelfstack;
```

Fin!

## Setting up project

### Open project in VSCode

1. Once the project is on your machine, drag the folder and drop it in VSCode to open it or run the [shortcut](https://www.freecodecamp.org/news/how-to-open-visual-studio-code-from-your-terminal/):

```
cd <path to project directory>
code .
```

### Add DOT env with your DB password

2. Create a .env file at the top level of your project with the following (all other details are already in the model/database.js file)

```
DB_PASS=<your password>
DB_USER=<your username>
```

### Create DB

3. Open up the terminal in VSCode and run

```
mysql -u root -p
<enter your mysql password>
CREATE DATABASE shelfstack;
```

Or if you already have set up mysql so you skip entering password:

```
mysql
CREATE DATABASE shelfstack;
```

You can kill terminal.

## Installation steps

### Install backend packages and set up db tables and populate with initial data

1. In the terminal run:

```
npm i
npm run migrate
```

### Install frontend packages

2. In the same terminal run:

```
cd client
npm i
```

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
