# Backend Assessment

Build and deploy a very simple API that does the following

1.  Calculate and return the age of a person, given their date of birth (dob) as query parameters to `GET /howold`

2.  Limit calls to `GET /howold` and prevent excessive usage from potentially ill-configured or malicious integrators. Only allow a maximum of 3 calls per second for each API client/caller

See full details and instructions in this [Google Doc](https://docs.google.com/document/d/1ma5vKz0j34gwI9WYrZddMM1ENlQddGOVFJ5qdSq2QlQ)

## Hey, :wave:

# Sharefood Eligibility Assessment API

# Contents


- ## [Task Implementation](#task-implementationt)
- ## [Built With](#built-with)


### Implementation detail

- Implemented a route with a GET request method to */howold*, which requires a date of birth query paramter 
  with a valid timestamp. It calculates and return the age with the timestamp.

- The above route checks the values of the date of birth and the timestamp to make sure it's in a valid date format.

- It handles and returns errors based on the request status code, within the error handler middleware.

- After validation, we use a third party library, *timeage.js* to format the date appropriately.

- The application endpoint also uses *express-rate-limiter* to manage the requests per seconds and limit it to 3.

### Built With

- Node/Express
- Timeago.js
- express-rate-limiter