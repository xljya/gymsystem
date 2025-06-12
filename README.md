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

```bash
cd backend
mvn clean install
java -jar target/*.jar
```

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





## 可以完善地方（ai美化）

1. 增加会员金额  现在商品购买 都是不需要花钱的，可以增加课程购买功能，器械预约功能。
2. 对黑暗模式的兼容不太好。
3. 管理员登录后，左上角健身房管理系统点击后跳转到/，提示没权限
4.  后端返回字段远多余前端需要字段，数据冗余
5. 

