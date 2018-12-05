const content = require('./workbench.ejs');
const layout = require('../layout/layout.js');
const pageTitle = '工作台 - PM.DO 项目管理云';
//require('../common/edit_broad_modal.html');

module.exports = layout.init({ pageTitle }).run(content({ pageTitle })); 