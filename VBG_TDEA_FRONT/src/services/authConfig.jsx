import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "23b67e89-4e98-4c62-ba48-e520642a5423",
        authority: "https://login.microsoftonline.com/2618ef2a-7956-4b9a-b5c7-95fe306a3e7b",
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;