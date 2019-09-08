
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysqlConnection = require("./database");
const departmentRoutes = require("./routes/department");
const employeeRoutes = require("./routes/employee");

var app = express();
//for json data
app.use(bodyParser.json());
app.use(cors());
//to declare path
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err,req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
 });

app.listen(3000);