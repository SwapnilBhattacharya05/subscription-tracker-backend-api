import { config } from "dotenv";

// GIVING IT A PATH POINTING TO THE .env FILE
// config({ path: ".env" }); // EXTRACTS ALL THE ENVIRONMENT VARIABLES
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` }); // FOR HAVING MORE THAN ONE ENV FILE

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
} = process.env; // EASILY SWITCH ENVIRONMENT FROM DEVELOPMENT TO PRODUCTION
