exports.login = (req, res) => {
    const {username, password} = req.body
    if (username === "putragabrielll" && password === "12345"){
        return res.json({
            success: true,
            message: "Login succes!"
        });
    } else {
        return res.json({
            success: false,
            message: "Login failed!"
        });
    }
}