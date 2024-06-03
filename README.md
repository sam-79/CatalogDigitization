
# React Native Application with Python Server

This project is a React Native application built using Expo, with a backend server built using Python. Follow the steps below to get the project up and running.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (https://nodejs.org/)
- Expo CLI ( https://docs.expo.dev/more/expo-cli/#installation)
- Python (https://www.python.org/)
- Git (https://git-scm.com/)

## Getting Started

### Cloning the Repository

1. Clone the repository to your local machine using Git:

   ```sh
   git clone https://github.com/sam-79/CatalogDigitization.git
   ```

2. Navigate to the project directory:

   ```sh
   cd CatalogDigitization
   ```

### Setting Up the Python Server

For server setup, visit https://github.com/shantanu1905/Catalog_digitization/tree/ondc_v2

   The server will start and display an IP address and port number (e.g., `http://192.168.1.100:5000`).

### Setting Up the React Native App

1. Open a new terminal window and navigate to the React Native project directory:

   ```sh
   cd ../CatalogDigitization
   ```

2. Install the required npm packages:

   ```sh
   npm install
   ```
3. Optional, 
    ```sh
    npx expo install --fix
    ```
4. Start the Expo development server:

   ```sh
   npx expo start -g
   ```

### Running the App on Expo Go

1. Download the Expo Go app from the App Store (iOS) or Google Play Store (Android) on your mobile device.

2. Scan the QR code displayed in the terminal to open the app on your device.

### Connecting with server 
When prompted, enter the IP address and port number of the Python server/machine on which the server is running. This ensures that the React Native app can communicate with the backend server.

## Network Configuration

Ensure that both the Python server and the Expo development server are running on the same private network. They need to be able to communicate with each other over the network.

### Firewall Settings

If you encounter issues with network communication, your firewall might be blocking the requests. You can temporarily disable the firewall to check if it's the cause. 

#### Disabling the Firewall on Windows

1. Open the Control Panel.
2. Go to `System and Security > Windows Defender Firewall`.
3. Click `Turn Windows Defender Firewall on or off`.
4. Select `Turn off Windows Defender Firewall` for both private and public networks.
5. Click `OK`.


## Troubleshooting

If you encounter any issues, ensure that:

- Both the server and the Expo development server are running on the same private network.
- The IP address and port number entered in the app match the server's address.
- Your firewall is not blocking network requests.

Feel free to open an issue in the repository if you need further assistance.
