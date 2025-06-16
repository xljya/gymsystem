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
# 这个端口号应该与您项目中 application.yml 文件里配置的 `server.port` 一致。
EXPOSE 8080

# 容器启动时执行的命令
# java -jar /app/app.jar          : 启动 Spring Boot 应用。
# --spring.profiles.active=prod   : 这是一个命令行参数，用于激活 Spring Boot 的 `prod` 环境配置。
#                                  您需要在 `src/main/resources` 目录下有一个 `application-prod.yml` (或 .properties) 文件来定义生产环境的配置。
CMD ["java", "-jar", "/app/app.jar", "--spring.profiles.active=prod"]