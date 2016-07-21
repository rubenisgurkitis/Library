# Library
Library single page web app, fed with mock data using json-server.

####Requisites to run the app
To install all dependencies you will need to have installed *npm*. First, you will need to install *Node.js* and after that, run the following command to ensure that you are using an updated version of *npm*
```
> sudo npm install npm -g
```
With this, everything should be ready for running the app with the command *gulp*, but sometimes it can give some errors on Windows machines. In this case, a solution can be found in this [stackoverflow post](http://stackoverflow.com/a/24042936).

####How to run the app

Checkout this repo
```
> git clone https://github.com/rubenisgurkitis/Library.git
```
Browse to the root folder
```
> cd Library
```
Install dependencies
```
> npm install
```
Start the mock server
```
> json-server --watch db.json
```
Start the gulp process
```
> gulp
```
Your default browser will open automatically!

If no content is loaded and in the console appears an error related to an unexpected **<**.
Cancel **gulp** and run it again. I'm working to solve this problem but I still couldn't find the solution.  
