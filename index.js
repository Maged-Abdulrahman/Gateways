const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db-connection");
const gatewayRoutes = require('./routes/gateways.routes');


app.use(express.json());
app.use(cors());

app.use('/gateways', gatewayRoutes);


////////////////////////////
const Port = 5000;
app.listen(process.env.PORT || Port,()=>{
    console.log("server is running");
})