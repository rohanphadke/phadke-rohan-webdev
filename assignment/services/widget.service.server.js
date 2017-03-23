module.exports = function (app,model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});

    var widgetModel = model.widgetModel;

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload',upload.single('myFile'), uploadImage);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "234", "name": "GIZMODO Header", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "345", "name": "Lorem Header", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "765", "name": "Sunset Image", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "234", "name": "Power Line HTML", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "132", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "987", "name": "Yacht video", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "141", "name": "Lorem Text", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req,res){
        var newWidget = req.body;
        var pageId = req.params.pageId;
        console.log("in create widget service server");
        console.log(newWidget);
        console.log(pageId);
        newWidget._page = pageId;

        widgetModel.createWidget(pageId,newWidget)
            .then(function (wdg) {

                res.json(wdg);
            },
            function (error) {
                console.log("in error");
                console.log(error);
                res.sendStatus(500);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (newwidgets) {
                res.json(newwidgets);
            },
            function (error) {
                res.send(404);
            });
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;

        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.send(404);
                });
    }

    function updateWidget(req,res){
        var widget = req.body;
        var widgetId = req.params.widgetId;

        console.log("in update widget service server");
        widgetModel.updateWidget(widgetId,widget)
            .then(function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.send(500);
                });
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;

        widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.send(404);
                });
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var widgetName    = req.body.widgetName;
        var widgetOperation = req.body.widgetOperation;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        if(widgetOperation == "edit"){
            for(var wg in widgets){
                if(widgets[wg]._id == widgetId){
                    widgets[wg].url= "../../../../../uploads/"+filename;
                    res.redirect("../../assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                }
            }
        }else{
            widgetId = (new Date()).getTime();
            widgets.push({"_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "name": widgetName, "width": width,
                "url": "../../../../../uploads/"+filename});
            res.redirect("../../assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }
    }

};