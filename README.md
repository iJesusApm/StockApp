# FinnhubStock Project Documentation

## Overview

The FinnhubStock project is a mobile application built with React Native, designed to monitor and alert users about stock prices. It includes features such as displaying stock graphs, managing watchlists, and sending local notifications when stock prices exceed predefined alert values. The app leverages WebSocket connections to receive real-time stock data updates.

## Project Structure
The project is organized into several directories and files, each with a specific role from FinnhubStock/src

### Directory and File Descriptions
- components/: Reusable UI components used throughout the application.
- constants/: Contains configuration files such as URLs and API tokens.
- context/: Context providers for managing global states, including WebSocket context.
- hooks/: Custom hooks for various functionalities, including WebSocket management.
- navigatiors/: Contains navigation configurations for the app.
- screens/: Different screens or views of the application such as Watchlist, Graph, and Alert.
- services/: Contains service files for handling WebSocket connections and other API interactions.
- theme/: Holds theme configuration for the application.
- translations/: Configuration related to language support.
- types/: Custom type definitions for the project.
- App.tsx: The main entry point of the application.

## Key Features

### Real-time Stock Data
The application uses WebSocket connections to receive real-time updates on stock prices. This ensures that users have the most up-to-date information on their watchlist stocks.

### Watchlist Management
Users can add or remove stocks from their watchlist. The watchlist screen displays real-time price updates for the stocks that the user is interested in.

### Graph Display
A graphical representation of stock prices is provided, showing the historical data for better visualization and analysis.

### Price Alerts
Users can set price alerts for specific stocks. When the stock price exceeds the set alert value, the app sends a local push notification to notify the user.

### WebSocket Implementation
The WebSocket connection is managed using a custom hook useWebSocket, which handles subscribing to stock symbols, receiving real-time data, and triggering alerts when necessary.

#### WebSocket Service
The WebSocket service is defined in services/webSocketService.ts

#### WebSocket Hook
The custom hook useWebSocket is defined in hooks/useWebSocket.ts

## Optimizations

#### Debounce Implementation
To prevent multiple re-renders and excessive API calls, debounce logic has been implemented in the WebSocket hook. This reduces the frequency of updates and improves performance.

#### Centralized WebSocket Context
A centralized context (WebSocketContext) is used to share WebSocket data across different components without causing multiple re-renders. This improves performance and ensures data consistency throughout the application.

## Conclusion
The FinnhubStock project is a comprehensive React Native application for monitoring stock prices in real-time. It leverages WebSocket for live data updates and includes features such as watchlist management, graph display, and price alerts with local notifications. The project is optimized for performance and uses modern React techniques and TypeScript for robust and maintainable code.

---

This project is a [React Native](https://facebook.github.io/react-native/) boilerplate that can be used to kickstart a mobile application.

The boilerplate provides **an optimized architecture for building solid cross-platform mobile applications** through separation of concerns between the UI and business logic. It is fully documented so that each piece of code that lands in your application can be understood and used.

## Requirements

Node 18 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

You also need to install the dependencies required by React Native.  
Go to the [React Native environment setup](https://reactnative.dev/docs/environment-setup), then select `React Native CLI Quickstart` tab.  
Follow instructions for your given `development OS` and `target OS`.

## Quick start

Assuming you have all the requirements installed, you can run the project by running:

- `yarn start` to start the metro bundler, in a dedicated terminal
- `yarn <platform>` to run the _platform_ application (remember to start a simulator or connect a device)

## Digging Deeper

To learn more about this boilerplate, go to [full documentation](https://thecodingmachine.github.io/react-native-boilerplate)
