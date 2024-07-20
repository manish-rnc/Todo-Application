import app from './server.js';
import connectDB from './config/db.config.js';

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
