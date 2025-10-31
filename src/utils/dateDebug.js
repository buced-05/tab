/**
 * Fonction de débogage pour vérifier les dates
 */
export const debugDates = () => {
  const now = new Date();
  const utcNow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  ));
  
  console.log('=== DEBUG DATES ===');
  console.log('Date système:', now.toString());
  console.log('Date UTC:', utcNow.toISOString());
  console.log('UTC Year:', utcNow.getUTCFullYear());
  console.log('UTC Month:', utcNow.getUTCMonth() + 1);
  console.log('UTC Date:', utcNow.getUTCDate());
  console.log('Format FR UTC:', utcNow.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    calendar: 'gregory'
  }));
  console.log('Format FR UTC avec heure:', utcNow.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
    calendar: 'gregory'
  }));
  console.log('==================');
  
  return utcNow;
};

