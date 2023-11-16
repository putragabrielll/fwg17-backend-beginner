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

exports.updateUsers = (req, res) => {
    const { id, name, email } = req.body;
    if (name === "Gabriel"){
        return res.json(
            {
                id: 1,
                name: "Gabriel",
                email: "puragmahk@gmail.com"
            }
        );
    } else {
        return res.json(
            {
                id: 1,
                name: "Gabriel Putra Sihombing",
                email: "puragmahk@gmail.com"
            }
        );
    }
}


exports.deleteUsers = (req, res) => {
    res.send("DELETE request Data");
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

    // return res.json([
    //     {
    //         id: 1,
    //         name: "Gabriel Putra Sihombing",
    //         email: "puragmahk@gmail.com"
    //     },
    //     {
    //         id: 2,
    //         name: "Handoyo Prakarsa",
    //         email: "handoyo@gmail.com"
    //     }
    // ]);
}