import express from "express";
import dotenv from "dotenv"
import LoginRouter from "./router/auth.router.js";

dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(express.json());


app.get('/test', (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    })
});


app.use('/api', LoginRouter);

app.listen(port, () => console.log(`Server is running: http://localhost:${port}`))