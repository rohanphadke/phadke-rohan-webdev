module.exports=function (app,mongoose) {
    var q = require('q');

    var PageSchema = require('../page/page.schema.server');
    var pageModel = mongoose.model('pageModel',PageSchema);
    var WidgetSchema = require('./widget.schema.server');
    var widgetModel = mongoose.model('widgetModel',WidgetSchema);

    var api={
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
//        reorderWidget : reorderWidget
    };
    return api;

    function createWidgetRevisited(newWidget){
        var d = q.defer();
        widgetModel.create(newWidget,function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function createWidget(pageId,newWidget) {
        console.log("in create widget for page model server");
        console.log(pageId);
        console.log(newWidget);
        var d = q.defer();
        pageModel.update({_id:pageId},{$push:{widgets:newWidget}},function (err,status) {
            console.log("in update");
            console.log(err);
            console.log(status);
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(createWidgetRevisited(newWidget));
            }
        });
        console.log(d.promise);
        return d.promise;
    }

    function findAllWidgetsForPage(pageId) {
        console.log("in find all widgets for page model server");
        console.log(pageId);
        var d = q.defer();
        widgetModel.find({_page:pageId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function findWidgetById(widgetId) {
        console.log("in find widget by id model server");
        console.log(widgetId);
        var d = q.defer();
        widgetModel.findOne({_id:widgetId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function updateWidget(widgetId,widget) {
        console.log("in update widget model server");
        console.log(widgetId);
        console.log(widget);
        var d = q.defer();

        if(widget.type == 'HEADING'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'text':widget.text,'size':widget.size}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'YOUTUBE'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'width':widget.width,'url':widget.url}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'HTML'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'text':widget.text}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'IMAGE'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'width':widget.width,'url':widget.url, 'myFile':widget.myFile}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }
        return d.promise;
    }

    function deleteWidgetRevisited(widgetId) {
        var d = q.defer();
        widgetModel.remove({_id:widgetId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
    }

    function deleteWidget(widgetId) {
        console.log("in delete widdget website model server");
        var d = q.defer();
        pageModel.update({},{$pull:{widgets: {_id:widgetId}}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(deleteWidgetRevisited(widgetId));
            }
        });

        return d.promise;
    }
};