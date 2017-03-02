module.exports = function (app) {
    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    app.get("/api/user?username=username",findUser);
    app.get("/api/user?username=username&password=password",findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com"}
    ];

    function deleteUser(req,res){
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id == userId){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req,res){
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function updateUser(req,res){
        var userId = req.params['userId'];
        for(var u in users){
            var user = users[u];
            if(user._id == userId){
                var newUser = req.body;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserById(req,res){
        var userId = req.params['userId'];
        for(var u in users){
            var user = users[u];
            if(user._id == userId){
                res.send(user);
                return;
            }
        }
        res.sendStatus(404);
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
        for(var u in users){
            if(users[u].username == username){
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username == username && users[u].password == password){
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }
};