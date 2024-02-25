# Cointab Assignment

A web app that allows admins/moderators to fetch all the users from the API and perform actions. The assignment is provided by [Cointab](https://www.cointab.net/), a service provider that empowers people and businesses with technology, for the Software Engineer position.

#### The project is deployed [here](https://cointab-assignemnt.netlify.app/).

## Features
- Fetching all the users from the API.
- Ability to add details to the database.
- If the details already exist in the database, you can click on OPEN and perform further actions.
- You can add posts of the user into the database.
- Easily navigate back to the homepage with just a button click.
- Ability to download user's post details in Excel.

## API
- `http://localhost:8000/users`
  - **GET**
  - To fetch all the users.
- `http://localhost:8000/:userId`
  - **GET**
  - To fetch details of the user through userID and find if the user exists in the database or not.
- `http://localhost:8000/addUser`
  - **POST**
  - **Body**
    - User details.
  - Add user details to the database.
- `http://localhost:8000/posts/:userId`
  - **GET**
  - To fetch posts of a user by userID.
- `http://localhost:8000/posts/addBulk/:userId`
  - **POST**
  - Posts details.
  - To add all the posts details to the database.
- `http://localhost:8000/posts/download-in-excel/:userId`
  - **GET**
  - To download the details in Excel.

## Tech Stack
- HTML, CSS, and JS for the frontend.
- Node.js for the backend.
- Mongo Atlas for the Database.

## Snapshot
 ### Home page
![Screenshot (227)](https://github.com/Smoke221/Cointab-Assignment/assets/114225283/4e628624-506a-4866-a535-81b3648876b4)

 ### Posts page
 ![Screenshot (228)](https://github.com/Smoke221/Cointab-Assignment/assets/114225283/6f5a45ee-37d9-40c4-a777-be7f50035644)
