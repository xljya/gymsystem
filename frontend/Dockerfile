# ===== 构建阶段 =====
# 我本地使用的是node20，所以这里使用node20-alpine
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