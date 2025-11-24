import express from 'express';

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => {
   console.log('server started');
});
