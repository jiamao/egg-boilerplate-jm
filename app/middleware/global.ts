import { Context } from 'egg';
export default () => {
  return async function global(ctx: Context, next: any) {
    ctx.locals.locale = ctx.query.locale || 'cn';
    ctx.locals.origin = ctx.request.origin;

    ctx.ua = ctx.get('user-agent') || '';
    ctx.isWXWork = ctx.ua.match(/wxwork\/(\d\.)+/);
    //console.log(ctx.isWXWork);
    await next();
  };
};