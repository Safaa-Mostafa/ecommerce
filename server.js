const express = require("express")
const dotenv = require("dotenv");
const morgan = require("morgan")
const app = express();
const cors = require("cors");
dotenv.config({path:".env"});

app.use(cors());
const globalError = require("./middleware/errormiddleware")
const APIError = require("./utils/APIERROR")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const dbConnection = require("./config/database") 
const categoryRoute = require("./routes/categoryRoutes")
const SubCategoryRoute = require("./routes/subcategoryRoutes")
const brandRoute = require("./routes/brandRoute")

const ProductRoute = require('./routes/productRoutes.js')
dbConnection();
// express app


// middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan("dev"))
    console.log(`mode:${process.env.NODE_ENV}`)
}
//routes 
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/sub-category',SubCategoryRoute)
app.use('/api/v1/brand',brandRoute)
app.use('/api/v1/product',ProductRoute)
app.use('*',(req,res,next)=>{
    next(new APIError(`can't find this route :${req.originalUrl}`,400));
})
app.use(globalError)

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT,()=>{
    console.
    log(`app running http://localhost:${PORT}`)
})
// handle rejections outside express
process.on("unhandleRejection",(err)=>{
    console.log(`Shutting down.....`)
    server.close(()=>{
        process.exit(1);
    })
})