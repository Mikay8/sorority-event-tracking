// theme.js
import { DefaultTheme } from 'react-native-paper';

// Define a custom theme that overrides the default one
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff', // Primary color (blue)
    accent: '#ff4081',  // Accent color (pink)
    background: '#f4f4f4', // Background color (light gray)
    surface: '#ffffff', // Surface color (white)
    text: '#333333', // Text color (dark gray)
    placeholder: '#999999', // Placeholder text color
    error: '#f44336', // Error color (red)
    success: '#4caf50', // Success color (green)
  },
  roundness: 10, // Rounded corners
  fonts: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

export default theme;
