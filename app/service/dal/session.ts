import { Context, Service } from 'egg';
import Session from '../../model/session';
import BaseService from "./base";

export default class SessionService extends BaseService<Session> {
  
  constructor(ctx: Context) {
    super(ctx, Session);
  }

  // 通过id获取session，不存在则返回null
  async getById(id: string): Promise<Session> {
    let session = await super.get(id);
    return session;
  }
}
