# **VBG_TDEA**
This repository contains the code for a comprehensive case management system designed to track and manage cases related to gender-based violence at Tecnológico de Antioquia. The system facilitates the reporting, tracking, and resolution of VBG cases, ensuring a structured and secure process for both administrators and users.

# **Authors**
- Karen Holguín Jaramillo
- Mayerli Giraldo Bermudez


# **Installation Manual for VBG Project**

## **Project Information**

- **Project Name**: VBG Project
- **Frontend Directory**: `vbg_tdea_front`
- **Backend Directory**: `vbg_project`
- **Database**: MongoDB
- **Event Streaming**: Kafka
- **Backend Framework**: Node.js with Express
- **Frontend Framework**: React
- **Authentication**: JWT and OAuth2.0 with Azure AD
- **Documentation**: Swagger (for API documentation)

---

## **Technologies Used**

- **Frontend**: React, Tailwind CSS, Bootstrap, Axios, FontAwesome
- **Backend**: Node.js, Express, Mongoose, KafkaJS
- **Authentication**: `@azure/msal-browser`, `@azure/msal-node`, `@azure/msal-react`, `passport-azure-ad`
- **Database**: MongoDB (NoSQL database)
- **Event Messaging**: Confluent Kafka (using `kafka-node` for connection)

---

## **Project Structure**

### Backend (`vbg_project` Directory)

```
VBG_TDEA
│
├── config/                      # Configuration files (e.g., database)
│   └── database.js              # Database connection configuration
│
├── src/
│   ├── dashboard/               # Dashboard module
│   │   ├── api/                 # Dashboard API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Dashboard domain
│   │   ├── infrastructure/      # Infrastructure
│   │   └── routes/              # Dashboard routes
│   │
│   ├── denouncedRegister/       # Denounced Register module
│   │   ├── api/                 # Denounced Register API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Denounced Register domain
│   │   ├── infrastructure/      # Infrastructure
│   │   └── routes/              # Denounced Register routes
│   │
│   ├── historico/               # Historical module
│   │   ├── api/                 # Historical API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Historical domain
│   │   ├── infrastructure/      # Infrastructure
│   │   └── routes/              # Historical routes
│   │
│   ├── middleware/              # Middleware for the entire application
│   │   ├── authMiddleware.js    # Authentication middleware
│   │   └── uploadMiddleware.js  # File upload middleware
│   │
│   ├── ticket/                  # Ticket module
│   │   ├── api/                 # Ticket API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Ticket domain
│   │   ├── infrastructure/      # Infrastructure
│   │   │   ├── kafka/           # Kafka configuration
│   │   │   │   ├── TicketConsumer.js  # Ticket consumer
│   │   │   │   └── TicketProducer.js  # Ticket producer
│   │   └── routes/              # Ticket routes
│   │
│   ├── ticketAction/            # Ticket Action module
│   │   ├── api/                 # Ticket Action API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Ticket Action domain
│   │   ├── infrastructure/      # Infrastructure
│   │   └── routes/              # Ticket Action routes
│   │
│   ├── ticketStatus/            # Ticket Status module
│   │   ├── api/                 # Ticket Status API
│   │   ├── application/         # Application logic
│   │   ├── domain/              # Ticket Status domain
│   │   ├── infrastructure/      # Infrastructure
│   │   └── routes/              # Ticket Status routes
│   │
│   └── user/                    # User module
│       ├── api/                 # User API
│       ├── application/         # Application logic
│       ├── domain/              # User domain
│       ├── infrastructure/      # Infrastructure
│       └── routes/              # User routes
│
├── uploads/                     # Directory for file uploads
│
├── .env                         # Environment variables file
├── .gitignore                   # Git ignore file
├── app.js                       # Main application entry point
├── package.json                 # NPM dependencies and scripts
├── package-lock.json            # NPM lockfile
├── routes.js                    # Main routing configuration
├── swagger.js                   # Swagger configuration for API documentation
└── verifyToken.js               # JWT token verification helper
```

### Frontend (`vbg_tdea_front` Directory)

```
VBG_TDEA_FRONT
│
├── public/                       # Public assets that are served directly
│   └── index.html                # Main HTML file
│
├── src/                          # Source folder for all React components and logic
│   ├── assets/                   # Static assets like images, icons, fonts
│   │
│   ├── components/               # Reusable components
│   │
│   ├── contexts/                 # Context API for global state management
│   │   └── AuthContext.js        # Auth context for user authentication state
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useAuth.js            # Custom hook for authentication
│   │
│   ├── pages/                    # Application pages
│   │   ├── Dashboard/            # Dashboard page
│   │   │   └── Dashboard.js
│   │   │   └── Dashboard.css
│   │   ├── Login/                # Login page
│   │   │   └── Login.js
│   │   │   └── Login.css
│   │   ├── Historic/             # Historic page
│   │   │   └── Historic.js
│   │   │   └── Historic.css
│   │   └── Home/                 # Home page
│   │       └── Home.js
│   │       └── Home.css
│   │
│   ├── services/                 # Services for handling business logic
│   │   └── authConfig.jsx        # Auth configuration service
│   │   └── AxiosConfig.js        # Axios configuration for HTTP requests
│   │
|   ├── utils/ 
|   |   └── Config.js
|   |
│   ├── App.js                    # Main React component
│   ├── index.js                  # Application entry point
│
├── .env                          # Environment variables file
├── .gitignore                    # Git ignore file
├── package.json                  # NPM dependencies and scripts
├── package-lock.json             # NPM lockfile
└── README.md                     # Documentation for the frontend project
```

---

## **Pre-requisites**

- **Node.js**: 18.x or higher
- **MongoDB**: 5.x or higher
- **Kafka**: Confluent Cloud recommended or local Kafka setup

