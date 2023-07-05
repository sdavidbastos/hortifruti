import { app } from "./app";
import { sequelize } from "./config/db.js"
import 'dotenv/config'

const port = process.env.PORT || 8000
app.listen(port, () => {
    sequelize.sync();
    console.log(`Example app listening on port ${port}`)
})