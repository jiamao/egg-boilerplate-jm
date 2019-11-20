import { Context, Service } from 'egg';
import User from '../../model/user';
import BaseService from "./base";

export default class UserService extends BaseService<User> {
  
  constructor(ctx: Context) {
    super(ctx, User);
  }

  // 通过员工id获取员工信息
  async getById(id: string): Promise<User> {
    let u = await super.get(id);
    return u;
  }
}
