@echo off
:mkdir
set/p dir=��������Ҫ�������ļ���:
md %dir%
echo.>%dir%/%dir%.html
echo.>%dir%/%dir%.js
echo.>%dir%/%dir%.wxml
echo.>%dir%/%dir%.wxss
goto mkdir