// validate required environment variables
const envList = ['AUTHAPP_DB_URI', 'AUTHAPP_JWTPK'];
envList.forEach(item => {
  if (!process.env[item]) {
    console.error(`Environment variable '${item}' is not defined!`);
    process.exit(1);
  }
});

const app = require('./app');

const port = process.env.PORT || 5000;
const now = new Date();
app.listen(port, () => {
  console.log(`Listening on port ${port} at ${now} ...`);
});
