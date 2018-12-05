/*const config = require('configModule');
const noJquery = require('withoutJqueryModule');*/
const layout = require('./layout.ejs');
/*const header = require('../common/header.ejs');
const footer = require('../common/footer.ejs');*/
const topNav = require('../common/top_nav.ejs');
const sidebar = require('../common/sidebar.ejs');
/*const dirsConfig = config.DIRS;*/

const pf = {
  pageTitle: '',
  /*constructInsideUrl: noJquery.constructInsideUrl,*/
};

const moduleExports = {
  init({ pageTitle }) {
    pf.pageTitle = pageTitle;
    return this;
  },

  run(content) {
    /*const headerRenderData = Object.assign(dirsConfig, pf);*/
    const renderData = {
      /*header: header(headerRenderData),
      footer: footer(),*/
      pageTitle:pf.pageTitle,
      topNav: topNav(),
      sidebar: sidebar(),
      content,
    };
    return layout(renderData);
  },
};

module.exports = moduleExports;