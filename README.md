# Classroom Discussion Forum (Backend)

_Classroom Discussion Forum_ is a platform for instructors and students to collectively solve doubts of other students.

**Heroku URL:** [https://discuss-backend-tfew.herokuapp.com/api/v1/](https://discuss-backend-tfew.herokuapp.com/api/v1/)

## Contributors

- Anwesa Basu(basu.anw@northeastern.edu)
- Het Chetan Shah (shah.het2@northeastern.edu)
- Shubham Atul Parulekar (parulekar.s@northeastern.edu)
- Swapnendu Majumdar (majumdar.s@northeastern.edu)

## Iteration 3

#### Notes:-

1. As a part of this iteration, we have mainly implemented comment and question edit capabilities.

### Contribution

- **Anwesa Basu**

  - [Fetch all comments](#fetch-all-comments)
  - [Delete existing Comment](#delete-existing-comment)

- **Het Shah**

  - [Updated get all questions api](#updated-get-all-questions)
  - Integrated all the branches into main and resolved merge conflicts

- **Shubham Parulekar**

  - Naming Fixes

- **Swapnendu Majumdar:**
  - [Post new comment](#post-new-comment)
  - [Update existing comment](#update-existing-comment)

### Fetch all comments

#### Activities:-

1. Fetching all the comments of a post based on questionId.
2. Creation of collection comments in database.
3. Connection with backendAPI with mongoDB to get the data back.

**URL** : `api/v1/comments/questionId`

**METHOD** : `GET`

![MicrosoftTeams-image](https://media.github.ccs.neu.edu/user/11304/files/57bb2420-2f51-4d6c-b17f-032611d7b020)

### Delete existing comment

#### Activities:-

1. Delete a specific comment of a post based on questionId and userId.

**URL** : `api/v1/comments/`

**METHOD** : `DELETE`

![MicrosoftTeams-image (1)](https://media.github.ccs.neu.edu/user/11304/files/4eddcb7d-93e0-4138-8ec3-b884bbc675c7)

### Updated Get All Questions

#### Activities:-

1. Now returns comments along with the question

**URL** : `api/v1/questions`

**METHOD** : `GET`

![Get all Questions API](./docs/iter3-get-all-questions.png)

### Post New Comment

#### Activities

1. Creation of post comment API for posting a new comment.
2. Sending the response back to frontend by establishing backend connection.

**Method** : `POST`

**URL** : http://localhost:5000/api/v1/comments/

![MicrosoftTeams-image (3)](https://media.github.ccs.neu.edu/user/11304/files/ab87d9bc-dac7-42a6-8a74-8968c357b2ec)

### Update Existing Comment

#### Activities

1. Update an existing comment based on commentId

**Method** : `PUT`

**URL** : http://localhost:5000/api/v1/comments/

![MicrosoftTeams-image (4)](https://media.github.ccs.neu.edu/user/11304/files/24ace69f-ef22-4414-83ee-088b6d96eb46)

## Iteration 2

#### Notes:-

1. We have implemented some more APIs and we have added few of them as part of this interations.
2. We have created our individual git branches for individual functionalities and have integrated and merged them all in the main branch.
   (The individual branches for iteration 2 looks like :- f-name-itr2)

### Contribution

- **Anwesa Basu**

  - [Add new user_data](#add-a-new-user)
  - [User login](#login-existing-user)
  - [Fetch comments](#fetch-comments)

- **Het Shah**
  - [Get all Questions](#get-all-questions)
  - [New_question](#post-new-question)
  - Integrated all the branches into main and resolved merge conflicts
- **Shubham Parulekar**
  - [all-class-curd-operations](#class-curd-all)
- **Swapnendu Majumdar:**
  - [post_comment](#post-comment)

### Add a new user

#### Activities:-

1. Creating new DB collection named Users.
2. Building connection with MongoDB with backend API for CURD operation Create.
3. Successfully sending back the response to front end.
4. Validating an existing user.

**URL** : `api/v1/signup`

**METHOD** : `POST`

![image](https://media.github.ccs.neu.edu/user/11302/files/9922e4bd-8907-49c6-882b-b75b9ab21257)

Validating Existing User:-

![image](https://media.github.ccs.neu.edu/user/11302/files/f6dd5ce6-eee3-47a0-a465-007c4525cb35)

### Login existing user

#### Activities:-

1. Validating an existing user for user login(If user is not existing login will fail)
2. Connection with MongoDB for validation of the login data back to the frontend.

**URL** : `api/v1/signin`

**METHOD** : `POST`

![image](https://media.github.ccs.neu.edu/user/11302/files/8a1a3227-3f99-4f98-bd5c-5bb62edd2946)

### Fetch comments

(Not deployed in heroku,commited to individual github branch)

#### Activities:-

1. Fetching all the comments of a post based on questionid.
2. Creation of collection comments in database.
3. Connection with backendAPI with mongoDB to get the data back.

**URL** : `api/v1/comments/questionId`

**METHOD** : `GET`

![image](https://media.github.ccs.neu.edu/user/11302/files/77af571a-de66-4453-bd86-71e1ed01a55d)

### Get All Questions

#### Activities:-

1. Creation of collection question in DB
2. Fetching all the questions from question collection
3. Establsihing connection with mongoDB with backend API

**URL** : `api/v1/questions`

**METHOD** : `GET`

![MicrosoftTeams-image (3)](https://media.github.ccs.neu.edu/user/11302/files/557af343-bc38-4c49-8235-1045ed4157a4)

### Post new question

#### Activities

1. Creation of collection question in DB.
2. Posting a new question entered by the user and sending the response back to the frontend.

**URL** : `api/v1/questions/newPost`

**METHOD** : `POST`

![MicrosoftTeams-image (3)](https://media.github.ccs.neu.edu/user/11302/files/543c2497-2cb7-4853-98ba-23428ef7a86a)

### class-curd-all

#### Activities

1. Creation ofall class CURD operations including create,delete,update,get etc.
2. Handling user DB operations related to class

**Method** : `GET`

**URL** : localhost:5000/api/v1/class/62f1d49732d7f835d3c07a96

![itr2-classapi](https://media.github.ccs.neu.edu/user/11302/files/3588ab2f-0c04-4cad-a14f-d5dd0ede9080)

**Method** : `DELETE`

**URL** : localhost:5000/api/v1/class

![itr2-classapidelete](https://media.github.ccs.neu.edu/user/11302/files/2bac5970-77a8-4003-b10f-a985938d9ede)

**Method** : `JOIN`

**URL** : localhost:5000/api/v1/class/join

![itr2-classapijoin](https://media.github.ccs.neu.edu/user/11302/files/849ed608-cd05-4d23-ae76-77b31cf3e7f7)

**Method** : `UPDATE`

**URL** :localhost:5000/api/v1/class/

![itr2-classapiupdate](https://media.github.ccs.neu.edu/user/11302/files/6ddfdbc6-0e16-4274-8fda-5ded974953ed)

### post-comment

#### Activities

1. Creation of post comment API for posting a new comment.
2. Sending the response back to frontend by establishing backend connection.

**Method** : `POST`

**URL** : http://localhost:5000/api/v1/comments/

![MicrosoftTeams-image (5)](https://media.github.ccs.neu.edu/user/11302/files/224bbc65-9b99-42b2-a1a1-cfe58f2d97e3)

## Iteration 1

### Contribution

- **Anwesa Basu**
  - [Register a user](#registering-a-new-user)
  - [View an existing Post](#view-an-existing-post)
- **Het Shah**
  - [List of Questions](#list-of-questions)
  - Integrated all the branches into main and resolved merge conflicts
- **Shubham Parulekar**
  - [Create class](#create-class)
  - [Join class](#join-class)
  - [Get universities](#get-universities)
- **Swapnendu Majumdar:**
  - Log an existing user into the system. [Jump](#page-login)
  - Create a new post. [Jump](#page-create-a-post)

### Registering a new user

Saves the information of a new user.

**URL** : `api/v1/signup`

**METHOD** : `GET`

**Accepted Params** :

```json
{
  "emailId": "String. Required.",
  "username": "String. Required.",
  "password": "String. Required."
}
```

![UserRegistrationAPI](https://media.github.ccs.neu.edu/user/11302/files/d369ce12-91ad-4360-9cfe-9c9d49ae2f49)

### View an existing post

Shows a selected post details.

**URL** : `api/v1/questions/id/:id`

**METHOD** : `GET`

**Accepted Params** :
Enter the :id to send an id. Get does not require a JSON body.

![ViewPostPerID](https://media.github.ccs.neu.edu/user/11302/files/c09e5ab5-3ffa-42d7-a721-ff4d42f81f03)

### List of Questions

Returns all the questions that have been asked for the given classroom.

**URL** : `/api/v1/questions`

**METHOD** : `GET`

**Accepted Params** :

```json
{
  "classromId": "Integer. Required.",
  "search": "String. Optional.",
  "page": "Integer. Optional.",
  "perPage": "Integer. Optional."
}
```

![All questions filtered by search response](./docs/iter1-all-question-by-search.png)

### Create class

Creates a class and return its id.

**URL** : `/api/v1/class`

**METHOD** : `POST`

**Accepted Params** :

```json
{
  "user": "User Object. Required.",
  "cDescription": "String. Required",
  "cNumber": "String. Required",
  "cSection": "String. Required",
  "term": "String. Required",
  "university": "String. Required",
  "instructors": "List of String. Optional"
}
```

![All questions filtered by search response](./docs/iter1-create-class.png)

### Join class

Makes a user to join a class and returns the class's id.

**URL** : `/api/v1/class/join`

**METHOD** : `Post`

**Accepted Params** :

```json
{
  "user": "User Object. Required.",
  "cNumber": "String. Required",
  "cSection": "String. Required",
  "term": "String. Required",
  "university": "String. Required",
  "password": "String. Required"
}
```

![All questions filtered by search response](./docs/iter1-join-class.png)

### Get universities

Returns all the questions that have been asked for the given classroom.

**URL** : `/api/v1/universities`

**METHOD** : `GET`

![All questions filtered by search response](./docs/iter1-universities.png)

### _Page:_ Login

Sends the login credentials entered by the user, and fetches their information on succesful sign-in.

**URL** : `api/v1/signin`

**METHOD** : `POST`

**Accepted Params** :

```json
{
  "email": "String. Required.",
  "password": "String. Required."
}
```

![image](https://media.github.ccs.neu.edu/user/11304/files/81f98a60-fba5-4734-8be8-3620f2921f13)

### _Page:_ Create a post

Creates a new post and returns its id.

**URL** : `/api/v1/questions/newPost`

**METHOD** : `POST`

**Accepted Params** :

```json
{
  "_id": "Integer. Required.",
  "title": "String. Required",
  "description": "String. Required"
}
```

![image](https://media.github.ccs.neu.edu/user/11304/files/5627d7ac-e02c-4a67-809c-20f55ced5e77)
