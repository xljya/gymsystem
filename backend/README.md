# 健身房管理系统后端

## 项目结构说明

本项目采用SpringBoot+MyBatis-Plus框架开发，使用Maven进行依赖管理。以下是项目主要目录结构及其作用说明：

```
src
├── main                         # 主代码目录
│   ├── java                     # Java源代码
│   │   └── com.liucf.gymsystembackend
│   │       ├── annotation       # 自定义注解（如权限校验注解）
│   │       ├── aop              # 面向切面编程（处理日志、权限等横切关注点）
│   │       ├── common           # 通用类（如统一响应对象、常量等）
│   │       ├── config           # 配置类（如Web配置、线程池配置等）
│   │       ├── constant         # 常量定义（如用户角色常量、状态码等）
│   │       ├── controller       # 控制器层（处理HTTP请求，调用服务层）
│   │       ├── exception        # 异常处理（自定义异常及全局异常处理）
│   │       ├── mapper           # 数据访问层（MyBatis-Plus接口）
│   │       ├── model            # 数据模型
│   │       │   ├── dto          # 数据传输对象（Data Transfer Object）
│   │       │   ├── entity       # 实体类（对应数据库表）
│   │       │   ├── enums        # 枚举类（如用户角色枚举）
│   │       │   └── vo           # 视图对象（View Object，用于前端展示）
│   │       ├── service          # 服务层（实现业务逻辑）
│   │       │   └── impl         # 服务实现类
│   │       └── utils            # 工具类（如日期工具、字符串工具等）
│   └── resources                # 资源文件目录
│       ├── mapper               # MyBatis映射文件
│       ├── static               # 静态资源
│       └── application.yml      # 应用配置文件
└── test                         # 测试代码目录
```

## 核心包说明

### model包

model包包含了系统中所有的数据模型，分为几个子包：

#### entity包

entity包中的类直接映射到数据库表，每个实体类对应一个数据库表。例如：
- `Members.java` - 会员信息表
- `Course.java` - 课程信息表
- `CourseSchedule.java` - 课程排期表
- `CourseBooking.java` - 课程预约表

#### dto包（Data Transfer Object）

dto包中的类**不是**用来模拟前端请求的，而是专门用于在不同层之间传输数据的对象。主要用途：

1. **接收前端请求数据**：dto类定义了接口需要接收的参数格式，控制器层使用这些类来接收和验证前端传入的JSON数据。
2. **参数校验**：通过在dto类上添加验证注解，实现对请求参数的校验。
3. **数据转换**：将前端数据转换为服务层所需的格式，避免直接暴露实体类。

dto包按功能模块分组，例如：
- `member/MemberUpdateRequest.java` - 会员更新请求
- `member/MemberPasswordUpdateRequest.java` - 会员密码更新请求
- `course/CourseBookingAddRequest.java` - 课程预约添加请求

#### vo包（View Object）

vo包中的类用于向前端返回数据，通常会对敏感信息进行脱敏处理。例如：
- `MemberVO.java` - 会员视图对象（不包含密码等敏感信息）
- `LoginMemberVO.java` - 登录会员视图对象
- `CourseBookingVO.java` - 课程预约视图对象（包含会员名称、课程名称等额外信息）

### controller包

controller包中的类负责接收HTTP请求，调用服务层处理业务逻辑，并返回处理结果。

例如：
- `MemberController.java` - 处理会员相关请求（注册、登录、个人信息管理等）
- `CourseBookingController.java` - 处理课程预约相关请求

### service包

service包包含业务逻辑接口及其实现类：
- `service/MembersService.java` - 会员服务接口
- `service/impl/MembersServiceImpl.java` - 会员服务实现

## 核心功能模块

1. **会员管理**：会员注册、登录、个人信息管理、密码修改
2. **课程管理**：课程信息管理、课程排期
3. **预约管理**：课程预约、取消预约、预约记录查询
4. **教练管理**：教练信息管理
5. **设备管理**：健身设备管理
6. **商品管理**：健身商品管理、交易记录

## 技术特点

1. **分层架构**：控制器层、服务层、数据访问层清晰分离
2. **统一响应**：使用`BaseResponse`封装所有接口返回
3. **全局异常处理**：统一处理异常并返回友好信息
4. **权限控制**：通过注解实现接口权限控制
   - **核心机制**：采用AOP（面向切面编程）思想，将权限校验逻辑与业务代码分离。
   - **主要组件**：
     - `AuthInterceptor.java`: 作为切面（`@Aspect`），定义了权限校验的具体逻辑。它使用`@Around`通知拦截被特定注解标记的方法。
     - `@AuthCheck`: 自定义注解，用于标记Controller中需要进行权限检查的方法，并可指定所需角色（如 `mustRole = MemberConstant.ADMIN_ROLE`）。
   - **工作流程**：
     1. 当HTTP请求到达被`@AuthCheck`注解标记的Controller方法时，AOP框架自动激活。
     2. `AuthInterceptor`的通知方法被触发。
     3. 拦截器获取当前登录用户信息及方法要求的角色。
     4. 校验用户权限：若不满足，则抛出异常，阻止方法执行；若满足，则允许目标方法执行。
   - **优点**：
     - **代码解耦**：业务代码更纯粹，不耦合权限判断。
     - **高可维护性**：权限规则集中管理，修改方便。
     - **易于扩展**：新增接口或调整权限只需使用注解，无需修改大量业务代码。
5. **数据验证**：请求数据自动验证
6. **事务管理**：关键业务操作使用事务保证数据一致性




# 数据库导出与导入
## 导出
选中数据库使用'mysqldump'导出

## 导入
选中SQL脚本中的运行SQL脚本
