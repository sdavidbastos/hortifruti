import express from "express"
import cors from "cors"

import { userRoute } from "./user/userRoute.js"

export const app = express()

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/users', userRoute);