@echo off
chcp 65001 >nul

echo [开始] 正在更新子仓库代码...

REM 检查是否在 git 仓库根目录
if not exist .git (
    echo [错误] 当前目录不是 Git 仓库，请在仓库根目录运行本脚本。
    pause
    exit /b 1
)

echo [INFO] 正在更新 frontend 子项目...
git subtree pull --prefix=frontend frontend gymsystem-frontend --squash
if %errorlevel% neq 0 (
    echo [错误] 更新 frontend 失败！
    pause
    exit /b %errorlevel%
)

echo [INFO] 正在更新 backend 子项目...
git subtree pull --prefix=backend backend gymsystem-backend --squash
if %errorlevel% neq 0 (
    echo [错误] 更新 backend 失败！
    pause
    exit /b %errorlevel%
)

echo [成功] 所有子项目已更新完成！
pause
