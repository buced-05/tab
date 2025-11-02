@echo off
REM Pre-merge hook pour nettoyer automatiquement les fichiers generes
REM Place ce fichier dans .git/hooks/pre-merge pour l'activer automatiquement

call scripts\git\clean-generated-files.bat

