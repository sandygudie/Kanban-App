# Kanban-Board

The Kanban App is a project management application for managing and tracking project development progress similar to Trello and Asana. The projects are created as boards, and each board shows the progress of the project. The board includes tasks and subtasks for the project. 

## Live Site
https://kanban-management-app.netlify.app/

## Views
<img width="1280" alt="Screenshot 2023-12-11 at 10 04 45" src="https://github.com/sandygudie/Kanban-App/assets/54219127/d6ff1bbd-8dbf-490a-ae5f-3a2edc207ff3">

![image](https://github.com/sandygudie/Kanban-App/assets/54219127/3edd0818-9867-4573-893d-1aaf0e561097)


<br/>

## Installation

1. Clone this repository into your local machine:
```
git clone https://github.com/sandygudie/Kanban-App.git
```
2. Install dependencies 
```
yarn install
```
3. Start the application by running the start script.
```
yarn run dev
```
4. Run test.
```
yarn run test
```


## Set up with docker image
```
docker pull sandy8169/kanban:latest
```

## Features
Users are able to:

- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Create, read, update, and delete boards and tasks.
- Receive form validations when trying to create/edit boards and tasks.
- Mark subtasks as complete and move tasks between columns.
- Hide/show the board sidebar.
- Toggle the theme between light/dark modes.
- To drag and drop tasks to change their status and re-order them in a column.
- Keep track of any changes, even after refreshing the browser.

## Technologies Used
The application is built with 
* Vite ReactJS
* Redux Toolkit
* TypeScript
* TailwindCSS
* Formik
* Yup
* Chakara-UI
* Cypress
* Eslint and Prettier
* Docker Compose
* GitHub Action
* Netlify


## Deployment pipeline(CI/CD)
 - From GitHub Actions to Netlify
 - From GitHub Actions to Dockerhub

