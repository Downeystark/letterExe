@echo off
:mkdir
set/p dir=请输入你要创建的文件名:
md %dir%
echo.>%dir%/%dir%.html
echo.>%dir%/%dir%.js
echo.>%dir%/%dir%.wxml
echo.>%dir%/%dir%.wxss
goto mkdir