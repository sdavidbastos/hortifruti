import express from "express"
import cors from "cors"
import 'dotenv/config'

import { userRoute } from "./user/userRoute.js"
import { sequelize } from "./config/db.js"

const app = express()
const port = process.env.PORT || 8000

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.use('/users', userRoute);

app.listen(port, () => {
  sequelize.sync();
  console.log(`Example app listening on port ${port}`)
})