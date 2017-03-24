module.exports = function (app,model) {
    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.get("/api/user?username=username",findUserByUsername);
    app.get("/api/user?username=username&password=password",findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var userModel = model.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com"}
    ];

    function deleteUser(req,res){
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function createUser(req,res){
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";

        var tempUser = {};
        tempUser.username = newUser.username;
        tempUser.password = newUser.password;
        tempUser.firstName = newUser.firstName;
        tempUser.lastName = newUser.lastName;
        tempUser.email = newUser.email;

        userModel
            .createUser(tempUser)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(500);
            });
    }

    function updateUser(req,res){
        var userId = req.params['userId'];
        var user = req.body;

        userModel
            .updateUser(userId,user)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function findUserById(req,res){
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                    if(user){
                        if(user.length === 0){
                            res.sendStatus(404);
                        }else{
                            res.json(user);
                        }
                    }else{
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function findUser(req,res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req,res);
        }else if(username){
            findUserByUsername(req,res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    if(user.length === 0){
                        res.sendStatus(404);
                    }else{
                        res.json(user[0]);
                    }
                }else{
                    res.sendStatus(404);
                }
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                if(user){
                    if(user.length === 0){
                        res.sendStatus(404);
                    }else{
                        res.json(user);
                    }
                }else{
                    res.sendStatus(404);
                }
            },
            function (error) {
                res.sendStatus(404);
            });
    }
};