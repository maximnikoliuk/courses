import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from './redux/store';
import './index.scss';
import { CoursesTheme } from './styleguide/CoursesTheme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={CoursesTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
