const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const views = require('koa-views');
const port = 6006;
app.use(static(__dirname + '/storybook-static'));
app.use(views(__dirname + '/storybook-static', {
  extension: 'ejs'
}));
app.use(async (ctx) => {
  await ctx.render('index.html');
});
app.listen(port, () => {
  console.log(`server is listening:${port}`);
});
