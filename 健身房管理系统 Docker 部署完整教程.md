# 🚀 健身房管理系统 Docker 部署完整教程

## 📋 部署前准备

安装docker可以看这篇[Debian12安装Docker - StargazeのBlog](https://blog.liucf.com/docker/158/)

### 系统要求

- Docker Engine 20.10.0+
- Docker Compose 2.0.0+
- 服务器内存建议 2GB+
- 磁盘空间建议 10GB+
- 我使用的是Debian12（我实际使用的是腾讯云的opencloudos，不熟悉贼麻烦，多亏了 cursor 和 chatgpt），也可以使用Ubuntu，它们指令几乎相同，其他linux系统可以把文档丢给ai ，让它返回和自己相对应的系统指令即可。



### 检查环境

```bash
# 检查 Docker 版本
docker --version

# 检查 Docker Compose 版本
docker compose version

# 检查 Docker 是否正常运行
docker ps
```



### 生产环境推荐配置

#### 配置非 Root 用户运行 Docker 

默认情况下，docker 命令需要 sudo 权限。为了安全和方便，你可以将当前用户添加到 docker 用户组，这样就不再需要每次都输入 sudo 了。

```bash
# 将当前用户（$USER）添加到 docker 组
sudo usermod -aG docker $USER
```

执行完这条命令后，你需要退出当前的 SSH 会话并重新登录，或者执行 newgrp docker 命令，新的用户组权限才会生效。

重新登录后，你可以尝试直接运行 docker ps 来验证是否生效：

```bash
docker ps
# 如果能成功列出容器（即使是空的），说明配置成功
```



#### 配置 Docker 开机自启

为了确保服务器重启后 Docker 服务能自动运行，执行以下命令：

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```







## 📁 项目结构

确保你的项目结构如下：

```text
├── frontend/
│ ├── Dockerfile
│ ├── nginx.conf
│ ├── package.json
│ ├── src/
│ ├── public/
│ └── ... (其他前端文件)
├── backend/
│ ├── Dockerfile
│ ├── target/
│ │ └── gymsystem-backend-.jar
│ └── ... (其他后端文件)
└── docker-compose.yml
```







## 🔧 配置文件

### 1. frontend/nginx.conf

```nginx
server {
    listen 80;

    # 优化的 gzip 配置
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
    }

    # 主应用路由
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        
        # 安全头
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
    }

    # 错误页面
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 2. frontend/Dockerfile

```dockerfile
# ===== 构建阶段 =====
# 我本地使用的是node20
FROM node:20-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package 文件，优化 Docker 缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建项目（包含 Tailwind CSS）
RUN npm run build

# ===== 运行阶段 =====
FROM nginx:1.25-alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 3. backend/Dockerfile

```dockerfile
# 使用官方的 OpenJDK 8 作为基础镜像，选择 alpine 版本以减小镜像体积
# Alpine Linux 是一个轻量级的 Linux 发行版，非常适合作为基础镜像，可以大大减小最终镜像的大小。
FROM openjdk:8-jdk-alpine

# 将一些元数据添加到镜像中，比如维护者信息
LABEL maintainer="liucf <example@gmail.com>"

# 设置容器内的工作目录，后续的命令都会在这个目录下执行
WORKDIR /app

# 将 Maven 构建产物（JAR文件）从主机的 target 目录复制到容器的 /app 目录下
# 这里使用了通配符 * 来匹配 JAR 文件的版本号，这样在项目版本升级时，无需修改 Dockerfile。
# 并将复制后的文件重命名为 app.jar，方便后续统一引用。
COPY target/gymsystem-backend-*.jar /app/app.jar

# 声明容器在运行时对外暴露的端口
# 这个端口号应该与你项目中 application.yml 文件里配置的 `server.port` 一致。
EXPOSE 8080

# 容器启动时执行的命令
# java -jar /app/app.jar          : 启动 Spring Boot 应用。
# --spring.profiles.active=prod   : 这是一个命令行参数，用于激活 Spring Boot 的 `prod` 环境配置。
#                                  你需要在 `src/main/resources` 目录下有一个 `application-prod.yml` (或 .properties) 文件来定义生产环境的配置。
CMD ["java", "-jar", "/app/app.jar", "--spring.profiles.active=prod"]
```

### 4. docker-compose.yml

```yaml
version: '3.8'

