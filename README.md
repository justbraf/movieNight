# Setup Guide

### Installing dependencies
After cloning the repository, run the followwing commands in a terminal from the project folder

*npm i* - to install the dependecies listed in the package.json file\
*npm i -D* - to install the development dependecies listed in the package.json file\
Copy your *config.js* file from your other app, and ensure your variable names match those in the app.

## Using the API
### The **Show by ID** route
Returns the first page of results from the database\
Route: http://localhost:3000/info/(id) \
Method: GET\
Expected parameter: (id) is a 24-character hexadecimal string

### The **Show All** route
Returns the first page of results from the database\
Route: http://localhost:3000/(type) \
Method: GET\
Expected parameter: (type) is the text movie or series

### The **Show All by Page Number** route
Returns a specified page of results from the database\
Route: http://localhost:3000/(type)/(p#) \
Method: GET\
Expected parameters:
- (type) is the text movie or series
- (p#) where # is an integer