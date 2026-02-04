@echo off
REM Script para criar primeiro admin no Windows

if "%1"=="" (
  echo Uso: create-admin.bat [username] [password]
  echo Exemplo: create-admin.bat admin minhasenhah123
  exit /b 1
)

setlocal enabledelayedexpansion

set USERNAME=%1
set PASSWORD=%2
set SECRET=Admin@2024#Perfumes$Secure!Key123

echo.
echo 🔐 Criando admin...
echo Username: %USERNAME%
echo.

REM Usando PowerShell para fazer a requisição (mais compatível com Windows)
powershell -Command ^
$body = @{ ^
    username = '%USERNAME%'; ^
    password = '%PASSWORD%'; ^
    secret = '%SECRET%' ^
} | ConvertTo-Json; ^
Invoke-RestMethod -Uri 'http://localhost:3000/api/admin/register' -Method POST -ContentType 'application/json' -Body $body | ConvertTo-Json

echo.
echo ✅ Admin criado com sucesso!
echo.
echo 🌐 Faça login em: http://localhost:3000/admin/login
echo.
pause
