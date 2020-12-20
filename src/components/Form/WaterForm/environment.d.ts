declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_ACCOUNT_NUMBER: string;
      REACT_APP_CLIENT_NUMBER: string;
      REACT_APP_LAST_NAME: string;
      REACT_APP_POSTAL_CODE: string;
      REACT_APP_LAST_PAYMENT_METHOD: string;
      REACT_APP_EMAIL: string;
      NODE_ENV: "development" | "production";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
