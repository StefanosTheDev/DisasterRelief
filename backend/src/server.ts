import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
