#!/bin/bash

# Script pour nettoyer les fichiers générés avant un merge/pull
# Évite les conflits avec dist/index.html, dist/sitemap.xml, etc.

echo ""
echo "========================================"
echo "Nettoyage des fichiers générés"
echo "========================================"
echo ""

# Vérifier si Git est disponible
if ! command -v git &> /dev/null; then
    echo "[ERREUR] Git n'est pas installé ou n'est pas dans le PATH"
    exit 1
fi

echo "[1/4] Suppression du dossier dist/..."
if [ -d "dist" ]; then
    rm -rf dist
    echo "  ✓ Dossier dist/ supprimé"
else
    echo "  ℹ Dossier dist/ n'existe pas"
fi

echo ""
echo "[2/4] Suppression des fichiers générés dans Git cache..."
if git ls-files dist/ &> /dev/null; then
    git rm -r --cached dist/ 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "  ✓ Fichiers dist/ supprimés du cache Git"
    fi
else
    echo "  ℹ Aucun fichier dist/ dans le cache Git"
fi

echo ""
echo "[3/4] Vérification des fichiers tracks dans dist/..."
if git ls-files dist/ &> /dev/null; then
    echo "  ⚠ Des fichiers dist/ sont encore trackés dans Git"
    echo "  Exécution: git rm -r --cached dist/"
    git rm -r --cached dist/
    echo "  ✓ Fichiers supprimés du cache Git"
else
    echo "  ✓ Aucun fichier dist/ n'est tracké dans Git"
fi

echo ""
echo "[4/4] Vérification du .gitignore..."
if grep -q "dist/" .gitignore 2>/dev/null; then
    echo "  ✓ dist/ est bien dans .gitignore"
else
    echo "  ⚠ ATTENTION: dist/ n'est pas dans .gitignore"
fi

echo ""
echo "========================================"
echo "Nettoyage terminé avec succès!"
echo "========================================"
echo ""
echo "Vous pouvez maintenant exécuter:"
echo "  git pull"
echo "  git merge"
echo "  git rebase"
echo ""

