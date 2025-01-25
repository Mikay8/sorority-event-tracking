my-sorority-app/
├── assets/                # Static assets (images, fonts, etc.)
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── ... 
├── src/                   # Main source code directory
│   ├── components/        # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   └── styles.js
│   │   ├── EventCard/
│   │   │   ├── EventCard.js
│   │   │   └── styles.js
│   │   └── ...
│   ├── screens/           # App screens/pages
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.js
│   │   │   └── styles.js
│   │   ├── EventDetails/
│   │   │   ├── EventDetails.js
│   │   │   └── styles.js
│   │   └── ...
│   ├── navigation/        # Navigation setup
│   │   ├── AppNavigator.js
│   │   ├── MainStack.js
│   │   └── AuthStack.js
│   ├── context/           # Context providers (e.g., auth, theme, event data)
│   │   ├── AuthContext.js
│   │   ├── EventContext.js
│   │   └── ThemeContext.js
│   ├── hooks/             # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useEvents.js
│   │   └── useTheme.js
│   ├── services/          # API calls or backend integrations
│   │   ├── api.js
│   │   ├── eventService.js
│   │   └── authService.js
│   ├── utils/             # Helper functions and constants
│   │   ├── validators.js
│   │   ├── dateFormatter.js
│   │   ├── constants.js
│   │   └── ...
│   ├── themes/            # Theme files (light/dark mode, colors, typography)
│   │   ├── lightTheme.js
│   │   ├── darkTheme.js
│   │   └── index.js
│   └── App.js             # Main app entry point
├── .gitignore             # Files and folders to exclude from Git
├── package.json           # Node.js dependencies and scripts
├── README.md              # Project documentation
└── ...                    # Other config files (e.g., .eslintrc, babel.config.js)
