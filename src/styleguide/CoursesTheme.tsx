import { createTheme } from "@mui/material";

export const CoursesTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 744,
      md: 1025,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    background: {
      default: '#F4F5FF',
    },
    primary: {
      main: "#39848A",
    },
    secondary: {
      main: "#64f5e9",
    },
    success: {
      main: '#64f5b1',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: 500,
          borderRadius: "8px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#39848A',
          padding: '11px 24px',
          '&+.MuiDialogContent-root': {
            paddingTop: '24px !important',// Because of issue in Mui 5
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"Open Sans", sans-serif`,
        },
        h1: {
          fontSize: "40px"
        },
        h2: {
          fontSize: "32px"
        },
        h3: {
          fontSize: "28px"
        },
        h4: {
          fontSize: "24px"
        },
        h5: {
          fontSize: "20px"
        },
        h6: {
          fontSize: "18px"
        },
        body1: {
          fontSize: "16px"
        },
        body2: {
          fontSize: "14px"
        },
      },
    }
  }
});