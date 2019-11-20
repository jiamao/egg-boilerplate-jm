# jm 框架脚手架



## Document

## QuickStart

- Development Mode

```bash
$ npm run dev
```

- Publish Mode

```bash
npm run tsc
npm run build
npm start
```

## Features

## 分层
后台分为 `Model`(数据类)  `Bll`(业务逻辑层)  `Dal`(DB层)
网上的三层介绍[https://wenku.baidu.com/view/888e9be8f8c75fbfc77db29c.html](https://wenku.baidu.com/view/888e9be8f8c75fbfc77db29c.html)
### ORM
DB访问我们采用 `typeorm` [https://github.com/typeorm/typeorm](https://github.com/typeorm/typeorm)。

#### Model
model跟DB中的表一对一关联，无需我们手工创建和修改表，只要修改model。如果数据库用户有权限typeorm会帮我们维护表结构。
示例：
```ts
'use strict';

import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('t_article')
export default class Article extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'Fid',
    type: 'int',
    comment: '自增唯一健'
  })
  public id?: number;

  @Column({
    name: 'Ftitle',
    type: 'varchar',
    length: 32
  })
  public title?: string;
  
  @Column({
    name: 'Fcreate_time',
    type: 'datetime'
  })
  public createTime?: string;

  @Column({
    name: 'Fmodify_time',
    type: 'timestamp'
  })
  public modifyTime?: string;
}
```

#### 数据库访问层
数据库访问也是全部放在了`service/dal`目录。 如果业务场景不需要特殊的DB访问逻辑，那么它的逻辑层`service`只需继承`dal/base.ts`即可。

#### 逻辑层

逻辑层全放在`service/bll`目录下， 继承`service/dal/base`就可以拥有基础的数据库操作接口。如果需要特殊DB访问逻辑的，请在`dal`中创建独立的DB访问`service`并继承`BaseService`。

### Controller
我们把`controller`封装成了一个统一的入口，不需要重复配置`router`。
例如，我们在`controller`下创建一个`admin.ts`:
```ts

import { Context } from 'egg';
import Article from '../model/article';

export default class AdminController {
  public async list(ctx: Context) {
    return await ctx.service.bll.article.getAll();
  }
}
```

不需要做任何配置，我们就可以通过`http://fmp.oa.com/framework/api/admin/list` 访问到这个接口。

> 如果需要在controller中使用多级目录，则在访问url中用`/`表示，如：`/api/my/admin/list`, 表示在`controller/my`目录下的`admin`  controller中的`list`方法。

#### 返回数据
你只需要在你的接口中，直接`return {}` 任意你想返回的数据结构。`api`会把它赋给最终结果的`data`属性下。
例如：
```ts
public async add(ctx: Context) {
    return {"name": "my"};
  }
```
最终调用者拿到的是
```ts
{
  ret: 0,
  msg: "",
  data: {
    "name": "my"
  }
}
```
如果你想自已定义返回的结果，你也可以返回`IApiResult`结构。底层会原样返回。
```ts
/**
 * api 返回数据标准结构
 */
declare interface IApiResult {
  ret: number,
  msg: string,
  data?: any
}
```
#### 抛出异常
基础`api`会`catch`异常，然后按同上的返回方式返回`ret`和`msg`。这里的`ret`统一定义为10001。
如果`controller`方想自定义异常信息，你可以直接抛出`IApiResult`结构信息。
```ts
throw {ret: 10086, msg: "我是自定义错误"};
```

### 服务鉴权
服务鉴权主要提供一个简单的拒绝非法请求功能，基于ts的`decorator`实现。
服务端在config中需要配置一个accessKey， 需要调用当前服务的必须知道这个服务的key并用通用方法计算出来。
```json
// 中间件access配置
  // 用来请求鉴权  只需要针对/api/ 这类的service请求
  // 计算方法 md5(accessKey + ',' + timestamp)
  config.access = {
    enabled: true, // false 表示不启用鉴权
    accessKey: 'jm.framework' // 用来计算token的当前系统唯一key
  }
```
可以用配置`enabled`来启用关闭，每个系统自已可以配置唯一的`accessKey`来识别请求。

当一个接口需要使用鉴权时，只需加上装饰器即可。
```js

import { Context } from 'egg';
import decorators from "../lib/decorator";

export default class AdminController {

  @decorators.checkApiToken(true) // 标记需要校验token
  public async list(ctx: Context) {
    return await ctx.service.bll.article.getAll();
  }
}
```



## TypeScript

- https://github.com/kaorun343/vue-property-decorator
- https://github.com/ktsn/vuex-class


## License

[MIT](LICENSE)
