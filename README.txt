Adam Langevin
100935879

Versions:
  Node: v10.15.1
  Test Platform: Windows 10 Home
  Test browser: Chrome

Installation:
  Use npm install to install dependent node modules.

Launch:
  Use npm start to launch the server, the server will be on
localhost:3000.

Testing:
  To test the server the following links can be used in a browser
to reach it.
http://localhost:3000
http://localhost:3000/
http://localhost:3000/recipes
http://localhost:3000/recipes.html
http://localhost:3000/index.html

  To test the ability to query the server from the URL the Server
takes input of the form
http://localhost:3000/recipes?ingredient={ListOfIngredients}
where the ListOfIngredients is a comma separated list of ingredients
to be sent to the Food 2 Fork API.

Issues:
  No Known major issues.
