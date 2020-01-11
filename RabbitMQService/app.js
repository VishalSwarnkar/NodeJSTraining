const express = require('express');
const publish_router = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT|| 7777;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/",publish_router);

app.listen(PORT, '0.0.0.0', (res)=>{
    console.log("Listening the service at port :", PORT);
})

// ============================= error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });

module.exports = app;