services:
  # 主反向代理服务
  nginx-proxy:
    image: nginx:1.25-alpine
    container_name: gymsystem-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # 挂载主代理的配置文件 (需在根目录创建此文件)
      - ./nginx-proxy.conf:/etc/nginx/conf.d/default.conf
      # 挂载 Let's Encrypt 生成的 SSL 证书
      - /etc/letsencrypt:/etc/letsencrypt
    networks:
      - gymsystem-network
    depends_on:
      - frontend
      - backend
    ulimits:
      nofile:
        soft: 65535
        hard: 65535

  # 后端服务
  backend:
    container_name: gymsystem-backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      # Spring Boot 生产环境配置
      - SPRING_PROFILES_ACTIVE=prod
    networks:
      - gymsystem-network
    extra_hosts:
      - "host.docker.internal:host-gateway"  # ⭐ 添加这一行，支持容器内访问宿主机
    ulimits:
      nofile:
        soft: 65535
        hard: 65535

  # 前端服务
  frontend:
    container_name: gymsystem-frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    depends_on:
      - backend
    networks:
      - gymsystem-network
    ulimits:
      nofile:
        soft: 65535
        hard: 65535

# 定义网络
networks:
  gymsystem-network:
    driver: bridge

```

### 5. application.yml

```yml
spring:
  application:
    name: gymsystem-backend # 应用名称
  # 默认 dev 环境
  # 而项目中没有 application-dev.yml，Spring Boot 就不会加载任何额外配置文件（只会加载 application.yml）
  # 先加载：application.yml（基础配置，通用配置）
  # 再加载：application-dev.yml（根据激活的 prod profile）
  # 最终结果：application-dev.yml 中的属性会覆盖掉 application.yml 中相同的属性。
  profiles:
    active: dev
  # 支持 swagger3
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
  session:
    store-type: none
  # 数据库配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/gymsystem
    username: root
    password: 123456
    
server:
  address: 0.0.0.0
  port: 8080
  servlet:
    context-path: /api
    # session 失效时间 1 天
    session:
      timeout: 86400
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      table-underline: true # 开启驼峰转下划线
      logic-delete-field: isDelete # 全局逻辑删除的实体字段名
      logic-delete-value: 1 # 逻辑已删除值（默认为 1）
      logic-not-delete-value: 0 # 逻辑未删除值（默认为 0）


# 接口文档配置
knife4j:
  enable: true
  openapi:
    title: "接口文档"
    version: 1.0
    group:
      default:
        api-rule: package
        api-rule-resources:
          - com.liucf.gymsystembackend.controller
```

### 6. application-prod.yml

```yml
spring:
  # 数据库配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://host.docker.internal:3306/gymsystem
    username: liucf
    password: *********
```





## 🚀 部署步骤

### 1. 克隆项目并进入目录

>我自己是克隆后，上传的application-prod.yml

```bash
# 创建目录和授权
mkdir -p /root/data/docker_data/gymsystem
cd /root/data/docker_data/gymsystem
chmod -R 777 /root/data/docker_data/gymsystem

# 克隆项目
git clone https://github.com/xljya/gymsystem.git
cd gymsystem/
```

### 2. 构建后端项目（如果还没有 JAR 包）

> **切记每次改完后端代码，要重新打jar包（卡了我一天时间+¥50）！！！**

```bash
# 进入后端目录
cd backend

# 使用 Maven 构建项目
sudo apt install maven -y
mvn clean package -DskipTests

