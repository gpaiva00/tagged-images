const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}`)
});
