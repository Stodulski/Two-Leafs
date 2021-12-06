import mongoose from "mongoose";

mongoose.connect(
    process.env.DATABASE_URL
);
mongoose.connection.once("open", () => {
    console.log("Conectado a la base de datos");
});
