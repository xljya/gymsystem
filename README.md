# 健身房管理系统

本系统是一个前后端分离的健身房综合管理平台，旨在实现对会员、教练、课程、排课、预约、商城等业务的统一管理。前端采用 **React + Ant Design Pro + Shadcn UI** 构建现代化后台系统，后端基于 **Spring Boot + MyBatis-Plus + MySQL** 提供接口服务，支持良好的可扩展性与用户体验。

---

## 项目介绍

项目分为会员页面和管理员页面

### 注册

![image-20250605031221442](https://image.liucf.com/images/2025/06/b34f446471ae066906a71c9663ddf288.png)

### 登录

> **会员账号是ceshi1，管理员账号是liucf1，会员和管理员密码都是12345678。**

![image-20250605031300228](https://image.liucf.com/images/2025/06/fdf8d9aa8e1040b5b18a8e72b53c3987.png)

### 会员页面

#### 主页

![image-20250605032547530](https://image.liucf.com/images/2025/06/8f4f570518822f8c09607281bd44fb52.png)



#### 我的预约

![image-20250605032910363](https://image.liucf.com/images/2025/06/7a76ff8e6e61c71f6be404836a29dd41.png)



#### 个人设置

![image-20250605032934350](https://image.liucf.com/images/2025/06/687e78cff7b6e669f3a42a0ae554e2ec.png)





#### 课程

![image-20250605032634438](https://image.liucf.com/images/2025/06/7fdb675772f230d2d912b91f0958fdab.png)





#### 教练

![image-20250605032727816](https://image.liucf.com/images/2025/06/a701d80fa5ebac08c27991dabdb863d9.png)





#### 健身器械

![image-20250605032812189](https://image.liucf.com/images/2025/06/d1beeb96467b523653b820a3dce4edc6.png)





#### 运动商品

![image-20250605032836983](https://image.liucf.com/images/2025/06/2624eb391db893086dac362478912318.png)





#### 关于我们

![image-20250605033003255](https://image.liucf.com/images/2025/06/0bc32b2044a567330929491cebac1e2b.png)





### 管理员页面

#### 欢迎

![image-20250612152359522](https://image.liucf.com/images/2025/06/539d0ed8a49f7d65509b5071ce56a4f0.png)



#### 会员管理

![image-20250612152521092](https://image.liucf.com/images/2025/06/d6c6706fc2cff17857f35a55da3e3499.png)



#### 课程管理

![image-20250612152847071](https://image.liucf.com/images/2025/06/e21215dc854a892e6dd4f0f0352e4145.png)



#### 课程类别管理

![image-20250612152926045](https://image.liucf.com/images/2025/06/ae4c0547d39d008c68d87129dc4fc1c4.png)





#### 课程排期管理

![image-20250612153329827](https://image.liucf.com/images/2025/06/566c7c3392a0de45b8a9db70f0c69e8f.png)



#### 课程预约管理

![image-20250612153713706](https://image.liucf.com/images/2025/06/549fe4ac579a4063e60323ab2120518b.png)



#### 教练管理

![image-20250612153730747](https://image.liucf.com/images/2025/06/8c8360406b7eea455631ae2d0d7d32e2.png)



#### 器械管理

![image-20250612153755753](https://image.liucf.com/images/2025/06/ca18e41f49a1c4a4fa38febb4044ac3f.png)



#### 商品管理

![image-20250612173058312](https://image.liucf.com/images/2025/06/79b19dc365d92ccc355f8df448cf3ee4.png)





#### 商品销售管理

![image-20250612173123370](https://image.liucf.com/images/2025/06/ae294bcd838aff20fd1d51b36a5c3f4f.png)



---



## 项目结构

```bash
fitness-system/
├── frontend/          # 前端项目 (React + UmiJS + Ant Design Pro)
├── backend/           # 后端服务 (Spring Boot)
├── docs/              # 项目文档（接口说明、数据库结构等）
└── README.md
```

---

## 技术栈

### 前端

- React 18.2.0
- UmiJS 4.x
- Ant Design Pro 6.0.0
- antd 5.2.2
- Tailwind CSS
- Radix UI + Shadcn UI
- TypeScript
- Node.js 20.19.0

### 后端

- Java 8
- Spring Framework / Spring MVC / Spring Boot
- MyBatis / MyBatis-Plus
- JUnit 单元测试框架
- MySQL
- Maven 构建工具

---

## 系统功能模块

- 👤 **会员管理**：会员信息增删改查，等级管理
- 🏋️ **教练管理**：教练档案与课程关联管理
- 📚 **课程管理**：私教课/团课管理、课程分类
- 📅 **排课与预约管理**：课程安排与预约功能
- 🏢 **场馆与器材管理**：场地与设备录入、维护
- 🛒 **商品商城模块**：商品信息、订单、库存
- 🔐 **用户权限与认证**：RBAC权限控制

---

## 快速启动

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

访问地址：http://localhost:8000



### 启动后端

配置一下Maven仓库、JDK、application.yml、在pom.xml Run Maven 即可运行项目。

接口默认地址：http://localhost:8080

---

## API 接口设计

采用 RESTful 风格接口。主要控制器：

- `/api/memberController`：会员管理接口
- `/api/courseController`：课程管理接口
- `/api/coachController`：教练管理接口

推荐使用 Swagger 或 Knife4j 查看完整文档：

- http://localhost:8080/doc.html

---

## 单元测试

后端使用 `JUnit` 编写测试用例，覆盖主要业务模块，可扩展 Mock 测试方案。

---

## 数据库设计

- 使用 MySQL 进行数据存储
- 表结构包括：会员表、教练表、课程表、预约表、器材表、订单表等
- SQL 脚本位于 `docs/db-schema.sql`
- 推荐可视化工具：Navicat / DBeaver / MySQL Workbench

---

## License

本项目仅供学习与内部开发使用，禁止任何形式的商业化部署。

---

## 联系方式

如需部署支持或协作开发，欢迎联系作者。



## 图片开源

在项目中，我原本采用了又拍云图床和 Cloudflare R2 存储作为图片资源的托管方案。然而，考虑到项目可能被坏人克隆本地运行😫，进而恶意调用接口、盗刷资源，为降低滥用风险，我决定将部分图片迁移至公共图床 GitHub，并借助 jsDelivr 进行 CDN 加速，以确保访问稳定性并降低运营成本。





## 可以完善地方

1. **缺乏付费机制与功能拓展**  
   当前商品购买功能未涉及任何支付逻辑，所有商品均可直接获取。建议引入**会员充值功能**，并进一步增加如**课程购买**、**器械预约**等增值服务模块，以增强系统的商业化能力和用户粘性。

2. **黑暗模式兼容性不足**  
   系统界面对暗色主题支持较差，部分组件在开启黑暗模式后显示异常，影响用户体验。建议优化暗黑模式下的 UI 样式兼容性，提升整体视觉一致性。

3. **管理员首页跳转异常**  
   管理员登录后点击左上角“健身房管理系统”Logo，会跳转至根路径 `/`，但该路径提示“无权限访问”。建议：  
   - 设置正确的首页路由跳转逻辑；  
   - 或为根路径配置合适的权限控制与展示内容。

4. **后端接口字段冗余**  
   当前后端返回的数据中包含大量前端未使用字段，造成接口数据冗余，不利于前端开发与维护。建议在接口设计阶段对返回字段进行精简，仅返回前端所需的核心数据，以优化数据传输效率和可读性。








# 项目部署
为了方便，项目就部署在宝塔了，因为用的是腾讯云服务器，和宝塔有合作，所以不需要登录手机号，还不错。

## 前端
### 配置文件
配置了生产环境的域名：src\utils\request. ts
```ts
const request = extend({
    credentials: 'include', // 默认请求携带 cookie，用于处理 session 认证
    // 根据环境设置 API 基础路径：生产环境使用线上地址，开发环境使用本地代理
    prefix: process.env.NODE_ENV === 'production' ? 'https://gym-backend.28082003.com' : undefined
    // requestType: 'form', // 可选：设置请求体类型为表单数据
});
```


### 打包
![image.png|300](https://image.liucf.com/images/2025/06/c95331df800f83aed49c6107f4a4aa47.png)

### 部署
#### PHP 项目
>记得上传打包后的 dist 文件夹，然后将文件夹内容移动到网站根目录下
>一般来说上传之后，ctrl+x，ctrl+v，然后删除 dist 文件夹即可。

![image.png|300](https://image.liucf.com/images/2025/06/e49d19295d59bc0c8835233a012d0a2d.png)
![image.png|300](https://image.liucf.com/images/2025/06/0b5a4dea51860d5e09c9644ffb3510c3.png)

在网站设置里面添加一行配置，**主要用于防止直接访问子路由时出现 404 错误**：
```nginx
try_files $uri $uri/ /index.html;
```
![image.png|300](https://image.liucf.com/images/2025/06/63eead9b3570b6f053524d4dee8a21a2.png)

至此，前端项目部署完毕。


## 后端
### 数据库
**数据库导出**：
![image.png](https://image.liucf.com/images/2025/06/4fccddc92172468645b048cc79dbece0.png)
![image.png|300](https://image.liucf.com/images/2025/06/6fd0e6ba077ead70df73a994cf3479dd.png)

**数据库导入**，先在宝塔面板创建数据库，权限设为所有人：
![image.png|300](https://image.liucf.com/images/2025/06/f172425748ea63acb0ba15b72be26cf5.png)
然后回到本地 mysql 进行连接：
![image.png](https://image.liucf.com/images/2025/06/495bacb44af2793963e7346a8bd060ab.png)
接着右键数据库，运行 SQL 脚本即可：
![image.png](https://image.liucf.com/images/2025/06/ed54163a7c96f0b02a563da9f26ec91f.png)

### 配置文件
在 application. yml 的基础上，我写了一个 application-prod. yml，里面内容是云服务器的数据库端口、账号、密码：
```yml
spring:  
  # 数据库配置  
  datasource:  
    driver-class-name: com.mysql.cj.jdbc.Driver  
    url: jdbc:mysql://localhost:3306/gymsystem  
    username: liucf  
    password: **********
```


### 打包
打包后端代码：
![image.png|300](https://image.liucf.com/images/2025/06/d1939dd3e113534af0816332ba317219.png)


### 部署
#### Java 项目
>记得上传 jar 包到自定义文件夹，我传到了/www/wwwroot/gym后端
![image.png|300](https://image.liucf.com/images/2025/06/9bfd347c25895ebf28c5b22dc1ecca8a.png)
![image.png|300](https://image.liucf.com/images/2025/06/c8c99c0624b46eda7688cca87ddad8a0.png)

```cmd
/www/server/java/jdk1.8.0_371/bin/java -jar  -Xmx1024M -Xms256M /www/wwwroot/gym后端/gymsystem-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```


#### 反向代理
![image.png|300](https://image.liucf.com/images/2025/06/60aa9bcb1280eec89e76cffb5463d9a8.png)



