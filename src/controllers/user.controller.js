exports.getAllUsers = (req, res) => {
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
};


exports.createUsers = (req, res) => {
    return res.json({
        success: true,
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
            req.body
        ]
    });
}


exports.deleteUsers = (req, res) => {
    // res.send("DELETE request to homepage");
    // return res.json({
    //     success: true,
    //     result: [
    //         {
    //             id: 1,
    //             name: "Gabriel Putra Sihombing",
    //             email: "puragmahk@gmail.com"
    //         },
    //         {
    //             id: 2,
    //             name: "Handoyo Prakarsa",
    //             email: "handoyo@gmail.com"
    //         }
    //     ]
    // });
    return res.json([
        {
            id: 1,
            name: "Gabriel Putra Sihombing",
            email: "puragmahk@gmail.com"
        },
        {
            id: 2,
            name: "Handoyo Prakarsa",
            email: "handoyo@gmail.com"
        }
    ]);
}