const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Conntect to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`)
        });
    } catch (error) {
        console.log("Cannot conntect to the database!");
        process.exit();
    }
}

startServer();

// const PORT = config.app.port;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });