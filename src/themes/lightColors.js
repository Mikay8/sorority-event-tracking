// theme.js
import { DefaultTheme } from 'react-native-paper';

// Define a custom theme that overrides the default one
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff', // Primary color (blue)
    secondary:'#ff4081',// Accent color (pink)
    tertiary:'#ff4081',// Accent color (pink)
    accent: '#ff4081',  // Accent color (pink)
    background: '#f4f4f4', // Background color (light gray)
    surface: '#ffffff', // Surface color (white)
    text: '#333333', // Text color (dark gray)
    placeholder: '#999999', // Placeholder text color
    error: '#f44336', // Error color (red)
    success: '#4caf50', // Success color (green)
  },
  roundness: 10, // Rounded corners
  typescale: {
    ...DefaultTheme.typescale,
    displayMedium: {
      fontFamily: 'Roboto', // Or any custom font
      fontWeight: '500',
      fontSize: 16, // Custom font size
      lineHeight: 24, // Custom line height
      letterSpacing: 0.15, // Custom letter spacing
    },
  },
  
};

export default theme;
