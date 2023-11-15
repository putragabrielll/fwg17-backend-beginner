const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Backend is running well!"
    });
});
app.get("/users", (req, res) => {
    return res.json({
        success: true,
        message: "List all users",
        result: [
            {
                id: 1,
                name: "Gabriel Putra Sihombing",
                email: "puragmahk@gmail.com"
            },
            {
                id: 2,
                name: "Handoyo Prakarsa",
                email: "handoyo@gmail.com"
            },
            {
                id: 3,
                name: "John Doe",
                email: "johndoe@example.com"
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
