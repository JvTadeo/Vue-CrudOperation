import express from "express";
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

//App Declaration
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

const server = app.listen(8800, () => {
    const { port } = server.address();
    console.log(`Server is listening on port ${port}`);
});