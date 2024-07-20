import mongoose from 'mongoose';

const connectDB = async () => {
    const DB_URL = process.env.DB_URL
    const DB_NAME = process.env.DB_NAME
    const connectionString = `${DB_URL}/${DB_NAME}`;
    try {
        await mongoose.connect(connectionString);
        console.log('Database connected successfully');
    }   
    catch(error) {
        console.log('Unable to connect to database\n' + error);
    }
}

export default connectDB;
