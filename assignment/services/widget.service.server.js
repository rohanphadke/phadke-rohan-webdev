module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});

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

    var newImage=null;

    function createWidget(req,res){
        var newWidget = req.body;
        newWidget._id = (new Date()).getTime() + "";
        console.log(newWidget);
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var wdgts = [];
        for(var wd in widgets) {
            if(pageId == widgets[wd].pageId) {
                wdgts.push(widgets[wd]);
            }
        }
        res.send(wdgts);
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        var widget;
        for(var wd in widgets){
            if(widgets[wd]._id == widgetId){
                widget = widgets[wd];
            }
        }
        res.send(widget);
    }

    function updateWidget(req,res){
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for(var wg in widgets){
            if(widgets[wg]._id == widgetId){
                if (widgets[wg].widgetType == "HEADER") {
                    widgets[wg].name = widget.name;
                    widgets[wg].size = widget.size;
                    widgets[wg].text = widget.text;
                }
                if (widgets[wg].widgetType == "IMAGE") {
                    widgets[wg].name = widget.name;
                    widgets[wg].width = widget.width;
                    widgets[wg].url = widget.url;
                }
                if (widgets[wg].widgetType == "YOUTUBE") {
                    widgets[wg].name = widget.name;
                    widgets[wg].width = widget.width;
                    widgets[wg].url = widget.url;
                }
                if (widgets[wg].widgetType == "HTML") {
                    widgets[wg].name = widget.name;
                    widgets[wg].text = widget.text;
                }
                res.send(widgets[wg]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for(var wd in widgets){
            if(widgets[wd]._id == widgetId){
                widgets.splice(wd,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var widgetId      = (new Date()).getTime();
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var widgetName    = req.body.widgetName;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        console.log(widgets);
        widgets.push({"_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "name": widgetName, "width": width,
            "url": "../../../../../uploads/"+filename})
        console.log("../../../../../uploads/"+filename);
        console.log(widgets);
        res.redirect("../../assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
    }

};