# 确认 JAR 包生成
ls -la target/*.jar

# 返回项目根目录
cd ..
```

### 3. 一键启动所有服务

```bash
# 因为网络问题导致启动报错可以看看这个开源项目
# https://github.com/dongyubin/DockerHub
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://docker.xiaogenban1993.com/",
    "https://docker.yomansunter.com/",
    "https://a.ussh.net/"
  ]
}
EOF

sudo systemctl restart docker

# 构建并启动所有服务
docker compose up --build

# 或者在后台运行
docker compose up --build -d

# 后面又报错80端口被占用，因为我宿主机确实运行着nginx，所以需要kill掉进程 再进行部署
sudo lsof -i :80
sudo kill -9 3979712 3979713 4130500
```

### 4. 验证部署

```bash
# 查看运行中的容器
docker compose ps

# 查看日志
docker compose logs

# 查看特定服务的日志
docker compose logs frontend
docker compose logs backend
```



## 🌐 域名和 HTTPS 配置

要在生产环境中使用 https://gym.28082003.com 和 https://gym-backend.28082003.com，请遵循以下步骤。

### 步骤 1: DNS 解析

在你的域名提供商处，为你的服务器 IP 地址添加两条 A 记录：

- gym.28082003.com -> A 记录 -> 你的服务器公网IP

- gym-backend.28082003.com -> A 记录 -> 你的服务器公网IP



### 步骤 2: 获取 SSL 证书

我们推荐使用 Let's Encrypt 提供的免费证书。在你的服务器上安装 Certbot，然后为两个域名获取证书。

```bash
# 安装 Certbot (以 Ubuntu 为例)
sudo snap install --classic certbot

# 验证是否安装成功
certbot --version

sudo ln -s /snap/bin/certbot /usr/bin/certbot

# 使用 standalone 模式获取证书 (会临时占用80端口，请确保没有服务在运行)
sudo certbot certonly --standalone -d gym.28082003.com -d gym-backend.28082003.com

# 下载options-ssl-nginx.conf 和生成ssl-dhparams.pem
sudo curl -o /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dummy.conf

sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
```

成功后，你的证书文件将位于 /etc/letsencrypt/live/ 目录下。



### 步骤 3: 创建主代理配置文件

在你的项目根目录下，创建一个名为 nginx-proxy.conf 的新文件。这个文件是路由和 HTTPS 的核心。

```nginx
# nginx-proxy.conf

# --- 前端服务配置 (gym.28082003.com) ---
server {
    listen 80;
    server_name gym.28082003.com;

    # 将所有 HTTP 请求重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name gym.28082003.com;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/gym.28082003.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gym.28082003.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        # 'frontend' 是 docker-compose.yml 中定义的服务名
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# --- 后端服务配置 (gym-backend.28082003.com) ---
server {
    listen 80;
    server_name gym-backend.28082003.com;

    # 将所有 HTTP 请求重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name gym-backend.28082003.com;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/gym.28082003.com/fullchain.pem; # 注意：这里使用同一个证书，因为申请时包含了两个域名
    ssl_certificate_key /etc/letsencrypt/live/gym.28082003.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        # 'backend' 是 docker-compose.yml 中定义的服务名
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```



### 步骤 4: 后端 CORS 配置 

由于前端 https://gym.28082003.com 会直接请求后端 https://gym-backend.28082003.com，这会产生跨域（CORS）问题。你必须在后端的 Spring Boot 应用中配置允许来自前端域名的请求。

在你的 Spring Security 配置中添加类似如下的 CorsConfigurationSource：

```java
// 示例：Spring Security CORS 配置
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    // 允许来自前端域名的请求
    configuration.setAllowedOrigins(Arrays.asList("https://gym.28082003.com"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

并且在你的 SecurityFilterChain 中启用它 .cors(Customizer.withDefaults())。



虽然我自己暂时自用的是通用后端跨域配置类，安全性较低，但胜在比较简单：

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 覆盖所有请求
        registry.addMapping("/**")
                // 允许发送 Cookie
                .allowCredentials(true)
                // 放行哪些域名（必须用 patterns，否则 * 会和 allowCredentials 冲突）
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("*");
    }
}
```



## 🌐 访问应用

- **前端应用:** https://gym.28082003.com

- **后端API:** https://gym-backend.28082003.com





## 📊 常用管理命令

### 查看状态

```bash
# 查看所有服务状态
docker compose ps

# 查看资源使用情况
docker compose top

# 实时查看日志
docker compose logs -f
```

### 重启服务

```bash
# 重启所有服务
docker compose restart

# 重启特定服务
docker compose restart frontend
docker compose restart backend
```

### 更新部署

```bash
# 停止服务
docker compose down

# 重新构建并启动
docker compose up --build -d

# 或者分步骤
docker compose build
docker compose up -d
```

### 清理资源

```bash
# 停止并删除容器、网络
docker compose down

# 停止并删除容器、网络、镜像
docker compose down --rmi all

# 停止并删除所有相关资源（包括数据卷）
docker compose down --volumes --rmi all
```

## 🔍 故障排查

### 1. 检查服务健康状态

```bash
# 查看容器详细信息
docker compose ps -a

# 查看服务日志
docker compose logs backend
docker compose logs frontend
```

### 2. 检查网络连接

```bash
# 进入前端容器检查网络
docker compose exec frontend sh

# 在容器内测试后端连接
ping backend
wget -O- http://backend:8080/api/health  # 如果有健康检查接口
```

### 3. 常见问题解决

#### 问题：构建失败

```bash
# 清理 Docker 缓存
docker system prune -a

# 重新构建
docker compose build --no-cache
```

#### 问题：前端无法访问后端API

- 检查 nginx.conf 中的 proxy_pass 配置
- 确认后端服务正常运行
- 检查防火墙设置

## 🚀 生产环境优化

> 我没优化

### 1. 环境变量配置

创建 `.env` 文件：

```bash
# .env
COMPOSE_PROJECT_NAME=gymsystem
BACKEND_PORT=8080
FRONTEND_PORT=80
SPRING_PROFILES_ACTIVE=prod
```

### 2. 数据持久化

如果使用数据库，确保数据卷正确配置：

```yaml
volumes:
  - db_data:/var/lib/mysql
  - ./backup:/backup  # 备份目录
```

### 3. 日志管理

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 4. 定期备份

```bash
# 创建备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker compose exec db mysqldump -u root -p gymsystem > backup_$DATE.sql
```

## 📝 注意事项

> 基本没注意

1. **安全性**: 在生产环境中，请确保修改所有默认密码
2. **性能**: 根据服务器配置调整 JVM 参数和 Nginx 配置
3. **监控**: 建议配置日志收集和监控系统
4. **备份**: 定期备份数据库和重要文件
5. **更新**: 保持 Docker 镜像和依赖的及时更新









