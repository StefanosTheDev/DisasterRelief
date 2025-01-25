import app from './app';

const port = process.env.PORT || 3000;

// Load DB()
app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
