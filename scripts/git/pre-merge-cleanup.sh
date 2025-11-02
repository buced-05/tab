#!/bin/bash

# Pre-merge hook pour nettoyer automatiquement les fichiers générés
# Place ce fichier dans .git/hooks/pre-merge pour l'activer automatiquement

bash scripts/git/clean-generated-files.sh

