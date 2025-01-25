// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' }); // Load environment variables
import app from './app';

const port = process.env.PORT || 3000;

// Load DB()
app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
