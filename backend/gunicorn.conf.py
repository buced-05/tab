"""
Configuration Gunicorn dédiée au projet AllAdsMarket.

Elle est utilisée par PM2 (voir ecosystem.config.js) ou directement via la
commande `gunicorn --config backend/gunicorn.conf.py backend.wsgi:application`.
"""

import multiprocessing
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# Bind sur localhost uniquement ; nginx fait office de reverse proxy.
bind = "127.0.0.1:8001"

# Calcul dynamique des workers : (2 * CPU) + 1
workers = multiprocessing.cpu_count() * 2 + 1

# Threads supplémentaires pour absorber les pics légers
threads = 2

# Temps avant timeout (secondes)
timeout = 120

# Définir le répertoire de travail
chdir = str(BASE_DIR)

# Gestion des logs
accesslog = str((BASE_DIR / "logs" / "gunicorn-access.log").resolve())
errorlog = str((BASE_DIR / "logs" / "gunicorn-error.log").resolve())
loglevel = "info"

# Assurer l'existence du dossier de logs
Path(accesslog).parent.mkdir(parents=True, exist_ok=True)

# Paramètres HTTP supplémentaires
forwarded_allow_ips = "*"
proxy_protocol = True

