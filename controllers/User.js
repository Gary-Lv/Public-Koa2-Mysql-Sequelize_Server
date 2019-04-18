const UserModel = require("../models/UserModel");

class User {
  /**
   * 创建用户实现方法
   * 成功返回用户信息  失败返回失败信息
   */
  static async CreateUser(ctx) {
    let { username, password, email, age } = ctx.request.body;
    let params = {
      username,
      password,
      email,
      age
    };
    // 检查参数是否不为空
    let errorInfo = [];
    for (let item in params) {
      if (params[item] === undefined) {
        let index = errorInfo.length + 1;
        errorInfo.push("错误" + index + ":参数：" + item + "不能为空");
      }
    }

    if (errorInfo.length > 0) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        message: errorInfo
      };
      return false;
    }

    // 查询用户是否是已经存在的用户
    const existUser = await UserModel.findUser(params.username);
    if (existUser) {
      ctx.response.status = 403;
      ctx.body = {
        code: 403,
        message: "用户已经存在"
      };
    } else {
      try {
        // 创建用户
        await UserModel.createUser(params);
        const newUserInfo = await UserModel.findUser(params.username);

        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          message: "创建用户成功",
          data: newUserInfo
        };
      } catch (err) {
        ctx.response.status = 500;
        ctx.body = {
          code: 500,
          message: err
        };
      }
    }
  }

  /**
   * 删除用户
   */
  static async DelUser(ctx) {
    let { id } = ctx.request.body;
    if (!id) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        message: `ID不能为空`
      };

      return false;
    }

    if (isNaN(id)) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        message: `请传入正确的ID`
      };

      return false;
    }

    try {
      await UserModel.deleteUser(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除成功"
      };
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: err
      };
    }
  }

  /**
   * 获取用户列表
   */
  static async GetAllUserList(ctx) {
    try {
      const userlist = await UserModel.findAllUserList();

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "获取成功",
        data: userlist
      };
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: err
      };
    }
  }
}

module.exports = User;
