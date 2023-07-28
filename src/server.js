const app = require("./config/app")
const env = require("./config/env")
app.listen(env.port, () => console.log(`App listening on port ${env.port}`))