//Constants

const express = require(`express`);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(`../client/dist`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require(`./routes/htmlRoutes`)(app);
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
