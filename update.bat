@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cls

@echo [开始] 正在更新子仓库代码...
@echo.

REM 检查是否在 Git 仓库根目录
@if not exist .git (
    @echo [错误] 当前目录不是 Git 仓库，请在仓库根目录运行本脚本。
    @goto end
)

@echo [INFO] 正在更新 frontend 子项目...
@git subtree pull --prefix=frontend frontend gymsystem-frontend --squash -m "自动合并 frontend 更新" >nul 2>&1
@if errorlevel 1 (
    @echo [错误] 更新 frontend 失败！
    @goto end
)
@echo [成功] frontend 更新完成。
@echo.

@echo [INFO] 正在更新 backend 子项目...
@git subtree pull --prefix=backend backend gymsystem-backend --squash -m "自动合并 backend 更新" >nul 2>&1
@if errorlevel 1 (
    @echo [错误] 更新 backend 失败！
    @goto end
)
@echo [成功] backend 更新完成。
@echo.

@echo [完成] 所有子项目已更新！
@goto pause

:end
@echo.
@echo [提示] 脚本执行中止，请检查错误信息。

:pause
@echo.
@pause >nul