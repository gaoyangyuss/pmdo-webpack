const content = require('./km_center.ejs');
const layout = require('../layout/layout.js');
const pageTitle = '知识文档 - PM.DO 项目管理云';
//二级以上弹窗
require("../async/common/edit_broad_modal.html");

module.exports = layout.init({ pageTitle }).run(content({ pageTitle })); 