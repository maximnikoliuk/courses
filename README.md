# This application is a light version of the idea how may look an app for learning something

## Technologies used:
 - React + TypeScript
 - Material UI 5 for UI components
 - react-router-dom for routing
 - @reduxjs/toolkit to write Redux logic
 - Sass for styles (but 99% of the styles are covered by MUI, some of them are overridden with custom style theme)
 - Firebase for auth (firebase package for React) and hosting
 - Firestore as a DB

    Tests coverage is not implemented, but idea was RTL, Jest. Also needed good error handling, currently only few nofifications appear when error.

## Pages
 - Page with the list of courses. Included list of courses (Course includes title, short description,
   duration(amount of lessons), language, level(green, orange, red and black colors)) and filters (possibility to filter by title, level and language).
   List is saved in redux store and updates each time when any filter is changed. Clicking by 'View course' button we go to the page of the course.
 - Page of the course. Includes the same title, a large description (actually not very large) and section with comments.
   Only authorized users may leave the comments. Course data is not saved in redux, it is being loaded by id each time we open the page
   (to simulate real request to DB to load the whole data).
 - Create account/Login. It is a pop up with email/password fields for login and also display name for sign up (name is displayed when user leaves a comment).
   This is done with firebase.

   All pages are responsive.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Tests coverage is not implemented yet. RTL with Jest should be enough

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
