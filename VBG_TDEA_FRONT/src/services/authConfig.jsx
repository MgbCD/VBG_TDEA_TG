import { PublicClientApplication } from "@azure/msal-browser";
import Config from "../utils/config";

const msalConfig = {
    auth: {
        clientId: Config.REACT_APP_AZURE_CLIENT_ID,
        authority: Config.REACT_APP_AZURE_AUTHORITY,
        redirectUri: Config.REACT_APP_REDIRECT_URI,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;