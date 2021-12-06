import app from "./config.js";

import "./db.js";

app.listen(app.get("port"), () => {
    console.log(`Servidor inciado en ${app.get("port")}`);
});