---

## **Installation Steps**

### 1. **Clone the Repository**

   ```bash
   git clone https://github.com/MgbCD/VBG_TDEA_TG
   ```

### 2. **Set Up the Backend**

1. **Navigate to the Backend Directory**:

   ```bash
   cd ../VBG_TDEA
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `vbg_project` directory.
   - Add the following environment variables:

     ```plaintext
     PORT=3000
     MONGO_URI=<Your MongoDB URI>
     ENCRYPTION_KEY=<Your Encryption Key>
     FRONTEND_URL=http://localhost:3001 # In production, replace localhost with the frontend domain, e.g., https://frontenddomain.com
     KAFKA_BROKER=<Your Kafka broker URL>
     KAFKA_USERNAME=<Your Kafka Username>
     KAFKA_PASSWORD=<Your Kafka Password>
     JWKS_URI=<URL for JWT public key endpoint> # Public key endpoint URL for JWT verification, varies by auth provider, e.g., https://login.microsoftonline.com/{tenantId}/discovery/v2.0/keys
     SWAGGER_API_URL=http://localhost:3000/api # In production, replace localhost with backend server domain, e.g., https://backenddomain.com/api
     ```
     > **Note**: Use a secure key for `ENCRYPTION_KEY`, and make sure the `KAFKA` variables match your Confluent Cloud or Kafka setup.

4. **Database Configuration**:
   - Create a folder named `config` in the `vbg_project` directory.
   - Inside `config`, create a file called `dataBase.js` and add the following code:

     ```javascript
     const mongoose = require('mongoose');
     const dotenv = require('dotenv');

     dotenv.config();

     const connectDB = async () => {
       try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log('***** MongoDB connected *****');
       } catch (err) {
         console.error(err.message);
         process.exit(1);
       }
     };

     module.exports = connectDB;
     ```

5. **Connect Database in `src/app.js`**:
   - Ensure the `src/app.js` file includes the database connection:

     ```javascript
     const connectDB = require('./config/dataBase');
     connectDB();
     ```

6. **Start the Backend Server**:

   ```bash
   npm run start
   ```

7. **Check Swagger Documentation**:
   - By default, in the development environment, the Swagger API documentation should be available at `http://localhost:3000/api-docs`.
   - For production or custom environments, replace `localhost` with the server’s domain or IP address. For example: `https://yourdomain.com/api-docs`.

### 3. **Set Up the Frontend**

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../VBG_TDEA_FRONT
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - The frontend configuration variables are not stored in a traditional `.env` file. Instead, they are defined as constants in the `Config.js` file, located in the `utils/Config` folder.
   - In this file, define the following values:

     ```javascript
     export const PORT = 3001; // Development port for the frontend
     export const REACT_APP_AZURE_CLIENT_ID = "<Your Azure Client ID>";
     export const REACT_APP_AZURE_AUTHORITY = "https://login.microsoftonline.com/<YourTenantID>";
     export const REACT_APP_API_BASE_URL = "http://localhost:3000"; // Backend URL in development
     export const REACT_APP_REDIRECT_URI = "http://localhost:3001"; // Redirect URI
     ```

   > **Note**: Make sure to replace `<Your Azure Client ID>` and `<YourTenantID>` with the values corresponding to your Azure configuration. For production deployment, change `localhost` to the appropriate server domain.

4. **Start the Frontend Server**:

   ```bash
   npm run start
   ```

   The frontend application should be accessible at `http://localhost:3001`.

### 4. **Kafka Configuration**

1. **Create Topics**: Make sure the topics `ticket-created`, `ticket-status-changed`, and `ticket-historico-changed` are created in your Kafka cluster.
2. **Consumer and Producer**: The backend `vbg_project` has a Kafka producer and consumer configured to listen to these topics and handle email notifications.

### **Branch Information for Kafka Configuration**

- **Main & Develop branches**: These branches contain the project without Kafka configuration. You can run the project without a Kafka setup. The system will function normally, but Kafka-related features (like event streaming) will not be active. These branches are ideal if you don't need Kafka integration for testing or development purposes.

- **`feature/kafka-configuration` branch**: This branch includes the full Kafka configuration. If you need Kafka for event streaming, you can switch to this branch. This setup includes Kafka consumer and producer logic, and it requires a running Kafka broker to function properly. If you want to enable Kafka-based functionality, such as ticket-related events, you should use this branch.

> **Note**: You can work with or without Kafka by switching between these branches. If you don’t need Kafka, the **Main** or **Develop** branches will be sufficient for your needs.

---

### 5. **Testing the Application**

- **Access the Application**: Open `http://localhost:3001` in your browser to access the frontend.
- **Testing API Endpoints**: Use a tool like Postman or the VSCode REST Client to test the backend API endpoints.

---

## Additional Configuration for Kafka

1. **Confluent Cloud Dashboard**: In the Confluent Cloud Console, you can monitor the message consumption, errors, and configuration details for your Kafka topics.
2. **Kafka Setup**: Ensure you have the correct permissions set for topics in Confluent Cloud and that the credentials in the `.env` file match your setup.

---

## Security for Production

Ensure sensitive variables such as `ENCRYPTION_KEY` and Kafka credentials are stored securely, especially in production environments. Consider using AWS Secrets Manager, Azure Key Vault, or similar secure storage for environment secrets.

---

## Troubleshooting

- **MongoDB Connection Issues**: Verify your MongoDB URI and ensure MongoDB is running.
- **Kafka Errors**: If you encounter partition or topic errors, confirm the topics are created and properly configured in Confluent Cloud.
- **Environment Variable Issues**: Double-check all `.env` variables in both the backend directories.