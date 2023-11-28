# Ox Bot

Welcome to the Ox bot Repo, A Discord.js bot created to Play DND in your server

Created With Typescript, Vue3, Scss, Javascript, Google Firebase, and Docker

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="50">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" height="50">
<img src="https://sass-lang.com/assets/img/styleguide/seal-color.png" height="50">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" height="50">
<img src="https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png" height="50">
<img src="https://www.svgrepo.com/show/349342/docker.svg" height="50">

## Features

### Dice roller: The start of it all

* Types of dice
  * D4, D6, D8, D10, D12, D20, D100

* Mutli roll or single roll
* Roll with or without Advantage/ Disadvantage
* Flavor text based on dice/ roll type
* Rolls given in server channel with player called who rolled
* Rolls Neatly formatted in Discord embeds

### Character Sheet Database

* Google firebase as a database to store player character information
* Node-Cache as a cache layer between database and client side
  * Database object is retrieved on first run then copied to cache, and cache is used subsequently dramatically lowering latency
  * Cache TTL is default 1 hr, plenty of time to be used frequently per gaming session before the data is flushed
  * Cache is updated along with database whenever data is updated or deleted
* Database is setup to support multiple characters per player, as such it is cross server if desired

### Character Sheets
* Create, Read, Update, and Delete saved characters
  * View currently active character and list all characters
  * Select character or create if it doesnt exist
* Create a Link to visit the Front end to update stats and info on the character


### Vue 3 Frontend

* Reactive and DRY SPA (no not that kind) frontend for users to enter/modify their character sheets
  * Makes good use of Vue's data binding and for loops to list out the 25 editable fields with litle repeating code
* Uses Vue router to parse the url given from the discord bots slash command to acquire the users ID and character to edit, then push the page to the root /
  * The character is called from the database to edit or create on Vue's mounted lifescyle hook, so the user cannot easily provide an incorrect url or change it later, resulting a clean looking URL
  * Discord links can only send a Url, Id and character infor was needed and a clean Url was desired so Vue parses the paramters and changes the page before the user even knows
* V-Model was used to data bind attributes
* All values are wrapped in a Data Object and sent to the backend for processing
* A 2 second message lets the user know the data was submitted

### Skill Checks & Saving Throws
* Slash commands let the player roll a D20, optionally with Advantage/disadvantage
  * The Cache or Database is queried for the players specific skill modifer and factored into the final result

### Music
* Music Bot integrated from https://github.com/JazzyArmando1234/a-music-bot.git
* Commands to play, pause, skip, change volume, add to queue

### Random

* Slash commands to get random Useless facts from the Random facts API  https://uselessfacts.jsph.pl/
* Shalsh command to get info on Rick N Morty People and Places  https://rickandmortyapi.com/
* And the Chuck norris Jokes API  https://api.chucknorris.io/


# Setup

1. Copy the Repo
2. CD into the Client & Server directories respectively and NPM i to install dependancies and packages
    * For For server, type and ***run tsc*** to compile typescript to the /Dist folder
    * create a ***.env*** file and add your environment Variables
    ```
    clientId = "Client Id Here"
    guildId = "Guild Id here"
    token = "Bot token here"
    ```
3. You can now run the bot for music and dice rolling using the ***index.js*** file in the Dist directory as your entry file

4. Server side go into the Server directory
    * create an ***.env*** file at the root of that directory and add your google firebase keys
    ```
    apiKey = ""
    authDomain = ""
    databaseURL = ""
    projectId = ""
    storageBucket = ""
    messagingSenderId = ""
    appId = ""
    ```

5. You can now run the server and your character sheets database and skill checks are good to go. run using the ***server.js*** entry point

## If Running with Docker

1. Create a ***dockerfile*** at the root of each folder, paste in this or create your own
  * Client keep in mind adding your ENV's at the bottom

```docker
# Use a minimal Node.js 18 base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install required build tools
RUN apk --no-cache add python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --production && npm prune --production

# Copy the application code
COPY . .

# Remove any build artifacts or files not needed for production
RUN rm -rf \
  node_modules/*/test \
  node_modules/*/docs \
  node_modules/*/examples \
  && npm prune --production

# Stage 2: Create a smaller image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy production-ready files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Set environment variables
ENV clientId 
ENV guildId 
ENV token 
ENV authTokenNgrok 

# Specify the command to run your application
CMD ["node", "dist/index.js"]
```
* Server, same except leave out the 3rd section about required build tools, and copy in your server ENVs

2. In each root directory run docker build -p "name you wanna give it, Client, Server, ect" .
3. To run the containers
    * Server: docker run -p 3000:3000 "the name you gave it"
    * Client: docker run --network host "the name you gave it"
4. You Should now have the 2 containers running and working
