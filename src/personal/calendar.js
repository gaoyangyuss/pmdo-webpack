const content = require('./calendar.ejs');
const layout = require('../layout/layout.js');
const pageTitle = '日程表 - PM.DO 项目管理云';
//require('../personal/calendar_event_add_modal.html');
//require('../personal/calendar_add_modal.html');

module.exports = layout.init({ pageTitle }).run(content({ pageTitle })); 