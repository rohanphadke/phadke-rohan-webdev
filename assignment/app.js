/*module.exports = function (app) {
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
    require('./services/page.service.server')(app);
    require('./services/widget.service.server')(app);
};
*/
module.exports=function(app){
    var mongoose = require('mongoose');
    var userModel = require('./model/user/user.model.server')(app,mongoose);

    var model = {
        userModel : userModel
    };

    require('./services/user.service.server')(app,model);
    require('./services/website.service.server')(app,model);
    require('./services/page.service.server')(app,model);
    require('./services/widget.service.server')(app,model);
};