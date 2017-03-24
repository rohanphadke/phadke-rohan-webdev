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
        reorderWidget : reorderWidget
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
        var d = q.defer();
        pageModel.update({_id:pageId},{$push:{widgets:newWidget}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(createWidgetRevisited(newWidget));
            }
        });
        return d.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var d = q.defer();
        widgetModel.find({_page:pageId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        }).sort({order:1}).exec();
        return d.promise;
    }

    function findWidgetById(widgetId) {
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
        var d = q.defer();

        if(widget.type == 'HEADING'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'text':widget.text,'size':widget.size, 'order':widget.order}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'YOUTUBE'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'width':widget.width,'url':widget.url, 'order':widget.order}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'HTML'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'text':widget.text, 'order':widget.order}},function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(findWidgetById(widgetId));
                }
            });
        }else if(widget.type == 'IMAGE'){
            widgetModel.update({_id:widgetId},{$set:{'name':widget.name,'width':widget.width,'url':widget.url, 'myFile':widget.myFile, 'order':widget.order}},function (err,status) {
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
    
    function reorderWidget(pageId,startIndex, endIndex) {
        var d = q.defer();
        findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                widgets.forEach(function (w) {
                    if(startIndex<endIndex){
                        if(w.order >startIndex && w.order<=endIndex){
                            widgetModel.update({_id:w._id},{order:w.order-1}).exec();
                        }else if(w.order == startIndex){
                            widgetModel.update({_id:w._id},{order:endIndex}).exec();
                        }
                    }else if(startIndex>endIndex){
                        if(w.order >=endIndex && w.order < startIndex){
                            widgetModel.update({_id:w._id},{order:w.order+1}).exec();
                        }else if(w.order == startIndex){
                            widgetModel.update({_id:w._id},{order:endIndex}).exec();
                        }
                    }
                });
                widgets.save();
            });
        return d.promise;
    }
};