#!/bin/bash

echo "🔧 Correction automatique de tous les fichiers JS..."
npx eslint [0-9]*.js --fix
npx eslint *.js --fix
npx eslint full_server/**/*.js --fix 2>/dev/null

echo ""
echo "🔍 Vérification du style avec ESLint :"
npx eslint [0-9]*.js
npx eslint *.js
npx eslint full_server/**/*.js 2>/dev/null

echo ""
echo "✅ Fini ! Si tu vois '0 problems', tout est propre."
