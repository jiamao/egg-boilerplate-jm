
import { Context } from 'egg';
import decorators from "../lib/decorator";
import Article from '../model/session';

export default class IndexController {

  public async home(ctx: Context) { 
    await ctx.render('admin/home.js', { url: ctx.url });
  }

}