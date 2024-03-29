## API Description
This API is a simple Image resizing App where you can enter the image details in the URL and then the resized image is created for you.
Image details include the Image's name, width, and height.
Some validation is carried out on the entered parameters.


## The Used Technology 
#### Sharp is used for the image's resizing. 
#### Typescript is used for coding.
#### validator is used for validations.
#### Eslint is used for linting.
#### prettier is used for formatting.
#### Jasmine/supertest are used for Unit testing.
#### Nodemon utility is used to detect code changes.
#### Express is used for routing and HTTP utility methods.

## CMD Used
#### npx prettier index.ts --check
#### npm run start
#### npm run build
#### npm run test 
#### node build/index

   
-----------------------------------------------------------------------------------

## API Test URL
####  API Root URL
http://localhost:8080
####  API URL to enter Image details
http://localhost:8080/api?filename=encenadaport.jpg&width=100&height=100
####  API page test with no image details
http://localhost:8080/api
-------------------------------------------------------------------------------------

 
