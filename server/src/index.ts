import app from './app.js';
import connectToDatabase from './db/connection.js';
import { config } from 'dotenv';

//config(); // Load environment variables

// Define the port to listen on
const PORT = process.env.PORT || 6000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
