// Currency utility for multi-currency support
// import geolocationService from './geolocation.js'; // Removed unused service

class CurrencyService {
  constructor() {
    this.currencies = {
      USD: { symbol: '$', code: 'USD', name: 'US Dollar', rate: 1.0 },
      EUR: { symbol: '€', code: 'EUR', name: 'Euro', rate: 0.85 },
      GBP: { symbol: '£', code: 'GBP', name: 'British Pound', rate: 0.73 },
      JPY: { symbol: '¥', code: 'JPY', name: 'Japanese Yen', rate: 110.0 },
      CAD: { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar', rate: 1.25 },
      AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar', rate: 1.35 },
      CHF: { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc', rate: 0.92 },
      CNY: { symbol: '¥', code: 'CNY', name: 'Chinese Yuan', rate: 6.45 },
      INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee', rate: 74.0 },
      BRL: { symbol: 'R$', code: 'BRL', name: 'Brazilian Real', rate: 5.2 },
      MXN: { symbol: '$', code: 'MXN', name: 'Mexican Peso', rate: 20.0 },
      RUB: { symbol: '₽', code: 'RUB', name: 'Russian Ruble', rate: 73.0 },
      KRW: { symbol: '₩', code: 'KRW', name: 'South Korean Won', rate: 1180.0 },
      SGD: { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar', rate: 1.35 },
      HKD: { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar', rate: 7.8 },
      NOK: { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone', rate: 8.5 },
      SEK: { symbol: 'kr', code: 'SEK', name: 'Swedish Krona', rate: 8.7 },
      DKK: { symbol: 'kr', code: 'DKK', name: 'Danish Krone', rate: 6.3 },
      PLN: { symbol: 'zł', code: 'PLN', name: 'Polish Zloty', rate: 3.9 },
      CZK: { symbol: 'Kč', code: 'CZK', name: 'Czech Koruna', rate: 21.5 },
      HUF: { symbol: 'Ft', code: 'HUF', name: 'Hungarian Forint', rate: 300.0 },
      RON: { symbol: 'lei', code: 'RON', name: 'Romanian Leu', rate: 4.2 },
      BGN: { symbol: 'лв', code: 'BGN', name: 'Bulgarian Lev', rate: 1.66 },
      HRK: { symbol: 'kn', code: 'HRK', name: 'Croatian Kuna', rate: 6.4 },
      TRY: { symbol: '₺', code: 'TRY', name: 'Turkish Lira', rate: 8.5 },
      ZAR: { symbol: 'R', code: 'ZAR', name: 'South African Rand', rate: 14.5 },
      ILS: { symbol: '₪', code: 'ILS', name: 'Israeli Shekel', rate: 3.2 },
      AED: { symbol: 'د.إ', code: 'AED', name: 'UAE Dirham', rate: 3.67 },
      SAR: { symbol: '﷼', code: 'SAR', name: 'Saudi Riyal', rate: 3.75 },
      EGP: { symbol: '£', code: 'EGP', name: 'Egyptian Pound', rate: 15.7 },
      NGN: { symbol: '₦', code: 'NGN', name: 'Nigerian Naira', rate: 410.0 },
      KES: { symbol: 'KSh', code: 'KES', name: 'Kenyan Shilling', rate: 110.0 },
      GHS: { symbol: '₵', code: 'GHS', name: 'Ghanaian Cedi', rate: 6.0 },
      MAD: { symbol: 'د.م.', code: 'MAD', name: 'Moroccan Dirham', rate: 9.0 },
      TND: { symbol: 'د.ت', code: 'TND', name: 'Tunisian Dinar', rate: 2.8 },
      DZD: { symbol: 'د.ج', code: 'DZD', name: 'Algerian Dinar', rate: 135.0 },
      // West African CFA Franc (UEMOA)
      XOF: { symbol: 'CFA', code: 'XOF', name: 'West African CFA Franc', rate: 600.0 },
      // Central African CFA Franc (CEMAC)
      XAF: { symbol: 'FCFA', code: 'XAF', name: 'Central African CFA Franc', rate: 600.0 },
      // Other African currencies
      TZS: { symbol: 'TSh', code: 'TZS', name: 'Tanzanian Shilling', rate: 2300.0 },
      UGX: { symbol: 'USh', code: 'UGX', name: 'Ugandan Shilling', rate: 3500.0 },
      RWF: { symbol: 'RF', code: 'RWF', name: 'Rwandan Franc', rate: 1000.0 },
      BIF: { symbol: 'FBu', code: 'BIF', name: 'Burundian Franc', rate: 2000.0 },
      MWK: { symbol: 'MK', code: 'MWK', name: 'Malawian Kwacha', rate: 800.0 },
      ZMW: { symbol: 'ZK', code: 'ZMW', name: 'Zambian Kwacha', rate: 18.0 },
      BWP: { symbol: 'P', code: 'BWP', name: 'Botswana Pula', rate: 11.0 },
      LSL: { symbol: 'L', code: 'LSL', name: 'Lesotho Loti', rate: 14.5 },
      SZL: { symbol: 'E', code: 'SZL', name: 'Swazi Lilangeni', rate: 14.5 },
      NAD: { symbol: 'N$', code: 'NAD', name: 'Namibian Dollar', rate: 14.5 },
      MZN: { symbol: 'MT', code: 'MZN', name: 'Mozambican Metical', rate: 60.0 },
      MGA: { symbol: 'Ar', code: 'MGA', name: 'Malagasy Ariary', rate: 4000.0 },
      MUR: { symbol: '₨', code: 'MUR', name: 'Mauritian Rupee', rate: 40.0 },
      SCR: { symbol: '₨', code: 'SCR', name: 'Seychellois Rupee', rate: 13.5 },
      KMF: { symbol: 'CF', code: 'KMF', name: 'Comorian Franc', rate: 450.0 },
      SLE: { symbol: 'Le', code: 'SLE', name: 'Sierra Leonean Leone', rate: 18000.0 },
      LRD: { symbol: 'L$', code: 'LRD', name: 'Liberian Dollar', rate: 150.0 },
      GMD: { symbol: 'D', code: 'GMD', name: 'Gambian Dalasi', rate: 50.0 },
      CVE: { symbol: '$', code: 'CVE', name: 'Cape Verdean Escudo', rate: 100.0 },
      STN: { symbol: 'Db', code: 'STN', name: 'São Tomé and Príncipe Dobra', rate: 20.0 },
      AOA: { symbol: 'Kz', code: 'AOA', name: 'Angolan Kwanza', rate: 400.0 },
      CDF: { symbol: 'FC', code: 'CDF', name: 'Congolese Franc', rate: 2000.0 },
      ETB: { symbol: 'Br', code: 'ETB', name: 'Ethiopian Birr', rate: 50.0 },
      ERN: { symbol: 'Nfk', code: 'ERN', name: 'Eritrean Nakfa', rate: 15.0 },
      DJF: { symbol: 'Fdj', code: 'DJF', name: 'Djiboutian Franc', rate: 180.0 },
      SOS: { symbol: 'S', code: 'SOS', name: 'Somali Shilling', rate: 570.0 },
      SSP: { symbol: '£', code: 'SSP', name: 'South Sudanese Pound', rate: 400.0 },
      SDG: { symbol: 'ج.س.', code: 'SDG', name: 'Sudanese Pound', rate: 450.0 },
      LYD: { symbol: 'ل.د', code: 'LYD', name: 'Libyan Dinar', rate: 4.8 }
    };

    this.countryCurrencyMap = {
      'US': 'USD', 'CA': 'CAD', 'MX': 'MXN', 'BR': 'BRL',
      'GB': 'GBP', 'IE': 'EUR', 'FR': 'EUR', 'DE': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'PT': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'FI': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'CY': 'EUR', 'SI': 'EUR', 'SK': 'EUR', 'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR',
      'JP': 'JPY', 'KR': 'KRW', 'CN': 'CNY', 'SG': 'SGD', 'HK': 'HKD', 'TW': 'TWD', 'TH': 'THB', 'MY': 'MYR', 'ID': 'IDR', 'PH': 'PHP', 'VN': 'VND', 'IN': 'INR', 'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR', 'BT': 'BTN', 'MV': 'MVR',
      'AU': 'AUD', 'NZ': 'NZD', 'FJ': 'FJD', 'PG': 'PGK', 'SB': 'SBD', 'VU': 'VUV', 'WS': 'WST', 'TO': 'TOP', 'KI': 'AUD', 'TV': 'AUD', 'NR': 'AUD', 'PW': 'USD', 'MH': 'USD', 'FM': 'USD', 'CK': 'NZD', 'NU': 'NZD', 'TK': 'NZD',
      'CH': 'CHF', 'LI': 'CHF', 'NO': 'NOK', 'SE': 'SEK', 'DK': 'DKK', 'IS': 'ISK', 'FO': 'DKK', 'GL': 'DKK',
      'PL': 'PLN', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'HR': 'HRK', 'RS': 'RSD', 'BA': 'BAM', 'ME': 'EUR', 'MK': 'MKD', 'AL': 'ALL', 'XK': 'EUR',
      'RU': 'RUB', 'BY': 'BYN', 'UA': 'UAH', 'MD': 'MDL', 'GE': 'GEL', 'AM': 'AMD', 'AZ': 'AZN', 'KZ': 'KZT', 'KG': 'KGS', 'TJ': 'TJS', 'TM': 'TMT', 'UZ': 'UZS',
      'TR': 'TRY', 'IL': 'ILS', 'PS': 'ILS', 'JO': 'JOD', 'LB': 'LBP', 'SY': 'SYP', 'IQ': 'IQD', 'IR': 'IRR', 'AF': 'AFN', 'PK': 'PKR',
      'SA': 'SAR', 'AE': 'AED', 'QA': 'QAR', 'BH': 'BHD', 'KW': 'KWD', 'OM': 'OMR', 'YE': 'YER',
      // African countries with proper currency mapping
      'EG': 'EGP', 'LY': 'LYD', 'TN': 'TND', 'DZ': 'DZD', 'MA': 'MAD', 'SD': 'SDG', 'SS': 'SSP', 'ET': 'ETB', 'ER': 'ERN', 'DJ': 'DJF', 'SO': 'SOS',
      'ZA': 'ZAR', 'BW': 'BWP', 'LS': 'LSL', 'SZ': 'SZL', 'NA': 'NAD', 'ZW': 'ZWL', 'ZM': 'ZMW', 'MW': 'MWK', 'MZ': 'MZN', 'MG': 'MGA', 'MU': 'MUR', 'SC': 'SCR', 'KM': 'KMF', 'YT': 'EUR', 'RE': 'EUR', 'BI': 'BIF', 'RW': 'RWF', 'UG': 'UGX', 'TZ': 'TZS', 'KE': 'KES',
      'NG': 'NGN', 'GH': 'GHS', 'TG': 'XOF', 'BJ': 'XOF', 'BF': 'XOF', 'ML': 'XOF', 'NE': 'XOF', 'SN': 'XOF', 'CI': 'XOF', 'GN': 'GNF', 'GW': 'XOF', 'GM': 'GMD', 'SL': 'SLE', 'LR': 'LRD', 'CV': 'CVE', 'ST': 'STN', 'GQ': 'XAF', 'CM': 'XAF', 'CF': 'XAF', 'TD': 'XAF', 'GA': 'XAF', 'CG': 'XAF', 'CD': 'CDF', 'AO': 'AOA'
    };

    this.initializeCurrency();
    
    // Refresh exchange rates every hour
    setInterval(() => {
      this.loadExchangeRates();
    }, 60 * 60 * 1000); // 1 hour
  }

  // Initialize currency detection and exchange rates
  async initializeCurrency() {
    this.currentCurrency = await this.detectCurrency();
    await this.loadExchangeRates();
  }

  // Detect currency based on device location
  async detectCurrency() {
    try {
      // Google security compliant: No localStorage usage
      // Default to EUR for security compliance

      // Try to detect from browser locale
      const locale = navigator.language || navigator.languages[0];
      const countryCode = locale.split('-')[1]?.toUpperCase();
      
      if (countryCode && this.countryCurrencyMap[countryCode]) {
        return this.countryCurrencyMap[countryCode];
      }

      // Try to detect from timezone (sans géolocalisation)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Détection basique depuis timezone (sans geolocationService)
      const timezoneToCountry = {
        'America/New_York': 'US',
        'America/Chicago': 'US',
        'America/Denver': 'US',
        'America/Los_Angeles': 'US',
        'Europe/London': 'GB',
        'Europe/Paris': 'FR',
        'Europe/Berlin': 'DE',
        'Europe/Rome': 'IT',
        'Europe/Madrid': 'ES',
        'Asia/Tokyo': 'JP',
        'Asia/Shanghai': 'CN',
        'Asia/Hong_Kong': 'HK',
        'Asia/Singapore': 'SG',
        'Australia/Sydney': 'AU',
        'America/Toronto': 'CA',
        'America/Mexico_City': 'MX',
        'America/Sao_Paulo': 'BR'
      };
      
      const timezoneCountry = timezoneToCountry[timezone];
      
      if (timezoneCountry && this.countryCurrencyMap[timezoneCountry]) {
        return this.countryCurrencyMap[timezoneCountry];
      }

      // Pas de détection IP (service désactivé)
      // Fallback vers détection locale

      // Try to detect from Intl.NumberFormat
      try {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'USD'
        });
        const parts = formatter.formatToParts(1);
        const currencyCode = parts.find(part => part.type === 'currency')?.value;
        
        if (currencyCode && this.currencies[currencyCode]) {
          return currencyCode;
        }
      } catch (e) {
        // Fallback to USD
      }

      // Default fallback
      return 'USD';
    } catch (error) {
      console.warn('Error detecting currency:', error);
      return 'USD';
    }
  }

  // Load exchange rates from API
  async loadExchangeRates() {
    try {
      // Try multiple APIs for better reliability
      const apis = [
        'https://api.exchangerate-api.com/v4/latest/USD',
        'https://api.fixer.io/latest?access_key=YOUR_API_KEY&base=USD',
        'https://api.currencylayer.com/live?access_key=YOUR_API_KEY&currencies=XOF,XAF,NGN,GHS,EGP,ZAR,KES,TZS,UGX,RWF,BIF,MWK,ZMW,BWP,LSL,SZL,NAD,MZN,MGA,MUR,SCR,KMF,SLE,LRD,GMD,CVE,STN,AOA,CDF,ETB,ERN,DJF,SOS,SSP,SDG,LYD&format=1'
      ];

      for (const api of apis) {
        try {
          const response = await fetch(api);
          if (response.ok) {
            const data = await response.json();
            
            // Update rates based on API response
            if (data.rates) {
              Object.keys(data.rates).forEach(currency => {
                if (this.currencies[currency]) {
                  this.currencies[currency].rate = data.rates[currency];
                }
              });
              
              // Google security compliant: No localStorage caching
              
              console.log('Exchange rates updated from API');
              return;
            }
          }
        } catch (apiError) {
          console.warn(`API ${api} failed:`, apiError);
          continue;
        }
      }

      // Fallback to cached rates if all APIs fail
      const cachedRates = localStorage.getItem('exchange_rates');
      if (cachedRates) {
        const { rates, timestamp } = JSON.parse(cachedRates);
        const hoursSinceUpdate = (Date.now() - timestamp) / (1000 * 60 * 60);
        
        if (hoursSinceUpdate < 24) { // Use cached rates if less than 24 hours old
          Object.keys(rates).forEach(currency => {
            if (this.currencies[currency]) {
              this.currencies[currency].rate = rates[currency];
            }
          });
          console.log('Using cached exchange rates');
        }
      }
      
    } catch (error) {
      console.warn('Error loading exchange rates:', error);
    }
  }

  // Set preferred currency
  setCurrency(currencyCode) {
    if (this.currencies[currencyCode]) {
      this.currentCurrency = currencyCode;
      // Google security compliant: No localStorage usage
      return true;
    }
    return false;
  }

  // Get current currency
  getCurrentCurrency() {
    return this.currentCurrency;
  }

  // Get all available currencies
  getAvailableCurrencies() {
    return Object.keys(this.currencies).map(code => ({
      code,
      ...this.currencies[code]
    }));
  }

  // Format price in current currency
  formatPrice(price, currencyCode = null) {
    const currency = currencyCode || this.currentCurrency;
    const currencyInfo = this.currencies[currency];
    
    if (!currencyInfo) {
      return `$${price.toFixed(2)}`;
    }

    // Convert from USD to target currency
    const convertedPrice = price * currencyInfo.rate;
    
    // Format based on currency
    if (currency === 'JPY' || currency === 'KRW' || currency === 'VND' || currency === 'IDR' || 
        currency === 'XOF' || currency === 'XAF' || currency === 'TZS' || currency === 'UGX' || 
        currency === 'RWF' || currency === 'BIF' || currency === 'MWK' || currency === 'MGA' || 
        currency === 'SLE' || currency === 'CDF' || currency === 'SSP' || currency === 'SDG') {
      // No decimal places for these currencies
      return `${currencyInfo.symbol} ${Math.round(convertedPrice).toLocaleString()}`;
    } else if (currency === 'INR' || currency === 'PKR' || currency === 'BDT' || currency === 'LKR' || 
               currency === 'NPR' || currency === 'NGN' || currency === 'GHS' || currency === 'ZMW' || 
               currency === 'BWP' || currency === 'LSL' || currency === 'SZL' || currency === 'NAD' || 
               currency === 'MZN' || currency === 'MUR' || currency === 'SCR' || currency === 'KMF' || 
               currency === 'LRD' || currency === 'GMD' || currency === 'CVE' || currency === 'STN' || 
               currency === 'AOA' || currency === 'ETB' || currency === 'ERN' || currency === 'DJF' || 
               currency === 'SOS' || currency === 'LYD') {
      // 2 decimal places for these currencies
      return `${currencyInfo.symbol} ${convertedPrice.toFixed(2)}`;
    } else {
      // Standard 2 decimal places
      return `${currencyInfo.symbol}${convertedPrice.toFixed(2)}`;
    }
  }

  // Convert price between currencies
  convertPrice(price, fromCurrency, toCurrency) {
    const fromRate = this.currencies[fromCurrency]?.rate || 1;
    const toRate = this.currencies[toCurrency]?.rate || 1;
    
    // Convert to USD first, then to target currency
    const usdPrice = price / fromRate;
    return usdPrice * toRate;
  }

  // Get currency symbol
  getCurrencySymbol(currencyCode = null) {
    const currency = currencyCode || this.currentCurrency;
    return this.currencies[currency]?.symbol || '$';
  }

  // Get currency name
  getCurrencyName(currencyCode = null) {
    const currency = currencyCode || this.currentCurrency;
    return this.currencies[currency]?.name || 'US Dollar';
  }
}

// Create singleton instance
const currencyService = new CurrencyService();

export default currencyService;
