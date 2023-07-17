import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connectionString = process.env.DATABASEURL;

       if(!connectionString){
         return "No Connection String is present in config file";
       }

       return mongoose.connect(connectionString , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       }) 
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;

