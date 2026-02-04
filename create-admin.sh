#!/bin/bash
# Script para criar primeiro admin

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Uso: ./create-admin.sh <username> <password>"
  echo "Exemplo: ./create-admin.sh admin minhasenhah123"
  exit 1
fi

USERNAME=$1
PASSWORD=$2
SECRET=${ADMIN_SECRET_KEY:-"Admin@2024#Perfumes\$Secure!Key123"}

echo "🔐 Criando admin..."
echo "Username: $USERNAME"

curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$USERNAME\",
    \"password\": \"$PASSWORD\",
    \"secret\": \"$SECRET\"
  }"

echo ""
echo "✅ Admin criado! Faça login em: http://localhost:3000/admin/login"
