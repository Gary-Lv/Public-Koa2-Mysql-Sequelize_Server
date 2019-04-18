const db = require("../config/db");
const Sequelize = db.sequelize;
const User = Sequelize.import("../scheam/user.js");

// 如果是初次运行项目  取消下面的注释  会自动同步数据库表结构
// sync的其他高级用法  可以百度去查找
// User.sync()

class UserModel {
  /**
   * 创建用户方法
   */
  static async createUser(user) {
    await User.create(user);
    return true;
  }

  /**
   * 删除用户
   */
  static async deleteUser(id) {
    await User.destroy({
      where: {
        id
      }
    });
    return true;
  }

  /**
   * 查询用户列表
   */
  static async findAllUserList() {
    return await User.findAll({
      attributes: ["id", "username", "email", "age"]
    });
  }

  /**
   * 根据用户名称查询用户
   */
  static async findUser(username) {
    return await User.findOne({
      where: {
        username
      }
    });
  }
}

module.exports = UserModel;
