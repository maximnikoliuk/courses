import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './elements/Header/Header';
import CoursesPage from "./pages/CourcesPage/CoursesPage";
import Course from "./pages/Course/Course";
import NotifSnackbar from "./elements/Alerts/NotifSnackbar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<Course />} />
        {/*<Route path=”*” element={<NotFound />} />*/}
      </Routes>
      <NotifSnackbar />
    </>
  );
}

export default App;
