// Sample data for the application - Products will be added from scratch

export const getSampleProducts = () => {
  const products = [
    // Product 1 - DreamQuest Support Windows Computers
    {
      _id: 'product-1',
      productNumber: 1,
      name: 'DreamQuest Support Windows Computers Bluetooth5-3',
      slug: 'dreamquest-support-windows-computers-bluetooth5-3',
      description: 'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71Z401LjFFL._AC_SX679_.jpg', alt: 'DreamQuest Computer Support', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/714MXVDkijL._AC_SX679_.jpg', alt: 'DreamQuest Computer Support Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 0 },
      isFeatured: true,
      isTrending: false,
      brand: 'DreamQuest',
      inStock: true,
      tags: ['electronics', 'computer', 'support', 'bluetooth'],
      affiliateUrl: 'https://amzn.to/478mN4d'
    },

    // Product 2 - Huidun Laptops Computer Business
    {
      _id: 'product-2',
      productNumber: 2,
      name: 'Huidun Laptops Computer Business Quad-Core',
      slug: 'huidun-laptops-computer-business-quad-core',
      description: 'Business laptop with quad-core processor for professional computing needs.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71lIO9V46sL._AC_SL1500_.jpg', alt: 'Huidun Laptop', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71TlVU8NwVL._AC_SL1500_.jpg', alt: 'Huidun Laptop Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71IKXFXwibL._AC_SL1500_.jpg', alt: 'Huidun Laptop Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71tzRV8BBkL._AC_SL1500_.jpg', alt: 'Huidun Laptop Screen', isPrimary: false }
      ],
      rating: { average: 4.7, count: 0 },
      isFeatured: false,
      isTrending: true,
      brand: 'Huidun',
      inStock: true,
      tags: ['electronics', 'laptop', 'business', 'quad-core'],
      affiliateUrl: 'https://www.amazon.com/Huidun-Laptops-Computer-Business-Quad-Core/dp/B0FBRP3VG8?crid=3AVKTSZ7HOQRK&dib=eyJ2IjoiMSJ9.HbzpBJ1F9FbiB-b7h_UTNVFelnWTuV0A-sIGYuScf2Ew7IKbHV_W_JOkx19n886qH8UxNOWPMRel-mChaetRjYt4NFkX3xDT-J4mOqLYMVMBweDxCvq84V1HJkwWG99OyU8IvxQhzn6z0aN515WCKuZOmiHAnWQBe2ZzSFCa3ASFZWQ9kVpe1To-xy09mIOxzNvK9GvXSM5bfx_-FXnHnQIophsq-u_yvRtIdehzLyo.vOe6OglW_9MsyMquBRev9P15iS4usBIFQ_36X10rd7Q&dib_tag=se&keywords=computer&qid=1760758080&sprefix=computer%2Caps%2C342&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=fc7ee0b405f96fe2d78b5292a3c44553&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 3 - Cordless Robotic Pool Cleaner
    {
      _id: 'product-3',
      productNumber: 3,
      name: 'Cordless Robotic Pool Cleaner – 150 Mins Runtime, IPX8 Waterproof, 2200 Sq Ft Coverage, Powerful Automatic Pool Vacuum Robot for In-Ground & Above-Ground Pools, Quick Charging, Dual Brushes',
      slug: 'cordless-robotic-pool-cleaner-150-mins-runtime-ipx8-waterproof-2200-sq-ft-coverage-powerful-automatic-pool-vacuum-robot-for-in-ground-above-ground-pools-quick-charging-dual-brushes',
      description: 'Advanced cordless robotic pool cleaner with 150 minutes runtime and IPX8 waterproof rating for complete pool maintenance.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://tse3.mm.bing.net/th/id/OIP.H16jujC9CgCXjJaxDQMQDwHaE8?w=612&h=408&rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Robotic Pool Cleaner', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71NihcTbfVL._AC_SL1500_.jpg', alt: 'Pool Cleaner Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71FpAA3YvBL._AC_SL1500_.jpg', alt: 'Pool Cleaner Brushes', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/7137SMAraHL._AC_SL1500_.jpg', alt: 'Pool Cleaner Charging', isPrimary: false }
      ],
      rating: { average: 4.8, count: 345 },
      isFeatured: true,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'robotic'],
      affiliateUrl: 'https://www.amazon.com/Cordless-Robotic-Pool-Cleaner-Ground/dp/B0FK4FKWPZ?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot+piscina&qid=1760796004&sprefix=robot+piscina%2Caps%2C330&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll1&tag=adsmarket08-20&linkId=fe12ab24bf40176fc47a8f3fe0a6427c&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 4 - WYBOT C2 Vision Cordless Pool Cleaner
    {
      _id: 'product-4',
      productNumber: 4,
      name: 'WYBOT C2 Vision Cordless Pool Cleaner with Camera, 8-in-1 Pool Vacuum for Inground Pools, Powerful Suction, Ultra-Fine Filter System Pool Robot, Wall Climbing Navigation, Gray',
      slug: 'wybot-c2-vision-cordless-pool-cleaner-with-camera-8-in-1-pool-vacuum-for-inground-pools-powerful-suction-ultra-fine-filter-system-pool-robot-wall-climbing-navigation-gray',
      description: 'Advanced pool cleaner with camera technology, 8-in-1 functionality, and wall climbing navigation for complete pool cleaning.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61Lce9JQjnL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71d83jk0UWL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71h7XR4IbqL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yNT0gNnZL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Filter', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/811eyTO0rcL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Navigation', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71td5Ciu9FL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Accessories', isPrimary: false }
      ],
      rating: { average: 4.9, count: 128 },
      isFeatured: true,
      isTrending: false,
      brand: 'WYBOT',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'camera'],
      affiliateUrl: 'https://www.amazon.com/WYBOT-Cordless-Inground-Ultra-Fine-Navigation/dp/B0FM7RHT4H?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot%2Bpiscina&qid=1760796004&sprefix=robot%2Bpiscina%2Caps%2C330&sr=8-6&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=d7308d4087f7d7cba5146f951768b756&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 5 - Apple iPhone 12, 64GB, Black
    {
      _id: 'product-5',
      productNumber: 5,
      name: 'Apple iPhone 12, 64GB, Black - Fully Unlocked',
      slug: 'apple-iphone-12-64gb-black-fully-unlocked',
      description: 'Apple iPhone 12 with 64GB storage in black color, fully unlocked for use with any carrier.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_SL1359_.jpg', alt: 'iPhone 12 Black', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51dRIfZdPsL._AC_SL1001_.jpg', alt: 'iPhone 12 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51qFTmwnJUL._AC_SL1002_.jpg', alt: 'iPhone 12 Back', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51XEzNvKpKL._AC_SL1068_.jpg', alt: 'iPhone 12 Screen', isPrimary: false }
      ],
      rating: { average: 5.0, count: 31800 },
      isFeatured: true,
      isTrending: true,
      brand: 'Apple',
      inStock: true,
      tags: ['electronics', 'smartphone', 'iphone', 'unlocked'],
      affiliateUrl: 'https://www.amazon.com/Apple-iPhone-12-64GB-Black/dp/B08PP5MSVB?crid=1IWC5GSA8VOEG&dib=eyJ2IjoiMSJ9.RnkVIx7GCqb1ko2F_wdjUBxH9E-oR1t7v7vC9PpqEnfHirIKGhtGiw-EeExgjKsKSc0OPsrTI1FBB1BsFAa5w0pPFuTXXgv6rrR4P9uEHke5xQduEx2R5QzZ-RhdrC008LsQBd5yVeJSdux6k_279527DDBm3nUVUhK3rBtFHQuWPa5-7L8dtaYkS5XcsgmHujpWTHdBXb0j7siTVMX7bmcpwn2Ge21irqqc4ou7Euo.IC8-jjxdI5Tpq6WvIWjvQngZpKp4smeQtP90QC-v7Ag&dib_tag=se&keywords=IPHONE&qid=1760796431&sprefix=iphone%2Caps%2C336&sr=8-1&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=bf1f7368c15c7a7b9d380954c6b52515&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 6 - Apple iPhone 12 Mini, 64GB, Black
    {
      _id: 'product-6',
      productNumber: 6,
      name: 'Apple iPhone 12 Mini, 64GB, Black - Unlocked',
      slug: 'apple-iphone-12-mini-64gb-black-unlocked',
      description: 'Compact Apple iPhone 12 Mini with 64GB storage in black color, unlocked for any carrier.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61bbqGftbUL._AC_SL1500_.jpg', alt: 'iPhone 12 Mini Black', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41OxsG3aZlL._AC_SL1000_.jpg', alt: 'iPhone 12 Mini Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41Ow57qlQKL._AC_SL1000_.jpg', alt: 'iPhone 12 Mini Back', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51MFIC2GLqL._AC_SL1500_.jpg', alt: 'iPhone 12 Mini Screen', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61ExCBl5C6L._AC_SL1500_.jpg', alt: 'iPhone 12 Mini Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61Ns1KK4P7L._AC_SL1392_.jpg', alt: 'iPhone 12 Mini Package', isPrimary: false }
      ],
      rating: { average: 4.6, count: 15900 },
      isFeatured: false,
      isTrending: false,
      brand: 'Apple',
      inStock: true,
      tags: ['electronics', 'smartphone', 'iphone', 'mini'],
      affiliateUrl: 'https://www.amazon.com/Apple-iPhone-12-Mini-Black/dp/B08PPDJWC8?pd_rd_w=xKxZi&content-id=amzn1.sym.da0b205c-8cc7-4a8d-9d0a-8ed3705890a2&pf_rd_p=da0b205c-8cc7-4a8d-9d0a-8ed3705890a2&pf_rd_r=9JR0T4RGQE702XZAY5X6&pd_rd_wg=AvpQF&pd_rd_r=142a0d4f-9c1f-42de-ae89-fe963f893e99&pd_rd_i=B08PPDJWC8&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=80ff4fbb578c54156d931a9eee75ef17&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 7 - Ringke Rugged Gear iPhone 16 Pro Max Case
    {
      _id: 'product-7',
      productNumber: 7,
      name: 'Ringke Rugged Gear [Oil & Dirt Resistant] Compatible with iPhone 16 Pro Max Case, Prevents Oily Smudges Non-Slip Enhanced Grip Protective Cover Precise Cutouts for Camera - Black',
      slug: 'ringke-rugged-gear-oil-dirt-resistant-compatible-with-iphone-16-pro-max-case-prevents-oily-smudges-non-slip-enhanced-grip-protective-cover-precise-cutouts-for-camera-black',
      description: 'Rugged protective case for iPhone 16 Pro Max with oil and dirt resistance, enhanced grip, and precise camera cutouts.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71AiSRCKewL._AC_SL1500_.jpg', alt: 'Ringke iPhone Case', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51HJJFg6lQL._AC_SL1500_.jpg', alt: 'Ringke Case Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71kmE+HbWtL._AC_SL1500_.jpg', alt: 'Ringke Case Grip', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71asx1CS-JL._AC_SL1500_.jpg', alt: 'Ringke Case Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61atIczM4TL._AC_SL1500_.jpg', alt: 'Ringke Case Protection', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71NF0AAXspL._AC_SL1500_.jpg', alt: 'Ringke Case Design', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71+3QMiaLTL._AC_SL1500_.jpg', alt: 'Ringke Case Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 536 },
      isFeatured: false,
      isTrending: true,
      brand: 'Ringke',
      inStock: true,
      tags: ['electronics', 'case', 'iphone', 'protective'],
      affiliateUrl: 'https://www.amazon.com/Ringke-Rugged-Gear-Compatible-Anti-Fingerprint/dp/B0DF8C7SDC?pd_rd_w=aXu8u&content-id=amzn1.sym.4dbb330d-2b35-4d2b-bece-9ee638954bdb&pf_rd_p=4dbb330d-2b35-4d2b-bece-9ee638954bdb&pf_rd_r=8JM1A874E838CBQ0PMHF&pd_rd_wg=UnWO6&pd_rd_r=d4296a09-7c25-483c-b599-dd614ade81bf&pd_rd_i=B0DF8C7SDC&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=215d8509b204de373835401f44ea292f&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 8 - Kasa Indoor Pan/Tilt Smart Security Camera
    {
      _id: 'product-8',
      productNumber: 8,
      name: 'Kasa Indoor Pan/Tilt Smart Security Camera, 1080p HD Dog-Camera,2.4GHz with Night Vision,Motion Detection for Baby and Pet Monitor, Cloud & SD Card Storage, Works with Alexa& Google Home (EC70), White',
      slug: 'kasa-indoor-pantilt-smart-security-camera-1080p-hd-dog-camera24ghz-with-night-visionmotion-detection-for-baby-and-pet-monitor-cloud-sd-card-storage-works-with-alexa-google-home-ec70-white',
      description: 'Smart security camera with pan/tilt functionality, 1080p HD recording, night vision, and motion detection for home monitoring.',
      price: 21.99,
      originalPrice: 37,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51oao7xTT8L._AC_SL1500_.jpg', alt: 'Kasa Security Camera', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51qbqxOEsUL._AC_.jpg', alt: 'Kasa Camera Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61i0N52ngHL._AC_SL1000_.jpg', alt: 'Kasa Camera Night Vision', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61qkjrc9JcL._AC_SL1000_.jpg', alt: 'Kasa Camera Motion Detection', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61n4Q4fZKDL._AC_SL1000_.jpg', alt: 'Kasa Camera Storage', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81wEarZ1eqL._AC_SL1500_.jpg', alt: 'Kasa Camera App', isPrimary: false }
      ],
      rating: { average: 4.8, count: 39304 },
      isFeatured: true,
      isTrending: true,
      brand: 'Kasa',
      inStock: true,
      tags: ['electronics', 'security', 'camera', 'smart'],
      affiliateUrl: 'https://amzn.to/47ckcpZ'
    },

    // Product 9 - Furhaven Waterproof Throw Blanket for Dogs
    {
      _id: 'product-9',
      productNumber: 9,
      name: 'Furhaven Waterproof Throw Blanket for Dogs & Indoor Cats, Washable - Shaggy Plush Calming Long Faux Fur & Velvet Dog Blanket - Mist Gray, Extra Large/XL',
      slug: 'furhaven-waterproof-throw-blanket-for-dogs-indoor-cats-washable-shaggy-plush-calming-long-faux-fur-velvet-dog-blanket-mist-gray-extra-largexl',
      description: 'Waterproof throw blanket for dogs and cats with shaggy plush design, washable and calming for pets.',
      price: 23.99,
      originalPrice: 27.34,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81WXPaG721L._AC_SL1500_.jpg', alt: 'Furhaven Pet Blanket', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81gR2RBR-BL._AC_SL1500_.jpg', alt: 'Pet Blanket Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81uH0CKXGSL._AC_SL1500_.jpg', alt: 'Pet Blanket Texture', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/714iX7AIalL._AC_SL1500_.jpg', alt: 'Pet Blanket Size', isPrimary: false }
      ],
      rating: { average: 4.9, count: 5800 },
      isFeatured: true,
      isTrending: false,
      brand: 'Furhaven',
      inStock: true,
      tags: ['pet', 'blanket', 'waterproof', 'washable'],
      affiliateUrl: 'https://amzn.to/3WLARvI'
    },

    // Product 10 - EHEYCIGA Orthopedic Dog Beds
    {
      _id: 'product-10',
      productNumber: 10,
      name: 'EHEYCIGA Orthopedic Dog Beds Large Sized Dog, Waterproof Memory Foam Pet Bed with Sides, Non-Slip Bottom Large Pet Bed with Washable Removable Cover, Grey',
      slug: 'eheyciga-orthopedic-dog-beds-large-sized-dog-waterproof-memory-foam-pet-bed-with-sides-non-slip-bottom-large-pet-bed-with-washable-removable-cover-grey',
      description: 'Orthopedic dog bed with memory foam, waterproof design, and removable washable cover for large dogs.',
      price: 45.99,
      originalPrice: 60,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71UVgdOvzoL._AC_SL1500_.jpg', alt: 'Orthopedic Dog Bed', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71qW1ApdXaL._AC_SL1500_.jpg', alt: 'Dog Bed Memory Foam', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81EGqzzBKiL._AC_SL1500_.jpg', alt: 'Dog Bed Sides', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/810JnBr5+GL._AC_SL1500_.jpg', alt: 'Dog Bed Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81I7jtNp2PL._AC_SL1500_.jpg', alt: 'Dog Bed Non-Slip', isPrimary: false }
      ],
      rating: { average: 5.0, count: 15600 },
      isFeatured: true,
      isTrending: true,
      brand: 'EHEYCIGA',
      inStock: true,
      tags: ['pet', 'dog-bed', 'orthopedic', 'memory-foam'],
      affiliateUrl: 'https://amzn.to/4hih28V'
    },

    // Product 11 - IRIS USA Dog Food Storage Container
    {
      _id: 'product-11',
      productNumber: 11,
      name: 'IRIS USA Dog Food Storage Container, 30 lbs & 11 lbs Combo, Cat Food Storage Container, Dog Treat Container, Airtight, Stackable, 2-Cup Scoop, Wheels, Easy Mobility, Black',
      slug: 'iris-usa-dog-food-storage-container-30-lbs-11-lbs-combo-cat-food-storage-container-dog-treat-container-airtight-stackable-2-cup-scoop-wheels-easy-mobility-black',
      description: 'Airtight dog food storage container combo with wheels, stackable design, and included measuring scoop.',
      price: 54.98,
      originalPrice: 59.5,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71an4giRZrL._AC_SL1500_.jpg', alt: 'Dog Food Storage Container', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71rLeABFx+L._AC_SL1500_.jpg', alt: 'Storage Container Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715OW7O-8FL._AC_SL1500_.jpg', alt: 'Storage Container Wheels', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/913Jkrx6-HL._AC_SL1500_.jpg', alt: 'Storage Container Scoop', isPrimary: false }
      ],
      rating: { average: 4.6, count: 51300 },
      isFeatured: false,
      isTrending: false,
      brand: 'IRIS USA',
      inStock: true,
      tags: ['pet', 'food-storage', 'airtight', 'stackable'],
      affiliateUrl: 'https://amzn.to/4opAqD7'
    },

    // Product 12 - Veken Innovation Award Winner Pet Fountain
    {
      _id: 'product-12',
      productNumber: 12,
      name: 'Veken Innovation Award Winner 95oz/2.8L Pet Fountain, Automatic Cat Water Fountain Dog Water Dispenser with Replacement Filters, Gifts for Christmas, Cats, Dogs, Multiple Pets (Grey, Plastic)',
      slug: 'veken-innovation-award-winner-95oz28l-pet-fountain-automatic-cat-water-fountain-dog-water-dispenser-with-replacement-filters-gifts-for-christmas-cats-dogs-multiple-pets-grey-plastic',
      description: 'Innovation award winning pet fountain with automatic water dispensing, replacement filters, and large capacity for multiple pets.',
      price: 19.99,
      originalPrice: 24.3,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71e-NwQieJL._AC_SL1500_.jpg', alt: 'Pet Water Fountain', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/618FEeqQQ9L._AC_SL1500_.jpg', alt: 'Fountain Filter', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71EDcxQWNYL._AC_SL1500_.jpg', alt: 'Fountain Design', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71UZIJ5FMRL._AC_SL1500_.jpg', alt: 'Fountain Capacity', isPrimary: false }
      ],
      rating: { average: 4.7, count: 45200 },
      isFeatured: false,
      isTrending: true,
      brand: 'Veken',
      inStock: true,
      tags: ['pet', 'fountain', 'water', 'automatic'],
      affiliateUrl: 'https://amzn.to/4nVr81M'
    },

    // Product 13 - Always Full Pet Water Bowl and Bottle Pump Bundle
    {
      _id: 'product-13',
      productNumber: 13,
      name: 'Always Full® 9" Pet Water Bowl and Bottle Pump Bundle, Self-Refilling, Clean Filtered Water, App-Enabled Hydration Monitoring, Easy Upgrade to Wall Unit, Cat and Dog Water Bowls',
      slug: 'always-full-9-pet-water-bowl-and-bottle-pump-bundle-self-refilling-clean-filtered-water-app-enabled-hydration-monitoring-easy-upgrade-to-wall-unit-cat-and-dog-water-bowls',
      description: 'Smart pet water bowl with self-refilling system, filtered water, app monitoring, and easy wall unit upgrade option.',
      price: 179.99,
      originalPrice: 198,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/817nY-9JfrL._AC_SL1500_.jpg', alt: 'Smart Pet Water Bowl', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71zyL2lXXrL._AC_SL1500_.jpg', alt: 'Water Bowl Pump', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81gWlDGuqRL._AC_SL1500_.jpg', alt: 'Water Bowl Filter', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81CnLp3Zj4L._AC_SL1500_.jpg', alt: 'Water Bowl App', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81Swf7dSnJL._AC_SL1500_.jpg', alt: 'Water Bowl Wall Unit', isPrimary: false }
      ],
      rating: { average: 4.8, count: 18 },
      isFeatured: true,
      isTrending: false,
      brand: 'Always Full',
      inStock: true,
      tags: ['pet', 'water-bowl', 'smart', 'filtered'],
      affiliateUrl: 'https://amzn.to/47fJovI'
    },

    // Product 14 - KENNELS & KATS Pet Grooming Gloves
    {
      _id: 'product-14',
      productNumber: 14,
      name: 'KENNELS & KATS Pet Grooming Gloves | Deshedding Glove for Easy, Mess-Free Grooming | Grooming Mitt for Dogs, Cats, Rabbits & Horses with Long/Short/Curly Hair | Pet Hair Gloves for Pet Hair Removal',
      slug: 'kennels-kats-pet-grooming-gloves-deshedding-glove-for-easy-mess-free-grooming-grooming-mitt-for-dogs-cats-rabbits-horses-with-longshortcurly-hair-pet-hair-gloves-for-pet-hair-removal',
      description: 'Professional pet grooming gloves for easy, mess-free grooming of dogs, cats, rabbits and horses.',
      price: 9.97,
      originalPrice: 9.97,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81O7NatEdvL._AC_SL1500_.jpg', alt: 'Pet Grooming Gloves', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81gjYpRT4fL._AC_SL1500_.jpg', alt: 'Pet Grooming Gloves Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81E9T7gAUbL._AC_SL1500_.jpg', alt: 'Pet Grooming Gloves Use', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/916LI2I2lNL._AC_SL1500_.jpg', alt: 'Pet Grooming Gloves Package', isPrimary: false }
      ],
      rating: { average: 4.6, count: 15643 },
      price: 9.97,
      isFeatured: true,
      isTrending: false,
      brand: 'KENNELS & KATS',
      inStock: true,
      tags: ['pet', 'grooming', 'gloves', 'deshedding'],
      affiliateUrl: 'https://amzn.to/4o59pp0'
    },

    // Product 15 - Febreze Odor-Fighting Fabric Refresher
    {
      _id: 'product-15',
      productNumber: 15,
      name: 'Febreze Odor-Fighting Fabric Refresher Pet Odor Fighter, 16.9oz, Pack of 2',
      slug: 'febreze-odor-fighting-fabric-refresher-pet-odor-fighter-169oz-pack-of-2',
      description: 'Powerful fabric refresher that eliminates pet odors and leaves fabrics smelling fresh.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41wL-4ptktL._AC_US40_.jpg', alt: 'Febreze Pet Odor Fighter', isPrimary: true }
      ],
      rating: { average: 4.7, count: 5340 },
      isFeatured: false,
      isTrending: false,
      brand: 'Febreze',
      inStock: true,
      tags: ['pet', 'odor', 'fabric', 'refresher'],
      affiliateUrl: 'https://amzn.to/3WK7cD4'
    },

    // Product 16 - KEYHELP Pet Hair Removal Glove
    {
      _id: 'product-16',
      productNumber: 16,
      name: 'KEYHELP Pet Hair Removal Glove for Dogs & Cats, Newly Upgraded Reusable Electrostatic Pet Hair Gloves, Pet Hair Remover Tool for Clothing, Couch, Carpet...',
      slug: 'keyhelp-pet-hair-removal-glove-for-dogs-cats-newly-upgraded-reusable-electrostatic-pet-hair-gloves-pet-hair-remover-tool-for-clothing-couch-carpet',
      description: 'Reusable electrostatic pet hair removal glove for easy cleaning of pet hair from furniture and clothing.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/91dsB1nDR+L._AC_SX679_.jpg', alt: 'Pet Hair Removal Glove', isPrimary: true }
      ],
      rating: { average: 4.8, count: 1404 },
      isFeatured: false,
      isTrending: true,
      brand: 'KEYHELP',
      inStock: true,
      tags: ['pet', 'hair-removal', 'glove', 'electrostatic'],
      affiliateUrl: 'https://amzn.to/4qkhjMv'
    },

    // Product 17 - IRIS USA Stackable Dog Food Storage Container
    {
      _id: 'product-17',
      productNumber: 17,
      name: 'IRIS USA Stackable Dog Food Storage Container with 2 Cup Scoop, 4 Secure Latches, Fits up to 30 lbs, Pet Dry Food Bin, Gasket Seal Lid, BPA Free, Stackable, Easy Measure, Gray/Dark Gray',
      slug: 'iris-usa-stackable-dog-food-storage-container-with-2-cup-scoop-4-secure-latches-fits-up-to-30-lbs-pet-dry-food-bin-gasket-seal-lid-bpa-free-stackable-easy-measure-graydark-gray',
      description: 'Airtight dog food storage container with secure latches and measuring scoop for easy feeding.',
      price: 195,
      originalPrice: 195,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/719aAXAydvL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Dog Food Storage Container', isPrimary: true }
      ],
      rating: { average: 4.9, count: 0 },
      isFeatured: true,
      isTrending: false,
      brand: 'IRIS USA',
      inStock: true,
      tags: ['pet', 'food-storage', 'container', 'airtight'],
      affiliateUrl: 'https://amzn.to/4qgpgCs'
    },

    // Product 18 - PetSafe ScoopFree Disposable Crystal Cat Litter Tray
    {
      _id: 'product-18',
      productNumber: 18,
      name: 'PetSafe ScoopFree Disposable Crystal Cat Litter Tray - Easy Cleaning Box - Refill Tray for Electric Litter Box - Fresh Scent - 4.3 lb Bags - 3 Pack',
      slug: 'petsafe-scoopfree-disposable-crystal-cat-litter-tray-easy-cleaning-box-refill-tray-for-electric-litter-box-fresh-scent-43-lb-bags-3-pack',
      description: 'Disposable crystal cat litter trays for easy cleaning with fresh scent technology.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61UWKUe+9ML._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Cat Litter Tray', isPrimary: true }
      ],
      rating: { average: 5.0, count: 45678 },
      isFeatured: true,
      isTrending: true,
      brand: 'PetSafe',
      inStock: true,
      tags: ['pet', 'cat', 'litter', 'disposable'],
      affiliateUrl: 'https://amzn.to/47215A8'
    },

    // Product 19 - Best Pet Supplies Interactive Squeaky Dog Chew Toy
    {
      _id: 'product-19',
      productNumber: 19,
      name: 'Best Pet Supplies Interactive Squeaky Dog Chew Toy, Ideal Dog Toys for Chewers, Small, Medium & Large Dogs, and Fetch Lovers - Crinkle Duck (Yellow), Large',
      slug: 'best-pet-supplies-interactive-squeaky-dog-chew-toy-ideal-dog-toys-for-chewers-small-medium-large-dogs-and-fetch-lovers-crinkle-duck-yellow-large',
      description: 'Interactive squeaky dog toy with crinkle sounds, perfect for dogs who love to chew and play fetch.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61c1VfRJIvL._AC_SX522_.jpg', alt: 'Dog Chew Toy', isPrimary: true }
      ],
      rating: { average: 4.6, count: 42300 },
      isFeatured: false,
      isTrending: false,
      brand: 'Best Pet Supplies',
      inStock: true,
      tags: ['pet', 'dog', 'toy', 'squeaky'],
      affiliateUrl: 'https://amzn.to/4qqo4N5'
    },

    // Product 20 - URPOWER Dog Car Seat Cover
    {
      _id: 'product-20',
      productNumber: 20,
      name: 'URPOWER Dog Car Seat Cover for Pets 100% Waterproof Seat Cover Hammock 600D Heavy Duty Scratch Proof Nonslip Durable Soft Back Seat Covers for Cars Trucks and SUVs',
      slug: 'urpower-dog-car-seat-cover-for-pets-100-waterproof-seat-cover-hammock-600d-heavy-duty-scratch-proof-nonslip-durable-soft-back-seat-covers-for-cars-trucks-and-suvs',
      description: 'Waterproof car seat cover for dogs with scratch-proof material and non-slip design.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71aO4wyv8SL._AC_SX679_.jpg', alt: 'Dog Car Seat Cover', isPrimary: true }
      ],
      rating: { average: 4.7, count: 72300 },
      isFeatured: true,
      isTrending: true,
      brand: 'URPOWER',
      inStock: true,
      tags: ['pet', 'car', 'seat-cover', 'waterproof'],
      affiliateUrl: 'https://amzn.to/4osVRmX'
    },

    // Product 21 - PetLab Co. Probiotics for Dogs
    {
      _id: 'product-21',
      productNumber: 21,
      name: 'PetLab Co. Probiotics for Dogs, Support Gut Health, Occasional Diarrhea, Digestive Health & Seasonal Allergies - Salmon Flavor - Packaging May Vary - 30 Soft Chews',
      slug: 'petlab-co-probiotics-for-dogs-support-gut-health-occasional-diarrhea-digestive-health-seasonal-allergies-salmon-flavor-packaging-may-vary-30-soft-chews',
      description: 'Probiotic supplements for dogs to support digestive health and gut function with salmon flavor.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71IZtCbdIgL._AC_SL1500_.jpg', alt: 'Dog Probiotics', isPrimary: true }
      ],
      rating: { average: 4.8, count: 51200 },
      isFeatured: true,
      isTrending: false,
      brand: 'PetLab Co.',
      inStock: true,
      tags: ['pet', 'dog', 'probiotics', 'health'],
      affiliateUrl: 'https://amzn.to/4hiPn7L'
    },

    // Product 22 - Pet Honesty Probiotics for Dogs
    {
      _id: 'product-22',
      productNumber: 22,
      name: 'Pet Honesty Probiotics for Dogs for Occasional Diarrhea & Bowel Support, Digestive Enzymes with Prebiotics for Gut Health for Dogs, Immunity Health & Itch Relief (Duck 90 ct)',
      slug: 'pet-honesty-probiotics-for-dogs-for-occasional-diarrhea-bowel-support-digestive-enzymes-with-prebiotics-for-gut-health-for-dogs-immunity-health-itch-relief-duck-90-ct',
      description: 'Advanced probiotic formula for dogs with digestive enzymes and prebiotics for optimal gut health.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61I+VuX8BbL._AC_SX679_.jpg', alt: 'Pet Honesty Probiotics', isPrimary: true }
      ],
      rating: { average: 4.9, count: 14800 },
      isFeatured: false,
      isTrending: true,
      brand: 'Pet Honesty',
      inStock: true,
      tags: ['pet', 'dog', 'probiotics', 'digestive'],
      affiliateUrl: 'https://amzn.to/47atVNv'
    },

    // Product 23 - Ameritex Waterproof Dog Bed Cover
    {
      _id: 'product-23',
      productNumber: 23,
      name: 'Ameritex Waterproof Dog Bed Cover Pet Blanket for Furniture Bed Couch Sofa Reversible',
      slug: 'ameritex-waterproof-dog-bed-cover-pet-blanket-for-furniture-bed-couch-sofa-reversible',
      description: 'Reversible waterproof pet blanket to protect furniture from pet hair and accidents.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/7146J4uayuL._AC_SX522_.jpg', alt: 'Dog Bed Cover', isPrimary: true }
      ],
      rating: { average: 5.0, count: 33500 },
      isFeatured: true,
      isTrending: false,
      brand: 'Ameritex',
      inStock: true,
      tags: ['pet', 'bed-cover', 'waterproof', 'furniture'],
      affiliateUrl: 'https://amzn.to/470Dgc6'
    },

    // Product 24 - Ameritex Waterproof Dog Bed Cover with Anti-Slip
    {
      _id: 'product-24',
      productNumber: 24,
      name: 'Ameritex Waterproof Dog Bed Cover Pet Blanket with Anti-Slip Back for Furniture Bed Couch Sofa',
      slug: 'ameritex-waterproof-dog-bed-cover-pet-blanket-with-anti-slip-back-for-furniture-bed-couch-sofa',
      description: 'Waterproof pet blanket with anti-slip backing to protect furniture and stay in place.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71b2zgKQRWL._AC_SX522_.jpg', alt: 'Dog Bed Cover Anti-Slip', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71b2zgKQRWL._AC_SX522_.jpg', alt: 'Dog Bed Cover Anti-Slip Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 9400 },
      isFeatured: false,
      isTrending: false,
      brand: 'Ameritex',
      inStock: true,
      tags: ['pet', 'bed-cover', 'waterproof', 'anti-slip'],
      affiliateUrl: 'https://amzn.to/4qgpsSc'
    },

    // Product 25 - Ameritex Pet Bed Blanket Reversible
    {
      _id: 'product-25',
      productNumber: 25,
      name: 'Ameritex Pet Bed Blanket Reversible 100% Waterproof Velvet Super Soft for Sofa and Bed (52x82 Inches, Light Grey+Grey)',
      slug: 'ameritex-pet-bed-blanket-reversible-100-waterproof-velvet-super-soft-for-sofa-and-bed-52x82-inches-light-greygrey',
      description: 'Large reversible waterproof pet blanket with velvet texture for ultimate comfort and protection.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61uxRuNCGyL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Pet Bed Blanket Reversible', isPrimary: true }
      ],
      rating: { average: 4.7, count: 2735 },
      isFeatured: false,
      isTrending: true,
      brand: 'Ameritex',
      inStock: true,
      tags: ['pet', 'blanket', 'reversible', 'velvet'],
      affiliateUrl: 'https://amzn.to/4721kv2'
    },

    // Product 26 - Dog Grooming Kit & Dog Hair Vacuum
    {
      _id: 'product-26',
      productNumber: 26,
      name: 'Dog Grooming Kit & Dog Hair Vacuum,15000 Pa Powerful Suction, Pet Grooming Vacuum Removes 99% Pet Hair, Includes Clippers, Brush, Nail Trimmer Grinder, Stainless Steel',
      slug: 'dog-grooming-kit-dog-hair-vacuum15000-pa-powerful-suction-pet-grooming-vacuum-removes-99-pet-hair-includes-clippers-brush-nail-trimmer-grinder-stainless-steel',
      description: 'Complete dog grooming kit with powerful vacuum suction and professional grooming tools.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71faiVegjzL._AC_SX679_.jpg', alt: 'Dog Grooming Kit', isPrimary: true }
      ],
      rating: { average: 4.8, count: 156 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['pet', 'grooming', 'vacuum', 'kit'],
      affiliateUrl: 'https://amzn.to/3WeOm78'
    },

    // Product 27 - FurMe ULTRA Pet Grooming Vacuum Kit
    {
      _id: 'product-27',
      productNumber: 27,
      name: 'FurMe ULTRA Pet Grooming Vacuum Kit - Cat & Dog Grooming Kit For Easy Pet Care at Home, Quiet & Safe Dog Hair Remover Machine with Brush, Clipper, Shedding & Cleaner Tools & 4.5L Canister',
      slug: 'furme-ultra-pet-grooming-vacuum-kit-cat-dog-grooming-kit-for-easy-pet-care-at-home-quiet-safe-dog-hair-remover-machine-with-brush-clipper-shedding-cleaner-tools-45l-canister',
      description: 'Ultra pet grooming vacuum kit with large 4.5L canister and quiet operation for home pet care.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41JqbSr+NGL._SY300_SX300_QL70_FMwebp_.jpg', alt: 'FurMe ULTRA Grooming Kit', isPrimary: true }
      ],
      rating: { average: 4.9, count: 1034 },
      isFeatured: true,
      isTrending: true,
      brand: 'FurMe',
      inStock: true,
      tags: ['pet', 'grooming', 'vacuum', 'ultra'],
      affiliateUrl: 'https://amzn.to/3L5IUAZ'
    },

    // Product 28 - FurMe Original Pet Grooming Vacuum Kit
    {
      _id: 'product-28',
      productNumber: 28,
      name: 'FurMe Original Pet Grooming Vacuum Kit - Cat & Dog Grooming Kit for Easy Pet Care at Home, Quiet & Safe Dog Hair Remover Machine with Brush, Clipper, Shedding & Cleaner Tools & 1L Canister',
      slug: 'furme-original-pet-grooming-vacuum-kit-cat-dog-grooming-kit-for-easy-pet-care-at-home-quiet-safe-dog-hair-remover-machine-with-brush-clipper-shedding-cleaner-tools-1l-canister',
      description: 'Original pet grooming vacuum kit with 1L canister for convenient home pet grooming.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61z5hF5S1rL.jpg', alt: 'FurMe Original Grooming Kit', isPrimary: true }
      ],
      rating: { average: 5.0, count: 1001 },
      isFeatured: false,
      isTrending: false,
      brand: 'FurMe',
      inStock: true,
      tags: ['pet', 'grooming', 'vacuum', 'original'],
      affiliateUrl: 'https://amzn.to/4nf8jFI'
    },

    // Product 29 - Uproot Clean Pet Groomer Vacuum Kit
    {
      _id: 'product-29',
      productNumber: 29,
      name: 'Uproot Clean Pet Groomer Vacuum Kit 7 in 1 - Cat & Dog Grooming Kit with Brush, Detangle, Deshed, Trim, Clean, & Dry Attachments - Complete Cat & Dog Grooming Vacuum for Shedding Pets',
      slug: 'uproot-clean-pet-groomer-vacuum-kit-7-in-1-cat-dog-grooming-kit-with-brush-detangle-deshed-trim-clean-dry-attachments-complete-cat-dog-grooming-vacuum-for-shedding-pets',
      description: '7-in-1 pet grooming vacuum kit with multiple attachments for complete pet care.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81pEBQTpK+L._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Uproot Clean Grooming Kit', isPrimary: true }
      ],
      rating: { average: 4.6, count: 537 },
      isFeatured: false,
      isTrending: true,
      brand: 'Uproot Clean',
      inStock: true,
      tags: ['pet', 'grooming', 'vacuum', '7-in-1'],
      affiliateUrl: 'https://amzn.to/47yLZCo'
    },

    // Product 30 - oneisall Dog Clipper Low Noise
    {
      _id: 'product-30',
      productNumber: 30,
      name: 'oneisall Dog Clipper Low Noise, Dog Grooming Kit with Rechargeable, Pet Shaver Cordless Electric Quiet Hair Clipper Set for Dogs Cats Pets（Gold）',
      slug: 'oneisall-dog-clipper-low-noise-dog-grooming-kit-with-rechargeable-pet-shaver-cordless-electric-quiet-hair-clipper-set-for-dogs-cats-petsgold',
      description: 'Low noise cordless dog clipper with rechargeable battery for quiet pet grooming.',
      price: 0,
      originalPrice: 0,
      category: 'pet',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71ntBUTlBLL._AC_SX522_.jpg', alt: 'Dog Clipper Low Noise', isPrimary: true }
      ],
      rating: { average: 4.7, count: 95400 },
      isFeatured: true,
      isTrending: true,
      brand: 'oneisall',
      inStock: true,
      tags: ['pet', 'clipper', 'low-noise', 'cordless'],
      affiliateUrl: 'https://amzn.to/4oxLPB3'
    },

    // Product 31 - Checkered Makeup Bag
    {
      _id: 'product-31',
      productNumber: 31,
      name: 'Checkered Makeup Bag, Portable Makeup Bag with Adjustable Partition, Cosmetic Bags for Women Toiletry Travel Organizer Portable Make Up Bags for Christmas Birthday Gifts',
      slug: 'checkered-makeup-bag-portable-makeup-bag-with-adjustable-partition-cosmetic-bags-for-women-toiletry-travel-organizer-portable-make-up-bags-for-christmas-birthday-gifts',
      description: 'Portable makeup bag with adjustable partitions for organized travel and daily use.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51cmsbZhVCL._AC_.jpg', alt: 'Checkered Makeup Bag', isPrimary: true }
      ],
      rating: { average: 4.8, count: 123 },
      isFeatured: false,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['beauty', 'makeup', 'bag', 'travel'],
      affiliateUrl: 'https://amzn.to/47huXrh'
    },

    // Product 32 - Makeup Bag 2 Pack
    {
      _id: 'product-32',
      productNumber: 32,
      name: 'Makeup Bag, Cosmetic Bag, Portable Leather Large Checkered Makeup Bag, 2 Pack Large Capacity Travel Cosmetic Bag for Women, Lightweight Design and Waterproof Toilet',
      slug: 'makeup-bag-cosmetic-bag-portable-leather-large-checkered-makeup-bag-2-pack-large-capacity-travel-cosmetic-bag-for-women-lightweight-design-and-waterproof-toilet',
      description: '2-pack large capacity waterproof makeup bags with leather design for travel and daily use.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71EmnNIUwdL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Makeup Bag 2 Pack', isPrimary: true }
      ],
      rating: { average: 4.9, count: 618 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['beauty', 'makeup', 'bag', 'waterproof'],
      affiliateUrl: 'https://amzn.to/46X4NLq'
    },

    // Product 33 - LIBIHUA Future Mrs Makeup Bag
    {
      _id: 'product-33',
      productNumber: 33,
      name: 'LIBIHUA Future Mrs,Funny Engagement Gift for Bride-Makeup Bag Cosmetic Bag Travel Pouch,Bride to Be-Newly Engaged-Bridal Shower Present for Her-Bachelorette Party Gifts for Women',
      slug: 'libihua-future-mrsfunny-engagement-gift-for-bride-makeup-bag-cosmetic-bag-travel-pouchbride-to-be-newly-engaged-bridal-shower-present-for-her-bachelorette-party-gifts-for-women',
      description: 'Funny engagement gift makeup bag perfect for brides-to-be and bridal shower presents.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81moawTKppL._AC_SX300_SY300_QL70_FMwebp_.jpg', alt: 'Future Mrs Makeup Bag', isPrimary: true }
      ],
      rating: { average: 5.0, count: 868 },
      isFeatured: true,
      isTrending: true,
      brand: 'LIBIHUA',
      inStock: true,
      tags: ['beauty', 'makeup', 'bag', 'gift'],
      affiliateUrl: 'https://amzn.to/42QbBIl'
    },

    // Product 34 - Gifts for Her Initial Makeup Bags
    {
      _id: 'product-34',
      productNumber: 34,
      name: 'Gifts for Her - Initial Large Makeup Bags, Personalized Double Layer Cosmetic Bags with Makeup Brush Organizer, Waterproof PU Leather Travel Toiletry Bags for Wedding & Bridesmaid Gifts',
      slug: 'gifts-for-her-initial-large-makeup-bags-personalized-double-layer-cosmetic-bags-with-makeup-brush-organizer-waterproof-pu-leather-travel-toiletry-bags-for-wedding-bridesmaid-gifts',
      description: 'Personalized makeup bags with initial and makeup brush organizer for special occasions.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71GZDNDkehL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Initial Makeup Bags', isPrimary: true }
      ],
      rating: { average: 4.6, count: 419 },
      isFeatured: false,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['beauty', 'makeup', 'bag', 'personalized'],
      affiliateUrl: 'https://amzn.to/4nTeIHT'
    },

    // Product 35 - Birthday Gifts Makeup Organizer Bag Set
    {
      _id: 'product-35',
      productNumber: 35,
      name: 'Birthday Gifts for Women Teen Girl, Personalized Initial Makeup Organizer Bag Set, Open Flat Travel Cosmetic Bag With Clear Divider and Handle(Beige,A) Brand: CLOUDWINGS',
      slug: 'birthday-gifts-for-women-teen-girl-personalized-initial-makeup-organizer-bag-set-open-flat-travel-cosmetic-bag-with-clear-divider-and-handlebeigea-brand-cloudwings',
      description: 'Personalized makeup organizer bag set with clear dividers and handle for easy organization.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61mh0YpS+lL._AC_SX679_.jpg', alt: 'Makeup Organizer Bag Set', isPrimary: true }
      ],
      rating: { average: 4.7, count: 96 },
      isFeatured: false,
      isTrending: true,
      brand: 'CLOUDWINGS',
      inStock: true,
      tags: ['beauty', 'makeup', 'organizer', 'personalized'],
      affiliateUrl: 'https://amzn.to/4nbBz08'
    },

    // Product 36 - Dokotoo Blouses
    {
      _id: 'product-36',
      productNumber: 36,
      name: 'Dokotoo Blouses Block Long Sleeve Shirts V Neck Tops',
      slug: 'dokotoo-blouses-block-long-sleeve-shirts-v-neck-tops',
      description: 'Stylish long sleeve blouses with V-neck design for casual and professional wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71X8G78df3L._AC_SY879_.jpg', alt: 'Dokotoo Blouses', isPrimary: true }
      ],
      rating: { average: 4.8, count: 662 },
      isFeatured: true,
      isTrending: false,
      brand: 'Dokotoo',
      inStock: true,
      tags: ['fashion', 'blouses', 'long-sleeve', 'v-neck'],
      affiliateUrl: 'https://amzn.to/4985NO7'
    },

    // Product 37 - Micoson Women's Long Sleeve Tops
    {
      _id: 'product-37',
      productNumber: 37,
      name: 'Micoson Women\'s Long Sleeve Tops Dressy Casual Fall Clothes Fashion 2025 V Neck Clothing Color Block T Shirts',
      slug: 'micoson-womens-long-sleeve-tops-dressy-casual-fall-clothes-fashion-2025-v-neck-clothing-color-block-t-shirts',
      description: 'Fashion 2025 long sleeve tops with color block design for dressy casual wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/712Arz13HCL._AC_SY879_.jpg', alt: 'Micoson Long Sleeve Tops', isPrimary: true }
      ],
      rating: { average: 4.9, count: 341 },
      isFeatured: true,
      isTrending: true,
      brand: 'Micoson',
      inStock: true,
      tags: ['fashion', 'tops', 'long-sleeve', 'color-block'],
      affiliateUrl: 'https://amzn.to/4hfwGSe'
    },

    // Product 38 - Marc Jacobs The Small Tote
    {
      _id: 'product-38',
      productNumber: 38,
      name: 'Marc Jacobs The Small Tote',
      slug: 'marc-jacobs-the-small-tote',
      description: 'Luxury small tote bag from Marc Jacobs for elegant everyday carry.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71dl7C2UwnL._AC_SY695_.jpg', alt: 'Marc Jacobs Small Tote', isPrimary: true }
      ],
      rating: { average: 5.0, count: 589 },
      isFeatured: true,
      isTrending: false,
      brand: 'Marc Jacobs',
      inStock: true,
      tags: ['fashion', 'tote', 'luxury', 'handbag'],
      affiliateUrl: 'https://amzn.to/3J36Zb7'
    },

    // Product 39 - GRACE KARIN Sequin Tops
    {
      _id: 'product-39',
      productNumber: 39,
      name: 'GRACE KARIN Sequin Tops 3/4 Sleeve Blouse V-Neck Shirts',
      slug: 'grace-karin-sequin-tops-34-sleeve-blouse-v-neck-shirts',
      description: 'Elegant sequin tops with 3/4 sleeve and V-neck design for special occasions.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81T+xOmW4NL._AC_SX679_.jpg', alt: 'GRACE KARIN Sequin Tops', isPrimary: true }
      ],
      rating: { average: 4.6, count: 1230 },
      isFeatured: false,
      isTrending: false,
      brand: 'GRACE KARIN',
      inStock: true,
      tags: ['fashion', 'sequin', 'tops', 'blouse'],
      affiliateUrl: 'https://amzn.to/4hiVJnJ'
    },

    // Product 40 - Logitech G502 HERO Gaming Mouse
    {
      _id: 'product-40',
      productNumber: 40,
      name: 'Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Buttons, On-Board Memory, PC/Mac',
      slug: 'logitech-g502-hero-high-performance-wired-gaming-mouse-hero-25k-sensor-25600-dpi-rgb-adjustable-weights-11-buttons-on-board-memory-pcmac',
      description: 'High-performance gaming mouse with HERO 25K sensor, RGB lighting, and adjustable weights.',
      price: 0,
      originalPrice: 0,
      category: 'gaming',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SX679_.jpg', alt: 'Logitech G502 HERO Mouse', isPrimary: true }
      ],
      rating: { average: 4.7, count: 69400 },
      isFeatured: true,
      isTrending: true,
      brand: 'Logitech',
      inStock: true,
      tags: ['gaming', 'mouse', 'hero-sensor', 'rgb'],
      affiliateUrl: 'https://amzn.to/3L13Bhq'
    },

    // Product 41 - TBMPOY Men's Tracksuits
    {
      _id: 'product-41',
      slug: 'tbmpoy-mens-tracksuits-sweatsuits-for-men-sweat-track-suits-2-piece-casual-athletic-jogging-warm-up-',
      
      productNumber: 41,
      name: 'TBMPOY Men\'s Tracksuits Sweatsuits for Men Sweat Track Suits 2 Piece Casual Athletic Jogging Warm Up Full Zip Sets',
      description: '2-piece men\'s tracksuit set with full zip for casual athletic wear and jogging.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41DrBqb2yJL._AC_SL1000_.jpg', alt: 'TBMPOY Men\'s Tracksuits', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41DrBqb2yJL._AC_SL1000_.jpg', alt: 'TBMPOY Men\'s Tracksuits Detail', isPrimary: false }
      ],
      rating: { average: 4.8, count: 9560 },
      isFeatured: true,
      isTrending: false,
      brand: 'TBMPOY',
      inStock: true,
      tags: ['fashion', 'men', 'tracksuit', 'athletic'],
      affiliateUrl: 'https://amzn.to/3WatTAi'
    },

    // Product 42 - COOFANDY Men's Tracksuits
    {
      _id: 'product-42',
      slug: 'coofandy-mens-tracksuits-2-piece-athletic-track-suit-jogging-running-sweatsuits-casual-warm-full-zip',
      
      productNumber: 42,
      name: 'COOFANDY Men\'s Tracksuits 2 Piece Athletic Track Suit Jogging Running Sweatsuits Casual Warm Full Zip Sports Set',
      description: 'Athletic 2-piece tracksuit for men with full zip design for jogging and running.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/31VmY5bv44L._AC_SL1500_.jpg', alt: 'COOFANDY Men\'s Tracksuits', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/31VmY5bv44L._AC_SL1500_.jpg', alt: 'COOFANDY Men\'s Tracksuits Detail', isPrimary: false }
      ],
      rating: { average: 4.9, count: 34 },
      isFeatured: false,
      isTrending: true,
      brand: 'COOFANDY',
      inStock: true,
      tags: ['fashion', 'men', 'tracksuit', 'sports'],
      affiliateUrl: 'https://amzn.to/42Qc3Gx'
    },

    // Product 43 - UOUA Men's Tracksuit
    {
      _id: 'product-43',
      slug: 'uoua-mens-tracksuit-2-piece-sets-casual-sweatsuit-with-full-zip-athletic-jogging-suits-waffle-plaid-',
      
      productNumber: 43,
      name: 'UOUA Men\'s Tracksuit 2 Piece Sets Casual Sweatsuit with Full Zip Athletic Jogging Suits Waffle Plaid Jacquard Outfits',
      description: 'Casual 2-piece men\'s tracksuit with waffle plaid jacquard design for athletic wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41KHIHf2HNL._AC_SL1000_.jpg', alt: 'UOUA Men\'s Tracksuit', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41KHIHf2HNL._AC_SL1000_.jpg', alt: 'UOUA Men\'s Tracksuit Detail', isPrimary: false }
      ],
      rating: { average: 5.0, count: 345 },
      isFeatured: true,
      isTrending: false,
      brand: 'UOUA',
      inStock: true,
      tags: ['fashion', 'men', 'tracksuit', 'jacquard'],
      affiliateUrl: 'https://amzn.to/3WytGqV'
    },

    // Product 44 - Men's Tracksuits Sweatsuits
    {
      _id: 'product-44',
      slug: 'mens-tracksuits-sweatsuits-2-piece-casual-sweat-jogging-suit-set-athletic-full-zip-hoodies-and-sweat',
      
      productNumber: 44,
      name: 'Men\'s Tracksuits Sweatsuits 2 Piece Casual Sweat Jogging Suit Set Athletic Full Zip Hoodies and Sweatpant Outfits',
      description: '2-piece casual sweat jogging suit set with full zip hoodies and sweatpants.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71w-EW59NUL._AC_SX679_.jpg', alt: 'Men\'s Sweatsuits', isPrimary: true }
      ],
      rating: { average: 4.6, count: 127 },
      isFeatured: false,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['fashion', 'men', 'sweatsuit', 'hoodie'],
      affiliateUrl: 'https://amzn.to/4qhSr8h'
    },

    // Product 45 - COOFANDY Men's 2 Piece Tracksuit Set
    {
      _id: 'product-45',
      slug: 'coofandy-mens-2-piece-tracksuit-set-polo-athletic-sweatsuit-quarter-zip-jogging-long-sleeve-casual-s',
      
      productNumber: 45,
      name: 'COOFANDY Men\'s 2 Piece Tracksuit Set Polo Athletic Sweatsuit Quarter Zip Jogging Long Sleeve Casual Sports Outfits',
      description: '2-piece tracksuit set with polo design and quarter zip for athletic and casual wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61nwuyn7z5L._AC_SY879_.jpg', alt: 'COOFANDY Polo Tracksuit', isPrimary: true }
      ],
      rating: { average: 4.7, count: 584 },
      isFeatured: false,
      isTrending: true,
      brand: 'COOFANDY',
      inStock: true,
      tags: ['fashion', 'men', 'tracksuit', 'polo'],
      affiliateUrl: 'https://amzn.to/3LianPW'
    },

    // Product 46 - COOFANDY Men's Long Sleeve Henley Shirts
    {
      _id: 'product-46',
      slug: 'coofandy-mens-long-sleeve-henley-shirts-cotton-t-shirts-casual-pullover-shirt-soft-stretch-basic-tee',
      
      productNumber: 46,
      name: 'COOFANDY Men\'s Long Sleeve Henley Shirts Cotton T-Shirts Casual Pullover Shirt Soft Stretch Basic Tees Fall Tops',
      description: 'Long sleeve henley shirts in cotton with soft stretch for casual fall wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71HIBQ46CFL._AC_SY879_.jpg', alt: 'COOFANDY Henley Shirts', isPrimary: true }
      ],
      rating: { average: 4.8, count: 61 },
      isFeatured: true,
      isTrending: false,
      brand: 'COOFANDY',
      inStock: true,
      tags: ['fashion', 'men', 'henley', 'cotton'],
      affiliateUrl: 'https://amzn.to/4hfIW5k'
    },

    // Product 47 - Versace Women's Ve2168 Round
    {
      _id: 'product-47',
      slug: 'versace-womens-ve2168-round',
      
      productNumber: 47,
      name: 'Versace Women\'s Ve2168 Round',
      description: 'Luxury round sunglasses from Versace for women with elegant design.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/21rIqHaTzeL._AC_SL1500_.jpg', alt: 'Versace Round Sunglasses', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/31p6UFAretL._AC_SL1000_.jpg', alt: 'Versace Round Sunglasses Detail View', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41K8Z9Z9Z9L._AC_SL1000_.jpg', alt: 'Versace Round Sunglasses Side View', isPrimary: false }
      ],
      rating: { average: 4.9, count: 354 },
      isFeatured: true,
      isTrending: true,
      brand: 'Versace',
      inStock: true,
      tags: ['fashion', 'sunglasses', 'luxury', 'versace'],
      affiliateUrl: 'https://amzn.to/4nhmJW7'
    },

    // Product 48 - Tory Burch Sunglasses
    {
      _id: 'product-48',
      productNumber: 48,
      name: 'Tory Burch TY7143U Sunglasses 170913-56 -, womens, Dk Brown Gradient TY7143U-170913-56',
      slug: 'tory-burch-ty7143u-sunglasses-170913-56-womens-dk-brown-gradient-ty7143u-170913-56',
      description: 'Tory Burch women\'s sunglasses with dark brown gradient lenses for stylish sun protection.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/31p6UFAretL._AC_SL1000_.jpg', alt: 'Tory Burch Sunglasses', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/31p6UFAretL._AC_SL1000_.jpg', alt: 'Tory Burch Sunglasses Detail', isPrimary: false }
      ],
      rating: { average: 5.0, count: 883 },
      isFeatured: true,
      isTrending: false,
      brand: 'Tory Burch',
      inStock: true,
      tags: ['fashion', 'sunglasses', 'tory-burch', 'gradient'],
      affiliateUrl: 'https://amzn.to/3L3aE9j'
    },

    // Product 49 - Versace The Dreamer for Men
    {
      _id: 'product-49',
      productNumber: 49,
      name: 'Versace The Dreamer for Men 3.4 oz Eau de Toilette Spray',
      slug: 'versace-the-dreamer-for-men-34-oz-eau-de-toilette-spray',
      description: 'Luxury men\'s fragrance from Versace with 3.4 oz eau de toilette spray.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://www.boostyourweb.fr/wp-content/uploads/2022/02/Template-article13.png', alt: 'Versace The Dreamer', isPrimary: true }
      ],
      rating: { average: 4.6, count: 95000 },
      isFeatured: true,
      isTrending: true,
      brand: 'Versace',
      inStock: true,
      tags: ['beauty', 'fragrance', 'men', 'versace'],
      affiliateUrl: 'https://amzn.to/47dcQCG'
    },

    // Product 50 - Versace Men's VE4296 Sunglasses
    {
      _id: 'product-50',
      slug: 'versace-mens-ve4296-sunglasses-59mm',
      
      productNumber: 50,
      name: 'Versace Men\'s VE4296 Sunglasses 59mm',
      description: 'Luxury men\'s sunglasses from Versace with 59mm lens size for premium style.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://images.unsplash.com/photo-1518544801976-3e206850154b?auto=format&fit=crop&w=1000&q=80', alt: 'Versace Men\'s Sunglasses', isPrimary: true }
      ],
      rating: { average: 4.7, count: 0 },
      isFeatured: false,
      isTrending: false,
      brand: 'Versace',
      inStock: true,
      tags: ['fashion', 'sunglasses', 'men', 'versace'],
      affiliateUrl: 'https://amzn.to/47dF9kn'
    },

    // Product 51 - Kattee Women's Soft Leather Tote Bag
    {
      _id: 'product-51',
      slug: 'kattee-womens-soft-leather-tote-bag-top-satchel-purses-and-handbags',
      
      productNumber: 51,
      name: 'Kattee Women\'s Soft Leather Tote Bag, Top Satchel Purses and Handbags',
      description: 'Soft leather tote bag for women with satchel design for elegant everyday carry.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71Zjx+OgouL._AC_SX679_.jpg', alt: 'Kattee Leather Tote Bag', isPrimary: true }
      ],
      rating: { average: 4.8, count: 4620 },
      isFeatured: true,
      isTrending: false,
      brand: 'Kattee',
      inStock: true,
      tags: ['fashion', 'tote', 'leather', 'handbag'],
      affiliateUrl: 'https://amzn.to/4ol1uDq'
    },

    // Product 52 - sqlp Large Work Tote Bag
    {
      _id: 'product-52',
      productNumber: 52,
      name: 'sqlp Large Work Tote Bag for Women Designer Purses and Handbags Big Bucket bags Ladies Travel Crossbody Purse',
      slug: 'sqlp-large-work-tote-bag-for-women-designer-purses-and-handbags-big-bucket-bags-ladies-travel-crossbody-purse',
      description: 'Large work tote bag for women with designer style, perfect for travel and daily use.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/816xNhRMcCL._AC_SX625_.jpg', alt: 'sqlp Large Work Tote', isPrimary: true }
      ],
      rating: { average: 4.9, count: 7400 },
      isFeatured: true,
      isTrending: true,
      brand: 'sqlp',
      inStock: true,
      tags: ['fashion', 'tote', 'work', 'travel'],
      affiliateUrl: 'https://amzn.to/4qeKKQl'
    },

    // Product 53 - Motorola Moto G Stylus 5G
    {
      _id: 'product-53',
      productNumber: 53,
      name: 'Motorola Moto G Stylus 5G | 2024 | Unlocked | Made for US 8/256GB | 50MP Camera | Scarlet Wave',
      slug: 'motorola-moto-g-stylus-5g-2024-unlocked-made-for-us-8256gb-50mp-camera-scarlet-wave',
      description: 'Motorola Moto G Stylus 5G smartphone with 8GB RAM, 256GB storage, and 50MP camera.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61WBN0TuM+L._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Motorola Moto G Stylus 5G', isPrimary: true }
      ],
      rating: { average: 5.0, count: 19000 },
      isFeatured: true,
      isTrending: false,
      brand: 'Motorola',
      inStock: true,
      tags: ['electronics', 'smartphone', '5g', 'stylus'],
      affiliateUrl: 'https://amzn.to/497MLre'
    },

    // Product 54 - BOSTANTEN Women's Leather Designer Handbags
    {
      _id: 'product-54',
      slug: 'bostanten-womens-leather-designer-handbags-tote-purses-shoulder-bucket-bags',
      
      productNumber: 54,
      name: 'BOSTANTEN Women\'s Leather Designer Handbags Tote Purses Shoulder Bucket Bags',
      description: 'Designer leather handbags for women with tote and shoulder bucket bag styles.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71HRnouDK-L._AC_SX679_.jpg', alt: 'BOSTANTEN Leather Handbags', isPrimary: true }
      ],
      rating: { average: 4.6, count: 8950 },
      isFeatured: false,
      isTrending: false,
      brand: 'BOSTANTEN',
      inStock: true,
      tags: ['fashion', 'handbag', 'leather', 'designer'],
      affiliateUrl: 'https://amzn.to/3J7puLy'
    },

    // Product 55 - Sunzel Flare Leggings
    {
      _id: 'product-55',
      productNumber: 55,
      name: 'Sunzel Flare Leggings Crossover Yoga Pants',
      slug: 'sunzel-flare-leggings-crossover-yoga-pants',
      description: 'Flare leggings with crossover design, perfect for yoga and active wear.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61aUZQs50XL._AC_SY879_.jpg', alt: 'Sunzel Flare Leggings', isPrimary: true }
      ],
      rating: { average: 4.7, count: 31557 },
      isFeatured: true,
      isTrending: true,
      brand: 'Sunzel',
      inStock: true,
      tags: ['fashion', 'leggings', 'yoga', 'flare'],
      affiliateUrl: 'https://amzn.to/47e8on3'
    },

    // Product 56 - BOYATU Travel Makeup Bag 3 Pcs Set Coffee
    {
      _id: 'product-56',
      productNumber: 56,
      name: 'BOYATU Travel Makeup Bag Cosmetic Bags for Women: 3 Pcs Set Large Portable Make up Bag with Handle - Vegan Leather Toiletry Bags with Compartments - Makeup Organizer for Travel Essentials(A-1-Coffee)',
      slug: 'boyatu-travel-makeup-bag-cosmetic-bags-for-women-3-pcs-set-large-portable-make-up-bag-with-handle-vegan-leather-toiletry-bags-with-compartments-makeup-organizer-for-travel-essentialsa-1-coffee',
      description: '3-piece travel makeup bag set with vegan leather and compartments for organized travel.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81IixPo6KcL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'BOYATU Travel Makeup Bag Coffee', isPrimary: true }
      ],
      rating: { average: 4.8, count: 586 },
      isFeatured: false,
      isTrending: false,
      brand: 'BOYATU',
      inStock: true,
      tags: ['beauty', 'makeup', 'travel', 'vegan-leather'],
      affiliateUrl: 'https://amzn.to/4nxkxKh'
    },

    // Product 57 - BOYATU Travel Makeup Bag 3 Pcs Set Beige
    {
      _id: 'product-57',
      productNumber: 57,
      name: 'BOYATU Travel Makeup Bag Cosmetic Bags for Women: 3 Pcs Set Portable Make up Bag with Handle - Vegan Leather Toiletry Bags with Compartments - Makeup Organizer for Travel Essentials(C-4-Beige)',
      slug: 'boyatu-travel-makeup-bag-cosmetic-bags-for-women-3-pcs-set-portable-make-up-bag-with-handle-vegan-leather-toiletry-bags-with-compartments-makeup-organizer-for-travel-essentialsc-4-beige',
      description: '3-piece travel makeup bag set in beige with vegan leather and organized compartments.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81bgSmKoS3L._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'BOYATU Travel Makeup Bag Beige', isPrimary: true }
      ],
      rating: { average: 4.9, count: 579 },
      isFeatured: true,
      isTrending: false,
      brand: 'BOYATU',
      inStock: true,
      tags: ['beauty', 'makeup', 'travel', 'beige'],
      affiliateUrl: 'https://amzn.to/4hexPti'
    },

    // Product 58 - Travel Makeup Bag Women's Large Capacity
    {
      _id: 'product-58',
      slug: 'travel-makeup-bag-womens-large-capacity-cosmetic-portable-organizer-large-opening-waterproof-storage',
      
      productNumber: 58,
      name: 'Travel Makeup Bag Women\'s Large Capacity Cosmetic Portable Organizer Large Opening Waterproof Storage Toiletry Bags Vertical Free-Standing Brush Holder for Easy Access Black',
      description: 'Large capacity waterproof travel makeup bag with vertical brush holder for easy access.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71JsSaZpNhL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Large Capacity Travel Makeup Bag', isPrimary: true }
      ],
      rating: { average: 5.0, count: 589 },
      isFeatured: true,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['beauty', 'makeup', 'travel', 'waterproof'],
      affiliateUrl: 'https://amzn.to/49aIqn2'
    },

    // Product 59 - Masa Kawa Leather Hanging Travel Toiletry Bag
    {
      _id: 'product-59',
      productNumber: 59,
      name: 'Masa Kawa Leather Hanging Travel Toiletry Bag for Men Portable Expandable Camping Cosmetics Makeup Toiletries Organizer Waterproof Bathroom Shaving Kit Black Wash Bags',
      slug: 'masa-kawa-leather-hanging-travel-toiletry-bag-for-men-portable-expandable-camping-cosmetics-makeup-toiletries-organizer-waterproof-bathroom-shaving-kit-black-wash-bags',
      description: 'Leather hanging toiletry bag for men with expandable design and waterproof protection.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/816POLOEdnL._AC_SX679_.jpg', alt: 'Masa Kawa Leather Toiletry Bag', isPrimary: true }
      ],
      rating: { average: 4.6, count: 59 },
      isFeatured: false,
      isTrending: false,
      brand: 'Masa Kawa',
      inStock: true,
      tags: ['beauty', 'toiletry', 'leather', 'men'],
      affiliateUrl: 'https://amzn.to/3JhdAi5'
    },

    // Product 60 - Genuine Leather Toiletry Bag
    {
      _id: 'product-60',
      productNumber: 60,
      name: 'Genuine Leather Toiletry Bag for Men & Women – Large Waterproof Travel Dopp Kit – Handmade Shaving & Cosmetic Organizer – Classic Style Wash Bag for Bathroom, Gym, or Vacation',
      slug: 'genuine-leather-toiletry-bag-for-men-women-large-waterproof-travel-dopp-kit-handmade-shaving-cosmetic-organizer-classic-style-wash-bag-for-bathroom-gym-or-vacation',
      description: 'Handmade genuine leather toiletry bag for men and women with waterproof design.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51cDl0b33AL._AC_SX679_.jpg', alt: 'Genuine Leather Toiletry Bag', isPrimary: true }
      ],
      rating: { average: 4.7, count: 6 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['beauty', 'toiletry', 'leather', 'handmade'],
      affiliateUrl: 'https://amzn.to/42NTC5i'
    },

    // Product 61 - Masa Kawa Leather Hanging Travel Toiletry Bag (Duplicate)
    {
      _id: 'product-61',
      productNumber: 61,
      name: 'Masa Kawa Leather Hanging Travel Toiletry Bag for Men Portable Expandable Camping Cosmetics Makeup Toiletries Organizer Waterproof Bathroom Shaving Kit Black Wash Bags',
      slug: 'masa-kawa-leather-hanging-travel-toiletry-bag-for-men-portable-expandable-camping-cosmetics-makeup-toiletries-organizer-waterproof-bathroom-shaving-kit-black-wash-bags-v2',
      description: 'Leather hanging toiletry bag for men with expandable design and waterproof protection.',
      price: 38,
      originalPrice: 38,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/816POLOEdnL._AC_SX679_.jpg', alt: 'Masa Kawa Leather Toiletry Bag', isPrimary: true }
      ],
      rating: { average: 4.8, count: 0 },
      isFeatured: true,
      isTrending: false,
      brand: 'Masa Kawa',
      inStock: true,
      tags: ['beauty', 'toiletry', 'leather', 'expandable'],
      affiliateUrl: 'https://amzn.to/3JhdAi5'
    },

    // Product 62 - SUUKSESS Women Sexy Mesh Sheer Crop Tank Tops
    {
      _id: 'product-62',
      productNumber: 62,
      name: 'SUUKSESS Women Sexy Mesh Sheer Crop Tank Tops Sleeveless Ruched Going Out Tops',
      slug: 'suuksess-women-sexy-mesh-sheer-crop-tank-tops-sleeveless-ruched-going-out-tops',
      description: 'Sexy mesh sheer crop tank tops with sleeveless ruched design for going out.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61zyvCV-psL._AC_SX679_.jpg', alt: 'SUUKSESS Mesh Crop Tank Tops', isPrimary: true }
      ],
      rating: { average: 4.9, count: 19 },
      isFeatured: false,
      isTrending: true,
      brand: 'SUUKSESS',
      inStock: true,
      tags: ['fashion', 'crop-top', 'mesh', 'sheer'],
      affiliateUrl: 'https://amzn.to/4nj5FyX'
    },

    // Product 63 - RUSTIC TOWN Full Grain Leather Travel Toiletry Bag
    {
      _id: 'product-63',
      productNumber: 63,
      name: 'RUSTIC TOWN Full Grain Leather Travel Toiletry Bag - Cosmetic Ditty Kit Organizer (Dark Brown)',
      slug: 'rustic-town-full-grain-leather-travel-toiletry-bag-cosmetic-ditty-kit-organizer-dark-brown',
      description: 'Full grain leather travel toiletry bag in dark brown for organized travel essentials.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81sBubODYmL._AC_SX679_.jpg', alt: 'RUSTIC TOWN Leather Toiletry Bag', isPrimary: true }
      ],
      rating: { average: 5.0, count: 2245 },
      isFeatured: true,
      isTrending: false,
      brand: 'RUSTIC TOWN',
      inStock: true,
      tags: ['beauty', 'toiletry', 'leather', 'full-grain'],
      affiliateUrl: 'https://amzn.to/48VGzmj'
    },

    // Product 64 - Nolita Handmade Genuine Buffalo Leather Toiletry Bag
    {
      _id: 'product-64',
      productNumber: 64,
      name: 'Nolita Handmade Genuine Buffalo Leather Hanging Toiletry Bag Travel Dopp Kit for Men and Women Crazy Horse Distressed Vintage Brown',
      slug: 'nolita-handmade-genuine-buffalo-leather-hanging-toiletry-bag-travel-dopp-kit-for-men-and-women-crazy-horse-distressed-vintage-brown',
      description: 'Handmade genuine buffalo leather toiletry bag with vintage distressed brown finish.',
      price: 0,
      originalPrice: 0,
      category: 'beauty',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81sBubODYmL._AC_SX679_.jpg', alt: 'Nolita Buffalo Leather Toiletry Bag', isPrimary: true }
      ],
      rating: { average: 4.6, count: 69 },
      isFeatured: false,
      isTrending: false,
      brand: 'Nolita',
      inStock: true,
      tags: ['beauty', 'toiletry', 'buffalo-leather', 'handmade'],
      affiliateUrl: 'https://amzn.to/4oo2syN'
    },

    // Product 65 - Stroller Rain Cover
    {
      _id: 'product-65',
      productNumber: 65,
      name: 'Stroller Rain Cover,Universal Rain Cover for Side by Side Baby Stroller, Double Stroller Cover for Rain and Wind,Baby Outdoor Activities Accessories.',
      slug: 'stroller-rain-coveruniversal-rain-cover-for-side-by-side-baby-stroller-double-stroller-cover-for-rain-and-windbaby-outdoor-activities-accessories',
      description: 'Universal rain cover for side by side baby strollers, providing protection from rain and wind during outdoor activities.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71tuYlyGTlL._SX679_.jpg', alt: 'Stroller Rain Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71wbfjeLTWL._SL1500_.jpg', alt: 'Stroller Rain Cover Detail', isPrimary: false }
      ],
      rating: { average: 4.7, count: 920 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['baby', 'stroller', 'rain-cover', 'outdoor'],
      affiliateUrl: 'https://amzn.to/3WJSE6v'
    },

    // Product 66 - 12 Beloved Disney Classic Little Golden Books
    {
      _id: 'product-66',
      productNumber: 66,
      name: '12 Beloved Disney Classic Little Golden Books (Boxed Set)',
      slug: '12-beloved-disney-classic-little-golden-books-boxed-set',
      description: 'Boxed set of 12 beloved Disney classic Little Golden Books for children\'s reading enjoyment.',
      price: 0,
      originalPrice: 0,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/91fhAoNOj3L._SL1500_.jpg', alt: 'Disney Classic Little Golden Books', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/916RbBCLErL._SL1500_.jpg', alt: 'Disney Books Box Set', isPrimary: false }
      ],
      rating: { average: 4.8, count: 3400 },
      isFeatured: true,
      isTrending: true,
      brand: 'Disney',
      inStock: true,
      tags: ['books', 'disney', 'children', 'classic'],
      affiliateUrl: 'https://amzn.to/4oy4a0R'
    },

    // Product 67 - Dr. Seuss's Beginner Book Boxed Set Collection
    {
      _id: 'product-67',
      slug: 'dr-seusss-beginner-book-boxed-set-collection-the-cat-in-the-hat-one-fish-two-fish-red-fish-blue-fish',
      
      productNumber: 67,
      name: 'Dr. Seuss\'s Beginner Book Boxed Set Collection: The Cat in the Hat; One Fish Two Fish Red Fish Blue Fish; Green Eggs and Ham; Hop on Pop; Fox in Socks Hardcover – Box set',
      description: 'Complete Dr. Seuss beginner book collection with classic stories in a beautiful boxed set.',
      price: 28000,
      originalPrice: 28000,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81Q33TSbsoL._SL1500_.jpg', alt: 'Dr. Seuss Boxed Set', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81u0PGzEXRL._SL1500_.jpg', alt: 'Dr. Seuss Books Collection', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/7173a8decnL._SL1500_.jpg', alt: 'Dr. Seuss Classic Stories', isPrimary: false }
      ],
      rating: { average: 4.9, count: 28405 },
      isFeatured: true,
      isTrending: false,
      brand: 'Dr. Seuss',
      inStock: true,
      tags: ['books', 'dr-seuss', 'children', 'classic'],
      affiliateUrl: 'https://amzn.to/4osTgcC'
    },

    // Product 68 - Leeleberd Led Lights for Bedroom
    {
      _id: 'product-68',
      productNumber: 68,
      name: 'Leeleberd Led Lights for Bedroom 100 ft (2 Rolls of 50ft) Music Sync Color Changing RGB Led Strip Lights with Remote App Control Bluetooth Led Strip, Lights for Room Home Kitchen Party Decor',
      slug: 'leeleberd-led-lights-for-bedroom-100-ft-2-rolls-of-50ft-music-sync-color-changing-rgb-led-strip-lights-with-remote-app-control-bluetooth-led-strip-lights-for-room-home-kitchen-party-decor',
      description: '100ft RGB LED strip lights with music sync, app control, and Bluetooth connectivity for bedroom and home decoration.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/815sBbUN7LL._AC_SX679_.jpg', alt: 'Leeleberd LED Strip Lights', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/819hAPoXhsL._AC_SX679_.jpg', alt: 'LED Lights Remote Control', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81L402RNQTL._AC_SL1500_.jpg', alt: 'LED Lights App Control', isPrimary: false }
      ],
      rating: { average: 5.0, count: 18860 },
      isFeatured: true,
      isTrending: true,
      brand: 'Leeleberd',
      inStock: true,
      tags: ['home', 'led-lights', 'rgb', 'bluetooth'],
      affiliateUrl: 'https://amzn.to/4hD63XX'
    },

    // Product 69 - My First Library: Boxset of 10 Board Books
    {
      _id: 'product-69',
      productNumber: 69,
      name: 'My First Library: Boxset of 10 Board Books for Kids Board book – April 25, 2018 by Wonder House Books (Author)',
      slug: 'my-first-library-boxset-of-10-board-books-for-kids-board-book-april-25-2018-by-wonder-house-books-author',
      description: 'Boxset of 10 board books perfect for young children\'s first library and early learning.',
      price: 0,
      originalPrice: 0,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81p1nkYo4NL._SY342_.jpg', alt: 'My First Library Board Books', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41Y0wfzok7L._SX38_SY50_CR,0,0,38,50_.jpg', alt: 'Board Books Collection', isPrimary: false }
      ],
      rating: { average: 4.6, count: 87800 },
      isFeatured: true,
      isTrending: false,
      brand: 'Wonder House Books',
      inStock: true,
      tags: ['books', 'children', 'board-books', 'learning'],
      affiliateUrl: 'https://amzn.to/3KY37sz'
    },

    // Product 70 - HelloBaby No WiFi Baby Monitor
    {
      _id: 'product-70',
      productNumber: 70,
      name: 'HelloBaby No WiFi Baby Monitor 5" Screen 30-Hour Battery Pan-Tilt-Zoom Video Upgrade with Camera and Audio, Night Vision, VOX, 2-Way Talk, 8 Lullabies and 1000ft Range, HB6550',
      slug: 'hellobaby-no-wifi-baby-monitor-5-screen-30-hour-battery-pan-tilt-zoom-video-upgrade-with-camera-and-audio-night-vision-vox-2-way-talk-8-lullabies-and-1000ft-range-hb6550',
      description: 'Advanced baby monitor with 5" screen, 30-hour battery, pan-tilt-zoom camera, night vision, and 2-way talk.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61WoQMri81L._AC_SX522_PIbundle-2,TopRight,0,0_SH20_.jpg', alt: 'HelloBaby Baby Monitor', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71SFStevsFL._AC_SX522_.jpg', alt: 'Baby Monitor Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71DwLsbIAuL._AC_SX522_.jpg', alt: 'Baby Monitor Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 16300 },
      isFeatured: true,
      isTrending: true,
      brand: 'HelloBaby',
      inStock: true,
      tags: ['baby', 'monitor', 'camera', 'night-vision'],
      affiliateUrl: 'https://amzn.to/3WKhvqL'
    },

    // Product 71 - Babystar Baby Monitor with Camera and Audio
    {
      _id: 'product-71',
      productNumber: 71,
      name: 'Babystar Baby Monitor with Camera and Audio, 720P HD Resolution 5" Display, Up to 22 Hour Battery, Remote Pan-Tilt-Zoom, No WiFi, VOX, Night Vision, 2-Way Audio, Lullabies, Temperature Sensor',
      slug: 'babystar-baby-monitor-with-camera-and-audio-720p-hd-resolution-5-display-up-to-22-hour-battery-remote-pan-tilt-zoom-no-wifi-vox-night-vision-2-way-audio-lullabies-temperature-sensor',
      description: 'HD baby monitor with 720P resolution, 22-hour battery, pan-tilt-zoom, night vision, and temperature sensor.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61-XnHMjn9L._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Babystar Baby Monitor', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71d4ApgfnOL._AC_SX522_.jpg', alt: 'Babystar Monitor Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61Ar5oaPL2L._AC_SX522_.jpg', alt: 'Babystar Monitor Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 2246 },
      isFeatured: false,
      isTrending: false,
      brand: 'Babystar',
      inStock: true,
      tags: ['baby', 'monitor', 'hd', 'temperature-sensor'],
      affiliateUrl: 'https://amzn.to/47xCSSr'
    },

    // Product 72 - 3 Pack Anti Breakage Baby Bottle Holder
    {
      _id: 'product-72',
      slug: '3-pack-anti-breakage-baby-bottle-holder-silicone-sleeves-for-dr-browns-natural-glass-baby-bottles-an',
      
      productNumber: 72,
      name: '3 Pack Anti Breakage Baby Bottle Holder, Silicone Sleeves for Dr. Brown\'s Natural Glass Baby Bottles, Anti Flow Sleeve for Infant Bottles (5 Ounce)',
      description: '3-pack silicone sleeves for Dr. Brown\'s glass baby bottles to prevent breakage and provide anti-flow protection.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61Zfn6uEhQL._SX679_.jpg', alt: 'Anti Breakage Baby Bottle Holder', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61runwKkOsL._SX679_.jpg', alt: 'Silicone Bottle Sleeves', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71VB3d5EeoL._SX679_.jpg', alt: 'Baby Bottle Protection', isPrimary: false }
      ],
      rating: { average: 4.9, count: 145 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['baby', 'bottle', 'silicone', 'protection'],
      affiliateUrl: 'https://amzn.to/4ngEuop'
    },

    // Product 73 - GROWNSY Baby Food Maker
    {
      _id: 'product-73',
      productNumber: 73,
      name: 'GROWNSY Baby Food Maker with Steam Basket, One Step Baby Food Processor Steamer Puree Blender Grinder Mills Machine, Auto Cooking Grinding and Sterili-zing for Healthy Homemade Baby Food, BPA-Free',
      slug: 'grownsy-baby-food-maker-with-steam-basket-one-step-baby-food-processor-steamer-puree-blender-grinder-mills-machine-auto-cooking-grinding-and-sterili-zing-for-healthy-homemade-baby-food-bpa-free',
      description: 'Complete baby food maker with steam basket, processor, steamer, and blender for healthy homemade baby food.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71Y9r+XT+tL._AC_SX679_.jpg', alt: 'GROWNSY Baby Food Maker', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61EecN9DCuL._AC_SL1500_.jpg', alt: 'Baby Food Maker Steam Basket', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71208ToO9QL._AC_SL1500_.jpg', alt: 'Baby Food Processor', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71jdEARz4PL._AC_SL1500_.jpg', alt: 'Baby Food Maker Blender', isPrimary: false }
      ],
      rating: { average: 5.0, count: 857 },
      isFeatured: true,
      isTrending: true,
      brand: 'GROWNSY',
      inStock: true,
      tags: ['baby', 'food-maker', 'steamer', 'blender'],
      affiliateUrl: 'https://amzn.to/47cgYmj'
    },

    // Product 74 - GROWNSY Baby Food Maker Dark Grey
    {
      _id: 'product-74',
      productNumber: 74,
      name: 'GROWNSY Baby Food Maker with Steam Basket, One Step Baby Food Processor Steamer Puree Blender Grinder Mills Machine, Auto Cooking Grinding and Sterili-zing for Healthy Homemade Baby Food, Dark Grey',
      slug: 'grownsy-baby-food-maker-with-steam-basket-one-step-baby-food-processor-steamer-puree-blender-grinder-mills-machine-auto-cooking-grinding-and-sterili-zing-for-healthy-homemade-baby-food-dark-grey',
      description: 'Dark grey baby food maker with steam basket, processor, steamer, and blender for healthy homemade baby food.',
      price: 0,
      originalPrice: 0,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71dSoPIVGgL._AC_SX679_.jpg', alt: 'GROWNSY Baby Food Maker Dark Grey', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71PF7kWb9LL._AC_SX679_.jpg', alt: 'Dark Grey Food Maker Steam Basket', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715dA0rP58L._AC_SX679_.jpg', alt: 'Dark Grey Food Processor', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71wnC9rMa-L._AC_SX679_.jpg', alt: 'Dark Grey Food Maker Blender', isPrimary: false }
      ],
      rating: { average: 4.6, count: 943 },
      isFeatured: false,
      isTrending: false,
      brand: 'GROWNSY',
      inStock: true,
      tags: ['baby', 'food-maker', 'dark-grey', 'steamer'],
      affiliateUrl: 'https://amzn.to/3WNaBB8'
    },

    // Product 75 - Huggies Size 3 Overnites Baby Diapers
    {
      _id: 'product-75',
      productNumber: 75,
      name: 'Huggies Size 3 Overnites Baby Diapers: Overnight Diapers, Size 3 (16-28 lbs), 132 Ct (2 Packs of 66), Packaging May Vary',
      slug: 'huggies-size-3-overnites-baby-diapers-overnight-diapers-size-3-16-28-lbs-132-ct-2-packs-of-66-packaging-may-vary',
      description: 'Huggies overnight diapers size 3 for babies 16-28 lbs, 132 count in 2 packs of 66 for overnight protection.',
      price: 42000,
      originalPrice: 42000,
      category: 'baby',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81kxdf7DHYL._AC_SX679_PIbundle-2,TopRight,0,0_SH20_.jpg', alt: 'Huggies Overnight Diapers', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81DoVfbKkDL._AC_SX679_.jpg', alt: 'Huggies Diapers Pack', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81mbKI8bY5L._AC_SX679_.jpg', alt: 'Huggies Size 3 Diapers', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/810ZgqpqtEL._AC_SL1500_.jpg', alt: 'Huggies Overnight Protection', isPrimary: false }
      ],
      rating: { average: 4.7, count: 0 },
      isFeatured: true,
      isTrending: true,
      brand: 'Huggies',
      inStock: true,
      tags: ['baby', 'diapers', 'overnight', 'size-3'],
      affiliateUrl: 'https://amzn.to/3J7E85u'
    },

    // Product 76 - Hostinger Web Hosting
    {
      _id: 'product-76',
      productNumber: 76,
      name: 'Hostinger is a web hosting service provider that offers domain registration, email hosting, and a range of hosting options like shared, cloud, VPS, and WordPress hosting.',
      slug: 'hostinger-is-a-web-hosting-service-provider-that-offers-domain-registration-email-hosting-and-a-range-of-hosting-options-like-shared-cloud-vps-and-wordpress-hosting',
      description: 'Professional web hosting service with domain registration, email hosting, shared hosting, cloud hosting, VPS, and WordPress hosting solutions.',
      price: 0,
      originalPrice: 0,
      category: 'technology',
      images: [
        { url: 'https://tse1.mm.bing.net/th/id/OIP.64ixjhYmGqXTR7BjKdBGNgHaEK?cb=12&pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3', alt: 'Hostinger Web Hosting', isPrimary: true },
        { url: 'https://images.seeklogo.com/logo-png/50/1/hostinger-logo-png_seeklogo-507103.png', alt: 'Hostinger Logo', isPrimary: false }
      ],
      rating: { average: 4.8, count: 845000 },
      isFeatured: true,
      isTrending: true,
      brand: 'Hostinger',
      inStock: true,
      tags: ['technology', 'hosting', 'web', 'domain', 'vps', 'cloud'],
      affiliateUrl: 'https://hostinger.com?REFERRALCODE=9GBTAHBIBZEO'
    },

    // Product 77 - Brother XM2701 Sewing Machine
    {
      _id: 'product-77',
      productNumber: 77,
      name: 'Brother XM2701 Sewing Machine, Lightweight, Full Featured, 27 Stitches, 6 Included Feet',
      slug: 'brother-xm2701-sewing-machine-lightweight-full-featured-27-stitches-6-included-feet',
      description: 'Lightweight, full-featured sewing machine with 27 built-in stitches and 6 included feet for versatile sewing.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71QdzSt93zL._AC_SX679_.jpg', alt: 'Brother XM2701 Sewing Machine 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61uhzL6lesL._AC_SL1200_.jpg', alt: 'Brother XM2701 Sewing Machine 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51-6MeV-hWL._AC_.jpg', alt: 'Brother XM2701 Sewing Machine 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61FkIes0fOL._AC_SL1200_.jpg', alt: 'Brother XM2701 Sewing Machine 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 23000 },
      isFeatured: true,
      isTrending: false,
      brand: 'Brother',
      inStock: true,
      tags: ['home', 'sewing-machine', 'brother', 'stitches'],
      affiliateUrl: 'https://amzn.to/3JjRrzO'
    },

    // Product 78 - Brother CS7000X Sewing and Quilting Machine
    {
      _id: 'product-78',
      productNumber: 78,
      name: 'Brother CS7000X Computerized Sewing and Quilting Machine, 70 Built-in Stitches, LCD Display, Wide Table, 10 Included Feet, White',
      slug: 'brother-cs7000x-computerized-sewing-and-quilting-machine-70-built-in-stitches-lcd-display-wide-table-10-included-feet-white',
      description: 'Computerized sewing and quilting machine featuring 70 built-in stitches, LCD display, wide table, and 10 included feet.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61d3uuXQ2TL._AC_SX679_.jpg', alt: 'Brother CS7000X Sewing Machine 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71SOXBPa5dL._AC_SL1500_.jpg', alt: 'Brother CS7000X Sewing Machine 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51NhhoxbGRL._AC_SL1143_.jpg', alt: 'Brother CS7000X Sewing Machine 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61U4SlKKFKL._AC_SL1500_.jpg', alt: 'Brother CS7000X Sewing Machine 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 3481 },
      isFeatured: true,
      isTrending: true,
      brand: 'Brother',
      inStock: true,
      tags: ['home', 'sewing-machine', 'brother', 'computerized'],
      affiliateUrl: 'https://amzn.to/4733D0U'
    },

    // Product 79 - HP 15.6 inch Laptop
    {
      _id: 'product-79',
      productNumber: 79,
      name: 'HP 15.6 inch Laptop, HD Touchscreen Display, AMD Ryzen 3 7320U, 8 GB RAM, 256 GB SSD, AMD Radeon Graphics, Windows 11 Home, Natural Silver, 15-fc0399nr',
      slug: 'hp-156-inch-laptop-hd-touchscreen-display-amd-ryzen-3-7320u-8-gb-ram-256-gb-ssd-amd-radeon-graphics-windows-11-home-natural-silver-15-fc0399nr',
      description: 'HP 15.6 inch laptop with HD touchscreen display, AMD Ryzen 3 7320U processor, 8GB RAM, 256GB SSD, and AMD Radeon graphics.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71XTCkgshfL._AC_SX522_.jpg', alt: 'HP 15.6 inch Laptop 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71nwpMQOgEL._AC_SX522_.jpg', alt: 'HP 15.6 inch Laptop 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/716d7-kD+lL._AC_SX522_.jpg', alt: 'HP 15.6 inch Laptop 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/711wVkFoujL._AC_SX522_.jpg', alt: 'HP 15.6 inch Laptop 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 622 },
      isFeatured: true,
      isTrending: false,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'touchscreen', 'amd-ryzen'],
      affiliateUrl: 'https://amzn.to/4oxFDck'
    },

    // Product 80 - HP 17.3 inch Laptop
    {
      _id: 'product-80',
      productNumber: 80,
      name: 'HP 17.3 inch Laptop, HD+ Display, AMD Ryzen 5 7520U, 16 GB RAM, 512 GB SSD, AMD Radeon Graphics, Windows 11 Home, Natural Silver, 17-cp2199nr',
      slug: 'hp-173-inch-laptop-hd-display-amd-ryzen-5-7520u-16-gb-ram-512-gb-ssd-amd-radeon-graphics-windows-11-home-natural-silver-17-cp2199nr',
      description: 'HP 17.3 inch laptop with HD+ display, AMD Ryzen 5 7520U processor, 16GB RAM, 512GB SSD, and AMD Radeon graphics.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71vhwzOkcvL._AC_SL1500_.jpg', alt: 'HP 17.3 inch Laptop 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/710Hs9o9wVL._AC_SL1500_.jpg', alt: 'HP 17.3 inch Laptop 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81W9h4CMNkL._AC_SL1500_.jpg', alt: 'HP 17.3 inch Laptop 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61yMOqpms4L._AC_SL1500_.jpg', alt: 'HP 17.3 inch Laptop 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 203 },
      isFeatured: true,
      isTrending: true,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'amd-ryzen', 'large-screen'],
      affiliateUrl: 'https://amzn.to/3IXuWka'
    },

    // Product 81 - HP 17.3" Laptop Computer with Intel i3
    {
      _id: 'product-81',
      productNumber: 81,
      name: 'HP 17.3" Laptop Computer • Intel 13th 8-Cores i3 CPU (Beat 11th i5) • 32GB RAM • 1TB SSD • 10-Key Number Pad • Win11 Pro • Lifetime Microsoft Office 365 for The Web • W/O Mouse',
      slug: 'hp-173-laptop-computer-intel-13th-8-cores-i3-cpu-beat-11th-i5-32gb-ram-1tb-ssd-10-key-number-pad-win11-pro-lifetime-microsoft-office-365-for-the-web-wo-mouse',
      description: 'HP 17.3" laptop with Intel 13th gen 8-core i3 CPU, 32GB RAM, 1TB SSD, 10-key number pad, Windows 11 Pro, and lifetime Microsoft Office 365.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/611PHUEB-EL._AC_SX569_.jpg', alt: 'HP 17.3" Laptop Intel i3 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61+R4dRXODL._AC_SX522_.jpg', alt: 'HP 17.3" Laptop Intel i3 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81rEkvYhr3L._AC_SX522_.jpg', alt: 'HP 17.3" Laptop Intel i3 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71UghpjW5NL._AC_SX522_.jpg', alt: 'HP 17.3" Laptop Intel i3 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 36 },
      isFeatured: true,
      isTrending: false,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'intel-i3', 'large-screen', 'high-ram', 'office-365'],
      affiliateUrl: 'https://amzn.to/4owYOmp'
    },

    // Product 82 - Tapo TP-Link ColorPro Wi-Fi Outdoor Camera
    {
      _id: 'product-82',
      productNumber: 82,
      name: 'Tapo TP-Link ColorPro Wi-Fi Outdoor Camera | Plug-in | Daylight Clarity at Night | 2K QHD | Person/Pet/Vehicle Detection | Local/Cloud Storage | 127° FOV | Built-in Siren C325WB',
      slug: 'tapo-tp-link-colorpro-wi-fi-outdoor-camera-plug-in-daylight-clarity-at-night-2k-qhd-personpetvehicle-detection-localcloud-storage-127-fov-built-in-siren-c325wb',
      description: 'Tapo TP-Link ColorPro Wi-Fi outdoor camera with 2K QHD resolution, person/pet/vehicle detection, local/cloud storage, 127° FOV, and built-in siren.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61dOQyU3R1L._AC_SX522_.jpg', alt: 'Tapo TP-Link Outdoor Camera 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71TsOGnEFXL._AC_SX522_.jpg', alt: 'Tapo TP-Link Outdoor Camera 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81XCPusIWdL._AC_SL1500_.jpg', alt: 'Tapo TP-Link Outdoor Camera 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71oGqgRzo5L._AC_SX522_.jpg', alt: 'Tapo TP-Link Outdoor Camera 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14800 },
      isFeatured: true,
      isTrending: true,
      brand: 'TP-Link',
      inStock: true,
      tags: ['electronics', 'security-camera', 'tapo', 'tp-link', 'outdoor', 'wifi', '2k-qhd'],
      affiliateUrl: 'https://amzn.to/48zUiPm'
    },

    // Product 83 - Tapo by TP-Link Smart Video Doorbell Camera
    {
      _id: 'product-83',
      productNumber: 83,
      name: 'Tapo by TP-Link Smart Video Doorbell Camera Wireless with Chime, 2K with Full Color Night Vision & Spotlights, No Monthly Fee, Ring Call, 160° Ultra-Wide View, Free AI Detection, Local Storage, D210',
      slug: 'tapo-by-tp-link-smart-video-doorbell-camera-wireless-with-chime-2k-with-full-color-night-vision-spotlights-no-monthly-fee-ring-call-160-ultra-wide-view-free-ai-detection-local-storage-d210',
      description: 'Tapo by TP-Link smart video doorbell camera wireless with chime, 2K resolution, full color night vision, spotlights, no monthly fee, and 160° ultra-wide view.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61ZQ3+1WI8L._AC_SX679_.jpg', alt: 'Tapo Smart Video Doorbell 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gx-rw9EnL._AC_SX679_.jpg', alt: 'Tapo Smart Video Doorbell 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71uV1jIFBNL._AC_SX679_.jpg', alt: 'Tapo Smart Video Doorbell 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41riWs4tl9L._AC_US40_.jpg', alt: 'Tapo Smart Video Doorbell 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 3475 },
      isFeatured: true,
      isTrending: false,
      brand: 'TP-Link',
      inStock: true,
      tags: ['electronics', 'doorbell-camera', 'tapo', 'tp-link', 'wireless', '2k', 'night-vision'],
      affiliateUrl: 'https://amzn.to/3WLe0Am'
    },

    // Product 84 - MacBook Charger
    {
      _id: 'product-84',
      productNumber: 84,
      name: 'Charger for MacBook Pro 16 14 inch MacBook Air 15 13 inch 2025 2024 2023 2022 2021 2020 2019 M4 M3 M2 M1, Super Compact 100W USB C Laptop Power Adapter, 6.6FT USB-C Braided Cable, Original Quality',
      slug: 'charger-for-macbook-pro-16-14-inch-macbook-air-15-13-inch-2025-2024-2023-2022-2021-2020-2019-m4-m3-m2-m1-super-compact-100w-usb-c-laptop-power-adapter-66ft-usb-c-braided-cable-original-quality',
      description: 'Super compact 100W USB-C laptop power adapter compatible with MacBook Pro and MacBook Air models from 2019-2025, including M1, M2, M3, and M4 chips. Features 6.6FT braided cable and original quality construction.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51b+FJ+mp1L._AC_SX679_.jpg', alt: 'MacBook Charger 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71Ogj13rbPL._AC_SX679_.jpg', alt: 'MacBook Charger 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/7187UUEM+EL._AC_SX679_.jpg', alt: 'MacBook Charger 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61pGoxsmiDL._AC_SX679_.jpg', alt: 'MacBook Charger 4', isPrimary: false }
      ],
      rating: { average: 4.6, count: 162 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'charger', 'macbook', 'usb-c', 'power-adapter', 'laptop', '100w', 'braided-cable'],
      affiliateUrl: 'https://amzn.to/43lqwdC'
    },

    // Product 85 - Amazon Basics 68W GaN Charger
    {
      _id: 'product-85',
      productNumber: 85,
      name: 'Amazon Basics 68W Two-Port GaN Wall Charger with 2 USB-C Ports (60W, 18W) with PD for Laptops, Tablets & Phones (iPhone 16/15/14/13/12/11/X, iPad, MacPro, Samsung, and More), Non-PPS, Black',
      slug: 'amazon-basics-68w-two-port-gan-wall-charger-with-2-usb-c-ports-60w-18w-with-pd-for-laptops-tablets-phones-iphone-161514131211x-ipad-macpro-samsung-and-more-non-pps-black',
      description: 'Amazon Basics 68W two-port GaN wall charger featuring 2 USB-C ports with Power Delivery (PD) technology. Compatible with laptops, tablets, and phones including iPhone 16/15/14/13/12/11/X, iPad, MacBook Pro, Samsung devices, and more. Features 60W and 18W power distribution.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/416ejBlUcNS._AC_SX679_.jpg', alt: 'Amazon Basics Charger 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41VrFABTzJS._AC_SR38,50_.jpg', alt: 'Amazon Basics Charger 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/518O3kTmBIS._AC_SR38,50_.jpg', alt: 'Amazon Basics Charger 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81Zu2HjdznS._AC_SX679_.jpg', alt: 'Amazon Basics Charger 4', isPrimary: false }
      ],
      rating: { average: 4.7, count: 8300 },
      isFeatured: true,
      isTrending: true,
      brand: 'Amazon Basics',
      inStock: true,
      tags: ['electronics', 'charger', 'gan', 'usb-c', 'power-delivery', 'wall-charger', 'two-port', '68w', 'amazon-basics'],
      affiliateUrl: 'https://amzn.to/48FEOJQ'
    },

    // Product 86 - Mac AC Wall Adapter Plug Duckhead
    {
      _id: 'product-86',
      productNumber: 86,
      name: 'Mac AC Wall Adapter Plug Duckhead US Wall Charger AC Cord US Standard Duck Head for MacBook Mac iBook/iPhone/iPod Power Adapter Brick (2 PCs)',
      slug: 'mac-ac-wall-adapter-plug-duckhead-us-wall-charger-ac-cord-us-standard-duck-head-for-macbook-mac-ibookiphoneipod-power-adapter-brick-2-pcs',
      description: 'Mac AC wall adapter plug duckhead US wall charger with AC cord. US standard duck head compatible with MacBook, Mac, iBook, iPhone, and iPod power adapter bricks. Package includes 2 pieces for convenience.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51lo5Ggo0AL._AC_SL1193_.jpg', alt: 'Mac AC Adapter 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51ZwzCCIL2L._AC_SL1000_.jpg', alt: 'Mac AC Adapter 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41N3+R7SrrL._AC_.jpg', alt: 'Mac AC Adapter 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/31uid7XOcjL._AC_.jpg', alt: 'Mac AC Adapter 4', isPrimary: false }
      ],
      rating: { average: 4.6, count: 1060 },
      isFeatured: false,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'adapter', 'mac', 'macbook', 'iphone', 'ipod', 'power-adapter', 'duckhead', 'us-standard', 'ac-cord'],
      affiliateUrl: 'https://amzn.to/48EZhyd'
    },

    // Product 87 - Apple 2022 MacBook Air M2
    {
      _id: 'product-87',
      productNumber: 87,
      name: 'Apple 2022 MacBook Air Laptop with M2 chip (13.6-inch, 8GB RAM, 256GB SSD Storage) Starlight (Renewed)',
      slug: 'apple-2022-macbook-air-laptop-with-m2-chip-136-inch-8gb-ram-256gb-ssd-storage-starlight-renewed',
      description: 'Apple 2022 MacBook Air laptop featuring the powerful M2 chip, 13.6-inch Liquid Retina display, 8GB unified memory, and 256GB SSD storage. Starlight color finish. This is a renewed (refurbished) model offering excellent value with Apple quality.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61VtF5UHiFL._AC_SX522_.jpg', alt: 'MacBook Air M2 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71z+WZR6rJL._AC_SX522_.jpg', alt: 'MacBook Air M2 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51xNew+BuML._AC_SX522_.jpg', alt: 'MacBook Air M2 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71NMrbUAGZL._AC_SX522_.jpg', alt: 'MacBook Air M2 4', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71KfTkguj9L._AC_SL1500_.jpg', alt: 'MacBook Air M2 5', isPrimary: false }
      ],
      rating: { average: 4.8, count: 1894 },
      isFeatured: true,
      isTrending: true,
      brand: 'Apple',
      inStock: true,
      tags: ['electronics', 'laptop', 'macbook', 'apple', 'm2-chip', 'renewed', 'starlight', '13.6-inch', '8gb-ram', '256gb-ssd'],
      affiliateUrl: 'https://amzn.to/3Jgyii3'
    },

    // Product 88 - Coolby 15.6inch Laptop
    {
      _id: 'product-88',
      productNumber: 88,
      name: 'Coolby 15.6inch Laptop, 12GB RAM/256GB SSD, 1920x1080 IPS Display, Intel N95(Beats N5095) Quad Core Laptop Computer, Support Fingerprint, WiFi 5, BT',
      slug: 'coolby-156inch-laptop-12gb-ram256gb-ssd-1920x1080-ips-display-intel-n95beats-n5095-quad-core-laptop-computer-support-fingerprint-wifi-5-bt',
      description: 'Coolby 15.6-inch laptop featuring Intel N95 quad-core processor (beats N5095), 12GB RAM, 256GB SSD storage, 1920x1080 IPS display, fingerprint support, WiFi 5, and Bluetooth connectivity. Perfect for productivity and entertainment.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71mRF1J4y1L._AC_SL1500_.jpg', alt: 'Coolby Laptop 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71MQGHA1awL._AC_SL1500_.jpg', alt: 'Coolby Laptop 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81cvsFtNr7L._AC_SL1500_.jpg', alt: 'Coolby Laptop 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-6MucAX6L._AC_SL1500_.jpg', alt: 'Coolby Laptop 4', isPrimary: false }
      ],
      rating: { average: 4.6, count: 265 },
      isFeatured: false,
      isTrending: false,
      brand: 'Coolby',
      inStock: true,
      tags: ['electronics', 'laptop', 'coolby', 'intel-n95', '12gb-ram', '256gb-ssd', '15.6-inch', 'ips-display', 'fingerprint', 'wifi-5', 'bluetooth'],
      affiliateUrl: 'https://amzn.to/4njG4pA'
    },

    // Product 89 - AE86 15.6" Laptop
    {
      _id: 'product-89',
      productNumber: 89,
      name: 'AE86 15.6" Laptop, Celeron N4000, 12GB RAM 256GB SSD, Full HD 1080P Display, Dual-Band WiFi, Mini HDMI, Lightweight Slim Silver Notebook for Business, School, Home',
      slug: 'ae86-156-laptop-celeron-n4000-12gb-ram-256gb-ssd-full-hd-1080p-display-dual-band-wifi-mini-hdmi-lightweight-slim-silver-notebook-for-business-school-home',
      description: 'AE86 15.6-inch laptop featuring Intel Celeron N4000 processor, 12GB RAM, 256GB SSD storage, Full HD 1080P display, dual-band WiFi, mini HDMI port, and lightweight slim silver design. Perfect for business, school, and home use.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71raQ06qVsL._AC_SX522_.jpg', alt: 'AE86 Laptop 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71epdb-ft8L._AC_SX522_.jpg', alt: 'AE86 Laptop 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71ZI5bqjTiL._AC_SX522_.jpg', alt: 'AE86 Laptop 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71Vx62v7xAL._AC_SX522_.jpg', alt: 'AE86 Laptop 4', isPrimary: false }
      ],
      rating: { average: 4.7, count: 19 },
      isFeatured: false,
      isTrending: false,
      brand: 'AE86',
      inStock: true,
      tags: ['electronics', 'laptop', 'ae86', 'celeron-n4000', '12gb-ram', '256gb-ssd', '15.6-inch', 'full-hd', 'dual-band-wifi', 'mini-hdmi', 'lightweight', 'silver'],
      affiliateUrl: 'https://amzn.to/470FIPL'
    },

    // Product 90 - MacBook Air 13.6 inch Case
    {
      _id: 'product-90',
      productNumber: 90,
      name: 'Compatible for MacBook Air 13.6 inch Case M4 M3 M2 2025 2024-2022 Release Model A3240 A3113 A2681, Sturdy Protective Hard Shell Case Cover for MacBook Air M2 13 inch - Midnight Clear',
      slug: 'compatible-for-macbook-air-136-inch-case-m4-m3-m2-2025-2024-2022-release-model-a3240-a3113-a2681-sturdy-protective-hard-shell-case-cover-for-macbook-air-m2-13-inch-midnight-clear',
      description: 'Compatible protective hard shell case for MacBook Air 13.6 inch models M4, M3, M2 (2025, 2024-2022 release). Fits models A3240, A3113, A2681. Sturdy protective cover with midnight clear finish. Perfect fit and protection for your MacBook Air.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/313i4gFVHKL._AC_SL1500_.jpg', alt: 'MacBook Air Case 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71AHe9yRxCL._AC_SL1500_.jpg', alt: 'MacBook Air Case 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71HhqgrVz2L._AC_SL1500_.jpg', alt: 'MacBook Air Case 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71N1h+X26qL._AC_SL1500_.jpg', alt: 'MacBook Air Case 4', isPrimary: false }
      ],
      rating: { average: 4.8, count: 2303 },
      isFeatured: true,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'accessories', 'macbook-air', 'case', 'protective', 'hard-shell', '13.6-inch', 'm4', 'm3', 'm2', 'midnight-clear', 'a3240', 'a3113', 'a2681'],
      affiliateUrl: 'https://amzn.to/47mmhzS'
    },

    // Product 91 - SUPCASE MacBook Air 13 Inch Case
    {
      _id: 'product-91',
      productNumber: 91,
      name: 'SUPCASE for MacBook Air 13 Inch Case 2025-2022 (Unicorn Beetle), M4 A3240 / M3 A3113 / M2 A2681 Heavy Duty Rugged Shockproof Hard Shell Anti Scratch Protective Cover for MacBook Air 13.6", Black',
      slug: 'supcase-for-macbook-air-13-inch-case-2025-2022-unicorn-beetle-m4-a3240-m3-a3113-m2-a2681-heavy-duty-rugged-shockproof-hard-shell-anti-scratch-protective-cover-for-macbook-air-136-black',
      description: 'SUPCASE Unicorn Beetle heavy duty rugged shockproof hard shell case for MacBook Air 13 inch models 2025-2022. Compatible with M4 A3240, M3 A3113, M2 A2681. Anti-scratch protective cover with black finish. Maximum protection for your MacBook Air.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71VwclnB6cL._AC_SL1500_.jpg', alt: 'SUPCASE MacBook Air Case 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51LOsORhYvL._AC_SL1000_.jpg', alt: 'SUPCASE MacBook Air Case 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zvOQBjpHL._AC_SL1500_.jpg', alt: 'SUPCASE MacBook Air Case 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715RaQAUUoL._AC_SL1500_.jpg', alt: 'SUPCASE MacBook Air Case 4', isPrimary: false }
      ],
      rating: { average: 4.7, count: 687 },
      isFeatured: true,
      isTrending: true,
      brand: 'SUPCASE',
      inStock: true,
      tags: ['electronics', 'accessories', 'macbook-air', 'case', 'supcase', 'unicorn-beetle', 'heavy-duty', 'rugged', 'shockproof', 'hard-shell', 'anti-scratch', '13.6-inch', 'm4', 'm3', 'm2', 'black', 'a3240', 'a3113', 'a2681'],
      affiliateUrl: 'https://amzn.to/4n8l4ln'
    },

    // Product 92 - CISSOOK MacBook Air 13.6 Inch Astronaut Case
    {
      _id: 'product-92',
      productNumber: 92,
      name: 'CISSOOK Case Compatible with MacBook Air 13.6 Inch 2022 2024 2025 Release Model A2681 M2 A3113 M3 A3240 M4 Astronaut, Clear Black Space Hard Shell with Keyboard Cover for MacBook Air 13.6", Astronaut',
      slug: 'cissook-case-compatible-with-macbook-air-136-inch-2022-2024-2025-release-model-a2681-m2-a3113-m3-a3240-m4-astronaut-clear-black-space-hard-shell-with-keyboard-cover-for-macbook-air-136-astronaut',
      description: 'CISSOOK Astronaut case for MacBook Air 13.6 inch models 2022-2025. Compatible with A2681 M2, A3113 M3, A3240 M4. Clear black space hard shell with keyboard cover. Unique astronaut design with space theme. Perfect protection and style for your MacBook Air.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/712J23NQopL._AC_SL1200_.jpg', alt: 'CISSOOK Astronaut Case 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41iX4sB8HtL._AC_SR38,50_.jpg', alt: 'CISSOOK Astronaut Case 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/6188i4sgR4L._AC_SX679_.jpg', alt: 'CISSOOK Astronaut Case 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61j+0ijvRRL._AC_SX679_.jpg', alt: 'CISSOOK Astronaut Case 4', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51-GkUbnbsL._AC_SR38,50_.jpg', alt: 'CISSOOK Astronaut Case 5', isPrimary: false }
      ],
      rating: { average: 4.8, count: 1386 },
      isFeatured: true,
      isTrending: true,
      brand: 'CISSOOK',
      inStock: true,
      tags: ['electronics', 'accessories', 'macbook-air', 'case', 'cissook', 'astronaut', 'clear-black', 'space', 'hard-shell', 'keyboard-cover', '13.6-inch', 'm4', 'm3', 'm2', 'a2681', 'a3113', 'a3240'],
      affiliateUrl: 'https://amzn.to/47iM2kq'
    },

    // Product 93 - MacBook Air 13.6 inch Case (Generic)
    {
      _id: 'product-93',
      productNumber: 93,
      name: 'Compatible for MacBook Air 13.6 inch Case M4 M3 M2 2025 2024-2022 Release Model A3240 A3113 A2681, Sturdy Protective Hard Shell Case Cover for MacBook Air M2 13 inch',
      slug: 'compatible-for-macbook-air-136-inch-case-m4-m3-m2-2025-2024-2022-release-model-a3240-a3113-a2681-sturdy-protective-hard-shell-case-cover-for-macbook-air-m2-13-inch',
      description: 'Compatible protective hard shell case for MacBook Air 13.6 inch models M4, M3, M2 (2025, 2024-2022 release). Fits models A3240, A3113, A2681. Sturdy protective cover with precise fit. Perfect protection for your MacBook Air.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71oyW+CsL7L._AC_SL1500_.jpg', alt: 'MacBook Air Case Generic 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/31zofVBhIRL._AC_SL1000_.jpg', alt: 'MacBook Air Case Generic 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81ADvqLAsBL._AC_SL1500_.jpg', alt: 'MacBook Air Case Generic 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71z9WfVJBqL._AC_SL1500_.jpg', alt: 'MacBook Air Case Generic 4', isPrimary: false }
      ],
      rating: { average: 4.9, count: 2050 },
      isFeatured: true,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'accessories', 'macbook-air', 'case', 'protective', 'hard-shell', '13.6-inch', 'm4', 'm3', 'm2', 'a3240', 'a3113', 'a2681', 'sturdy'],
      affiliateUrl: 'https://amzn.to/42Ox6t5'
    },

    // Product 94 - F FORITO Magnetic Privacy Screen Protector
    {
      _id: 'product-94',
      productNumber: 94,
      name: 'F FORITO Magnetic Privacy Screen Protector Compatible with MacBook Air 13.6 inch (2022-2025, M2, M3, M4), 360° Anti Peeping Removable Anti Blue Light Anti Glare Laptop Privacy Screen Shield',
      slug: 'f-forito-magnetic-privacy-screen-protector-compatible-with-macbook-air-136-inch-2022-2025-m2-m3-m4-360-anti-peeping-removable-anti-blue-light-anti-glare-laptop-privacy-screen-shield',
      description: 'F FORITO magnetic privacy screen protector for MacBook Air 13.6 inch models 2022-2025 (M2, M3, M4). Features 360° anti-peeping protection, removable magnetic design, anti-blue light, and anti-glare properties. Perfect privacy shield for your laptop.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/711kTPl007L._AC_SL1500_.jpg', alt: 'F FORITO Privacy Screen 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71SY76-fORL._AC_SL1500_.jpg', alt: 'F FORITO Privacy Screen 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yyezJq0ZL._AC_SL1500_.jpg', alt: 'F FORITO Privacy Screen 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71sFj5Gv1JL._AC_SL1500_.jpg', alt: 'F FORITO Privacy Screen 4', isPrimary: false }
      ],
      rating: { average: 4.6, count: 199 },
      isFeatured: false,
      isTrending: false,
      brand: 'F FORITO',
      inStock: true,
      tags: ['electronics', 'accessories', 'macbook-air', 'privacy-screen', 'magnetic', 'anti-peeping', 'anti-blue-light', 'anti-glare', '13.6-inch', 'm2', 'm3', 'm4', 'removable', '360-degree'],
      affiliateUrl: 'https://amzn.to/43bR5lJ'
    },

    // Product - BOSTANTEN Women's Leather Designer Handbags
    {
      _id: 'product-bostanten-handbag',
      slug: 'bostanten-womens-leather-designer-handbags-tote-purses-shoulder-bucket-bags-v2',
      
      productNumber: 50,
      name: 'BOSTANTEN Women\'s Leather Designer Handbags Tote Purses Shoulder Bucket Bags',
      description: 'Elegant leather designer handbag with tote and shoulder options. Perfect for professional and casual occasions.',
      price: 0,
      originalPrice: 0,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71HRnouDK-L._AC_SX679_.jpg', alt: 'BOSTANTEN Handbag 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/615dwrZehiL._AC_SX679_.jpg', alt: 'BOSTANTEN Handbag 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zM-TKfMaL._AC_SX679_.jpg', alt: 'BOSTANTEN Handbag 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61Y0UrLwWQL._AC_SX679_.jpg', alt: 'BOSTANTEN Handbag 4', isPrimary: false }
      ],
      rating: { average: 4.6, count: 8700 },
      isFeatured: true,
      isTrending: true,
      brand: 'BOSTANTEN',
      inStock: true,
      tags: ['fashion', 'handbag', 'leather', 'designer', 'tote', 'shoulder', 'women', 'purse', 'bucket-bag', 'professional', 'casual'],
      affiliateUrl: 'https://amzn.to/3WVw9LT'
    },

    // Product 1 - HP 14 Laptop
    {
      _id: 'product-hp-14-laptop',
      productNumber: 1,
      name: 'HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 11 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0040nr, Snowflake White)',
      slug: 'hp-14-laptop-intel-celeron-n4020-4-gb-ram-64-gb-storage-14-inch-micro-edge-hd-display-windows-11-home-thin-portable-4k-graphics-one-year-of-microsoft-365-14-dq0040nr-snowflake-white',
      description: 'Thin and portable HP 14 laptop with Intel Celeron N4020 processor, 4GB RAM, 64GB storage, and Windows 11 Home. Features 14-inch Micro-edge HD display and includes one year of Microsoft 365.',
      price: 171,
      originalPrice: 171,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41iUBrIDcDS._AC_US40_.jpg', alt: 'HP 14 Laptop Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41wHfNF0gzL._AC_US40_.jpg', alt: 'HP 14 Laptop Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41AhlS+8tfS._AC_US40_.jpg', alt: 'HP 14 Laptop Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81wQmKSkWVS._AC_SL1500_.jpg', alt: 'HP 14 Laptop Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4345 },
      isFeatured: true,
      isTrending: false,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'windows', 'portable', 'business'],
      affiliateUrl: 'https://amzn.to/4oh0f8P'
    },

    // Product 2 - Lenovo V15 Gen 4 Business Laptop
    {
      _id: 'product-lenovo-v15-gen4',
      productNumber: 2,
      name: 'Lenovo V15 Gen 4 Business Laptop, 15.6" FHD Display, Intel Core i5-13420H (Beat i7-1355U), HDMI, RJ45, Webcam, Numeric Keypad, Wi-Fi, Windows 11 Pro, Black (16GB RAM | 512GB SSD)',
      slug: 'lenovo-v15-gen-4-business-laptop-156-fhd-display-intel-core-i5-13420h-beat-i7-1355u-hdmi-rj45-webcam-numeric-keypad-wi-fi-windows-11-pro-black-16gb-ram-512gb-ssd',
      description: 'Professional business laptop with Intel Core i5-13420H processor, 16GB RAM, 512GB SSD, 15.6" FHD display, and Windows 11 Pro. Features HDMI, RJ45, webcam, and numeric keypad.',
      price: 529,
      originalPrice: 529,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71N9tTF6pML._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61qJN6Yn8qL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61+o7g9qZBL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71FUdhdOSLL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 96 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'intel', 'windows-pro'],
      affiliateUrl: 'https://amzn.to/47a7uJC'
    },

    // Product 3 - Lenovo V-Series V15 Business Laptop
    {
      _id: 'product-lenovo-v15-amd',
      productNumber: 3,
      name: 'Lenovo V-Series V15 Business Laptop, 15.6" FHD Display, AMD Ryzen 7 7730U, 40GB RAM, 2TB SSD, Numeric Keypad, HDMI, RJ45, Webcam, Wi-Fi, Windows 11 Pro, Black',
      slug: 'lenovo-v-series-v15-business-laptop-156-fhd-display-amd-ryzen-7-7730u-40gb-ram-2tb-ssd-numeric-keypad-hdmi-rj45-webcam-wi-fi-windows-11-pro-black',
      description: 'High-performance business laptop with AMD Ryzen 7 7730U processor, 40GB RAM, 2TB SSD, 15.6" FHD display, and Windows 11 Pro. Perfect for demanding business applications.',
      price: 648,
      originalPrice: 648,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71TN6dLVcsL._AC_SL1500_.jpg', alt: 'Lenovo V15 AMD Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71KQXadhfOL._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41fT-gINjKL._AC_.jpg', alt: 'Lenovo V15 AMD Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61z6GKwnq2L._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 457 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'amd', 'ryzen', 'high-performance'],
      affiliateUrl: 'https://amzn.to/3Jp5zaV'
    },

    // Product 4 - Lenovo IdeaPad 5X 2-in-1
    {
      _id: 'product-lenovo-ideapad-5x',
      productNumber: 4,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 821,
      originalPrice: 821,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71UmMRFj6aL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81e+sK+U7UL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 32 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/3WjomHN'
    },

    // Product 5 - Lenovo LOQ 15 Gaming Laptop
    {
      _id: 'product-lenovo-loq-15',
      productNumber: 5,
      name: 'Lenovo LOQ 15" - NVIDIA GeForce RTX 5050 Graphics - 15.6" IPS LCD FHD 144hz Display - Intel Core i7-13650HX - 24GB DDR5-1 TB SSD - Windows 11 Home - Luna Grey',
      slug: 'lenovo-loq-15-nvidia-geforce-rtx-5050-graphics-156-ips-lcd-fhd-144hz-display-intel-core-i7-13650hx-24gb-ddr5-1-tb-ssd-windows-11-home-luna-grey',
      description: 'Gaming laptop with NVIDIA GeForce RTX 5050 graphics, Intel Core i7-13650HX processor, 24GB DDR5 RAM, 1TB SSD, and 15.6" IPS LCD FHD 144Hz display for smooth gaming.',
      price: 1166,
      originalPrice: 1166,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81Dn-XD8GsL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71jH93E4dxL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71MgOGFKAGL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51nqcwm8I9L._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 36 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'gaming', 'nvidia', 'rtx', 'intel', 'high-performance'],
      affiliateUrl: 'https://amzn.to/4o40949'
    },

    // Product 6 - LG gram Pro 17-inch
    {
      _id: 'product-lg-gram-pro-17',
      productNumber: 6,
      name: 'LG gram Pro 17-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra9 285H Processor, NVIDIA RTX5050, Windows 11 Home, 32GB RAM, 2TB SSD, Black',
      slug: 'lg-gram-pro-17-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra9-285h-processor-nvidia-rtx5050-windows-11-home-32gb-ram-2tb-ssd-black',
      description: 'Ultra-lightweight 17-inch laptop with Intel Core Ultra9 285H processor, NVIDIA RTX5050 graphics, 32GB RAM, 2TB SSD, and Windows 11 Home. Perfect for professionals on the go.',
      price: 2749,
      originalPrice: 2749,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/617zFnvYNlL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/711pbDS5ZNL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71rV1HbvkFL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/711QUUUMl6L._AC_SX679_.jpg', alt: 'LG gram Pro 17 Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 8 },
      isFeatured: true,
      isTrending: false,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'ultra-lightweight', 'intel-evo', 'professional'],
      affiliateUrl: 'https://amzn.to/4nm66bO'
    },

    // Product 7 - LG gram Pro 16-inch
    {
      _id: 'product-lg-gram-pro-16',
      productNumber: 7,
      name: 'LG gram Pro 16-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra7 258V Processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD - Metal Gray',
      slug: 'lg-gram-pro-16-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra7-258v-processor-copilot-windows-11-home-32gb-ram-2tb-ssd-metal-gray',
      description: 'Lightweight 16-inch laptop with Intel Core Ultra7 258V processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD. Features AI-powered productivity and ultra-portable design.',
      price: 1899,
      originalPrice: 1899,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71gIsZX3hgL._AC_SL1500_.jpg', alt: 'LG gram Pro 16 Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/617DY34HlmL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51VOD-fpeTL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71ZxlCD+VCL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Display', isPrimary: false }
      ],
      rating: { average: 4.9, count: 11 },
      isFeatured: false,
      isTrending: true,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'lightweight', 'intel-evo', 'copilot', 'ai'],
      affiliateUrl: 'https://amzn.to/3JpwHqm'
    },

    // Product 8 - Lenovo IdeaPad 5X 2-in-1 (Duplicate with different price)
    {
      _id: 'product-lenovo-ideapad-5x-alt',
      productNumber: 8,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray-v2',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 821,
      originalPrice: 821,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41JdHKLzyYL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51i6xIBYPGL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 821 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/4hnxVii'
    },

    // Product 9 - Bicycle Pump with Gauge
    {
      _id: 'product-bicycle-pump',
      productNumber: 9,
      name: 'Bicycle Pump with Gauge, 3X Faster & Auto Stop & Brushless Motor, Electric Bike Tire Pump with Presta and Schrader Valve for Road Bike, MTB, Motorcycle, Ball,etc',
      slug: 'bicycle-pump-with-gauge-3x-faster-auto-stop-brushless-motor-electric-bike-tire-pump-with-presta-and-schrader-valve-for-road-bike-mtb-motorcycle-balletc',
      description: 'Electric bicycle pump with gauge, 3X faster pumping, auto-stop feature, and brushless motor. Compatible with Presta and Schrader valves for bikes, motorcycles, and balls.',
      price: 49,
      originalPrice: 49,
      category: 'sports',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71xuypbqHRL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Bicycle Pump Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/91TYUM89NuL._AC_SX679_.jpg', alt: 'Bicycle Pump Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/517IrjVMHZL._AC_US100_.jpg', alt: 'Bicycle Pump Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71S8sWIJXxL._AC_SX679_.jpg', alt: 'Bicycle Pump Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 662 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['sports', 'bicycle', 'pump', 'electric', 'gauge', 'auto-stop'],
      affiliateUrl: 'https://amzn.to/4niaus3'
    },

    // Product 10 - VOCH GALA Nipple Covers
    {
      _id: 'product-voch-gala-nipple-covers',
      productNumber: 10,
      name: 'VOCH GALA Nipple Covers 2 Pairs-Seamless and Sheer Adhesive Silicone Nipple Pasties for Women Reusable, Sticky Breast Petals',
      slug: 'voch-gala-nipple-covers-2-pairs-seamless-and-sheer-adhesive-silicone-nipple-pasties-for-women-reusable-sticky-breast-petals',
      description: 'Seamless and sheer adhesive silicone nipple covers for women. Reusable and sticky breast petals that provide comfort and coverage.',
      price: 18.26,
      originalPrice: 18.26,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Package', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4708 },
      isFeatured: false,
      isTrending: false,
      brand: 'VOCH GALA',
      inStock: true,
      tags: ['fashion', 'women', 'underwear', 'silicone', 'adhesive', 'reusable'],
      affiliateUrl: 'https://amzn.to/47hJsg1'
    },

    // Product 11 - Popular Girls Padded Training Bra
    {
      _id: 'product-girls-training-bra-padded',
      productNumber: 11,
      name: 'Popular Girls Padded Training Bra Pack – Crop Cami Training Bras for Girls. Seamless Bra Design with Removable Padding',
      slug: 'popular-girls-padded-training-bra-pack-crop-cami-training-bras-for-girls-seamless-bra-design-with-removable-padding',
      description: 'Training bra pack for girls with seamless design and removable padding. Crop cami style training bras perfect for young girls.',
      price: 26.99,
      originalPrice: 26.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81Kh0vW6QqL._AC_SX679_.jpg', alt: 'Girls Training Bra Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41gK0fXglJL._AC_SX679_.jpg', alt: 'Girls Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41s3h2zSsKL._AC_SX679_.jpg', alt: 'Girls Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51BWs5C9BsL._AC_SX679_.jpg', alt: 'Girls Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 4306 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'padded', 'seamless', 'removable-padding'],
      affiliateUrl: 'https://amzn.to/3Jbj26h'
    },

    // Product 12 - Popular Cotton Girls Training Bra
    {
      _id: 'product-girls-cotton-training-bra',
      productNumber: 12,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.99,
      originalPrice: 16.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41Vzw56F4SL._AC_SX679_.jpg', alt: 'Cotton Training Bra Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61XCDkGktdL._AC_SX679_.jpg', alt: 'Cotton Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41czkCjmd0L._AC_SX679_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14889 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/47nP1s2'
    },

    // Product 13 - Hilarious Jokes For 8 Year Old Kids
    {
      _id: 'product-hilarious-jokes-book',
      productNumber: 13,
      name: 'Hilarious Jokes For 8 Year Old Kids: An Awesome LOL Gag Book For Young Boys and Girls Filled With Tons of Tongue Twisters, Rib Ticklers, Side Splitters, and Knock Knocks',
      slug: 'hilarious-jokes-for-8-year-old-kids-an-awesome-lol-gag-book-for-young-boys-and-girls-filled-with-tons-of-tongue-twisters-rib-ticklers-side-splitters-and-knock-knocks',
      description: 'Fun joke book for 8-year-old kids filled with hilarious jokes, tongue twisters, rib ticklers, side splitters, and knock-knock jokes. Perfect for young boys and girls.',
      price: 9.99,
      originalPrice: 9.99,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71aoNAbO9SL._SL1499_.jpg', alt: 'Jokes Book Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61VIlVlVaRL.jpg', alt: 'Jokes Book Pages', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2867 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['books', 'children', 'jokes', 'humor', 'tongue-twisters', 'knock-knock'],
      affiliateUrl: 'https://amzn.to/4nhEJ2p'
    },

    // Product 14 - Popular Girl's Bandeau Bra
    {
      _id: 'product-girls-bandeau-bra',
      slug: 'girls-bandeau-bra',
      
      productNumber: 14,
      name: 'Popular Girl\'s Bandeau Bra with Removable Padding - Strapless Tube Bra for Girls and Teens, Seamless',
      description: 'Strapless tube bra for girls and teens with removable padding. Seamless design provides comfort and support for young girls.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81XmFVfF69L._AC_SY879_.jpg', alt: 'Bandeau Bra Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81XuvePYEFL._AC_SX679_.jpg', alt: 'Bandeau Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81VWc3DgAPL._AC_SX679_.jpg', alt: 'Bandeau Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81cbJ-izFTL._AC_SX679_.jpg', alt: 'Bandeau Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 1181 },
      isFeatured: false,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'bandeau-bra', 'strapless', 'removable-padding', 'seamless'],
      affiliateUrl: 'https://amzn.to/4hmNg2E'
    },

    // Product 15 - Popular Cotton Girls Training Bra (Alternative)
    {
      _id: 'product-girls-cotton-training-bra-alt',
      productNumber: 15,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack-v2',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.98,
      originalPrice: 16.98,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/811oWE2zJRL._AC_SX679_.jpg', alt: 'Cotton Training Bra Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SX679_.jpg', alt: 'Cotton Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/411q6dElS4L._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51Em+bZnZcL._AC_SX679_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14832 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/4npeBCF'
    },

    // Product 16 - Popular Womens Bike Shorts
    {
      _id: 'product-womens-bike-shorts',
      productNumber: 16,
      name: 'Popular Womens Bike Shorts Plus Size - Cotton Biker Bottoms. Bermuda Long Shorts for Women. Great Gym, Workout & Yoga',
      slug: 'popular-womens-bike-shorts-plus-size-cotton-biker-bottoms-bermuda-long-shorts-for-women-great-gym-workout-yoga',
      description: 'Plus size bike shorts for women made from cotton. Bermuda long shorts perfect for gym, workout, and yoga activities.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61z+raI3QTL._AC_SX679_.jpg', alt: 'Bike Shorts Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/51ne9LWOKeL._AC_SX679_.jpg', alt: 'Bike Shorts Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61yL2OzBbDL._AC_SX679_.jpg', alt: 'Bike Shorts Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2144 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'women', 'bike-shorts', 'plus-size', 'cotton', 'workout', 'yoga'],
      affiliateUrl: 'https://amzn.to/48H5TfB'
    },

    // Product 17 - Mouse Jiggler Mover
    {
      _id: 'product-mouse-jiggler',
      productNumber: 17,
      name: 'Mouse Jiggler Mover Wiggler Undetectable Shaker USB Port for Computer Laptop, Keeps PC Awake, Simulate Movement to Prevent Laptop Entering Sleep, No Software Plug-and-Play',
      slug: 'mouse-jiggler-mover-wiggler-undetectable-shaker-usb-port-for-computer-laptop-keeps-pc-awake-simulate-movement-to-prevent-laptop-entering-sleep-no-software-plug-and-play',
      description: 'USB mouse jiggler that keeps your computer awake by simulating mouse movement. Undetectable shaker prevents laptop from entering sleep mode. No software required, plug-and-play.',
      price: 6.99,
      originalPrice: 6.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61AUhToZptL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61OWkA9Wl9L._AC_SL1500_.jpg', alt: 'Mouse Jiggler Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71U+2I8UDCL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71I5iqYbwfL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 5269 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'computer', 'mouse-jiggler', 'usb', 'plug-and-play', 'productivity'],
      affiliateUrl: 'https://amzn.to/4qssfb8'
    },

    // Product 18 - LISEN Retractable Car Charger
    {
      _id: 'product-lisen-car-charger',
      productNumber: 18,
      name: 'LISEN Retractable Car Charger, 69W Cars Adapter USB C Fast Charger, Car Accessories for Women Men, Christmas for Gifts for Dad Mom, Gifts for Women Men, for iPhone 17 Pro Max Air 16 15 14 13 Plus',
      slug: 'lisen-retractable-car-charger-69w-cars-adapter-usb-c-fast-charger-car-accessories-for-women-men-christmas-for-gifts-for-dad-mom-gifts-for-women-men-for-iphone-17-pro-max-air-16-15-14-13-plus',
      description: '69W retractable car charger with USB-C fast charging. Compatible with iPhone 17 Pro Max, Air, 16, 15, 14, 13 Plus. Perfect gift for men and women.',
      price: 16.99,
      originalPrice: 29.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71Ryl5xKbuL._AC_SL1500_.jpg', alt: 'Car Charger Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61TNXDLQlqL._AC_SL1500_.jpg', alt: 'Car Charger Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/713wm1uB5nL._AC_SL1500_.jpg', alt: 'Car Charger Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zNi1-2V0L._AC_SL1500_.jpg', alt: 'Car Charger Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 12113 },
      isFeatured: true,
      isTrending: false,
      brand: 'LISEN',
      inStock: true,
      tags: ['electronics', 'car-charger', 'usb-c', 'fast-charging', 'retractable', 'gift'],
      affiliateUrl: 'https://amzn.to/4no9N0G'
    },

    // Product 19 - The Very Hungry Caterpillar
    {
      _id: 'product-very-hungry-caterpillar',
      productNumber: 19,
      name: 'The Very Hungry Caterpillar',
      slug: 'the-very-hungry-caterpillar',
      description: 'Classic children\'s book "The Very Hungry Caterpillar" by Eric Carle. A beloved story about a caterpillar\'s transformation into a beautiful butterfly.',
      price: 4.61,
      originalPrice: 4.61,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SX445_.jpg', alt: 'Very Hungry Caterpillar Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SL1500_.jpg', alt: 'Very Hungry Caterpillar Pages', isPrimary: false }
      ],
      rating: { average: 4.9, count: 77761 },
      isFeatured: true,
      isTrending: false,
      brand: 'Eric Carle',
      inStock: true,
      tags: ['books', 'children', 'classic', 'picture-book', 'caterpillar', 'butterfly'],
      affiliateUrl: 'https://amzn.to/47Ga3TR'
    },

    // Product 20 - Chicka Chicka Boom Boom
    {
      _id: 'product-chicka-chicka-boom-boom',
      productNumber: 20,
      name: 'Chicka Chicka Boom Boom (Board Book)',
      slug: 'chicka-chicka-boom-boom-board-book',
      description: 'Classic children\'s book "Chicka Chicka Boom Boom" in board book format. A fun alphabet story that teaches letters through rhythm and rhyme.',
      price: 4.17,
      originalPrice: 8.00,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71gilMPLAHL._SY522_.jpg', alt: 'Chicka Chicka Boom Boom Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gZVUYGHdL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61G30iYlguL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61rHuppIU3L._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 40937 },
      isFeatured: false,
      isTrending: true,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'alphabet', 'board-book', 'rhythm', 'rhyme'],
      affiliateUrl: 'https://amzn.to/49ib2L9'
    },

    // Product 21 - Brown Bear, Brown Bear, What Do You See?
    {
      _id: 'product-brown-bear-brown-bear',
      productNumber: 21,
      name: 'Brown Bear, Brown Bear, What Do You See?',
      slug: 'brown-bear-brown-bear-what-do-you-see',
      description: 'Classic children\'s book "Brown Bear, Brown Bear, What Do You See?" by Bill Martin Jr. and Eric Carle. A beloved story that teaches colors and animals.',
      price: 4.82,
      originalPrice: 9.64,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81kZ3Gl3WKL._SL1500_.jpg', alt: 'Brown Bear Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Aot5wdfML._SL1500_.jpg', alt: 'Brown Bear Pages', isPrimary: false }
      ],
      rating: { average: 4.9, count: 55224 },
      isFeatured: true,
      isTrending: false,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'colors', 'animals', 'classic', 'picture-book'],
      affiliateUrl: 'https://amzn.to/49hYLX8'
    },

    // Product 22 - I Love You to the Moon and Back
    {
      _id: 'product-love-you-moon-back',
      productNumber: 22,
      name: 'I Love You to the Moon and Back',
      slug: 'i-love-you-to-the-moon-and-back',
      description: 'Heartwarming children\'s book "I Love You to the Moon and Back" that expresses the depth of a parent\'s love for their child. A perfect bedtime story.',
      price: 3.97,
      originalPrice: 7.94,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81D8qaGlTVL._SL1500_.jpg', alt: 'Love You Moon Back Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71rkrN8ulXL._SL1500_.jpg', alt: 'Love You Moon Back Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/818QZeo8s+L._SL1500_.jpg', alt: 'Love You Moon Back Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/9168cMVcNBL._SL1500_.jpg', alt: 'Love You Moon Back Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 79128 },
      isFeatured: false,
      isTrending: true,
      brand: 'Amelia Hepworth',
      inStock: true,
      tags: ['books', 'children', 'love', 'bedtime-story', 'parent-child', 'heartwarming'],
      affiliateUrl: 'https://amzn.to/493Lx0n'
    },

    // Product 23 - The Going To Bed Book
    {
      _id: 'product-going-to-bed-book',
      productNumber: 23,
      name: 'The Going To Bed Book',
      slug: 'the-going-to-bed-book',
      description: 'Classic bedtime book "The Going To Bed Book" by Sandra Boynton. A gentle story that helps children wind down and prepare for sleep.',
      price: 3.86,
      originalPrice: 7.72,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71FVbHHW+AL._SL1400_.jpg', alt: 'Going To Bed Book Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71yRyF+25LL._SL1400_.jpg', alt: 'Going To Bed Book Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71L7jgM-CFL._SL1500_.jpg', alt: 'Going To Bed Book Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715f0EUccwL._SL1400_.jpg', alt: 'Going To Bed Book Back', isPrimary: false }
      ],
      rating: { average: 4.7, count: 19233 },
      isFeatured: false,
      isTrending: false,
      brand: 'Sandra Boynton',
      inStock: true,
      tags: ['books', 'children', 'bedtime', 'sleep', 'gentle', 'wind-down'],
      affiliateUrl: 'https://amzn.to/47GFjSE'
    },

    // Product 24 - 16 inch Screen Magnifier
    {
      _id: 'product-screen-magnifier',
      productNumber: 24,
      name: '16 inch Screen Magnifier for Cell Phone 3D Magnifier Screen Enlarger for Movies,Videos,Reading,Gaming-Screen Amplifie with Foldable Phone Stand Holder. Compatible with All Smartphones-White',
      slug: '16-inch-screen-magnifier-for-cell-phone-3d-magnifier-screen-enlarger-for-moviesvideosreadinggaming-screen-amplifie-with-foldable-phone-stand-holder-compatible-with-all-smartphones-white',
      description: '16-inch screen magnifier for cell phones with 3D magnifier screen enlarger. Perfect for movies, videos, reading, and gaming. Includes foldable phone stand holder, compatible with all smartphones.',
      price: 23.20,
      originalPrice: 23.20,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71LK-Fd3t6L._AC_SX679_.jpg', alt: 'Screen Magnifier Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/714SzEeeoLL._AC_SL1500_.jpg', alt: 'Screen Magnifier Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71SPpqk+Q7L._AC_SL1500_.jpg', alt: 'Screen Magnifier Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71t5PNrKbKL._AC_SL1500_.jpg', alt: 'Screen Magnifier Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 577 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'screen-magnifier', 'phone-accessory', '3d', 'foldable', 'stand'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 25 - Bitzee Interactive Toy
    {
      _id: 'product-bitzee-interactive-toy',
      productNumber: 25,
      name: 'Bitzee, Interactive Toy Digital Pet with 15 Animals Inside, Virtual Electronic Pets React to Touch, Kids Toys for Girls and Boys',
      slug: 'bitzee-interactive-toy-digital-pet-with-15-animals-inside-virtual-electronic-pets-react-to-touch-kids-toys-for-girls-and-boys',
      description: 'Interactive digital pet toy with 15 different animals inside. Virtual electronic pets that react to touch. Perfect toy for girls and boys.',
      price: 36.99,
      originalPrice: 36.99,
      category: 'toys',
      images: [
        { url: 'https://m.media-amazon.com/images/I/716BajcQptL._AC_SL1500_.jpg', alt: 'Bitzee Toy Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81t89hgKo6L._AC_SL1500_.jpg', alt: 'Bitzee Toy Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81gpb4CEjBL._AC_SL1500_.jpg', alt: 'Bitzee Toy Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81q8fU6oQgL._AC_SL1500_.jpg', alt: 'Bitzee Toy Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 8117 },
      isFeatured: true,
      isTrending: false,
      brand: 'Bitzee',
      inStock: true,
      tags: ['toys', 'interactive', 'digital-pet', 'electronic', 'touch-reactive', 'children'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 26 - JBL Clip 4 Bluetooth Speaker
    {
      _id: 'product-jbl-clip-4-speaker',
      productNumber: 26,
      name: 'JBL Clip 4 - Portable Mini Bluetooth Speaker, big audio and punchy bass, integrated carabiner, IP67 waterproof and dustproof, 10 hours of playtime, speaker for home, outdoor and travel (Black)',
      slug: 'jbl-clip-4-portable-mini-bluetooth-speaker-big-audio-and-punchy-bass-integrated-carabiner-ip67-waterproof-and-dustproof-10-hours-of-playtime-speaker-for-home-outdoor-and-travel-black',
      description: 'Portable mini Bluetooth speaker with big audio and punchy bass. Features integrated carabiner, IP67 waterproof and dustproof rating, 10 hours of playtime. Perfect for home, outdoor, and travel.',
      price: 46.95,
      originalPrice: 46.95,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/712bkrVtjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71AC7CR3MDL._AC_SL1200_.jpg', alt: 'JBL Clip 4 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/710tqtuNjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81y2odwsmSL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 34039 },
      isFeatured: true,
      isTrending: false,
      brand: 'JBL',
      inStock: true,
      tags: ['electronics', 'bluetooth-speaker', 'portable', 'waterproof', 'carabiner', 'travel'],
      affiliateUrl: 'https://amzn.to/42URtEV'
    },

    // Product 27 - Samsung Galaxy Watch Ultra
    {
      _id: 'product-samsung-galaxy-watch-ultra',
      productNumber: 27,
      name: 'Samsung Galaxy Watch Ultra (2024) 47mm LTE AI Smartwatch w/Energy Score, Wellness Tips, Heart Rate Tracking, Sleep Monitor, Fitness Tracker, GPS,Titanium Silver [US Version, 1Yr Manufacturer Warranty]',
      slug: 'samsung-galaxy-watch-ultra-2024-47mm-lte-ai-smartwatch-wenergy-score-wellness-tips-heart-rate-tracking-sleep-monitor-fitness-tracker-gpstitanium-silver-us-version-1yr-manufacturer-warranty',
      description: 'Samsung Galaxy Watch Ultra 47mm LTE AI smartwatch with energy score, wellness tips, heart rate tracking, sleep monitoring, fitness tracking, and GPS. Titanium silver with 1-year manufacturer warranty.',
      price: 449,
      originalPrice: 449,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/817QHxxq34L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71LYrwpBxPL._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61WGpLzX--L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 817 },
      isFeatured: true,
      isTrending: false,
      brand: 'Samsung',
      inStock: true,
      tags: ['electronics', 'smartwatch', 'samsung', 'galaxy-watch', 'fitness-tracker', 'gps', 'lte'],
      affiliateUrl: 'https://amzn.to/4qrVRFw'
    },

    // Product 1 Copy 1 - HP 14 Laptop (Image 2 as primary)
    {
      _id: 'product-hp-14-laptop-copy1',
      productNumber: 1,
      name: 'HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 11 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0040nr, Snowflake White)',
      slug: 'hp-14-laptop-intel-celeron-n4020-4-gb-ram-64-gb-storage-14-inch-micro-edge-hd-display-windows-11-home-thin-portable-4k-graphics-one-year-of-microsoft-365-14-dq0040nr-snowflake-white-v2',
      description: 'Thin and portable HP 14 laptop with Intel Celeron N4020 processor, 4GB RAM, 64GB storage, and Windows 11 Home. Features 14-inch Micro-edge HD display and includes one year of Microsoft 365.',
      price: 171,
      originalPrice: 171,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41wHfNF0gzL._AC_US40_.jpg', alt: 'HP 14 Laptop Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41iUBrIDcDS._AC_US40_.jpg', alt: 'HP 14 Laptop Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41AhlS+8tfS._AC_US40_.jpg', alt: 'HP 14 Laptop Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81wQmKSkWVS._AC_SL1500_.jpg', alt: 'HP 14 Laptop Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4345 },
      isFeatured: false,
      isTrending: true,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'windows', 'portable', 'business'],
      affiliateUrl: 'https://amzn.to/4oh0f8P'
    },

    // Product 1 Copy 2 - HP 14 Laptop (Image 3 as primary)
    {
      _id: 'product-hp-14-laptop-copy2',
      productNumber: 1,
      name: 'HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 11 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0040nr, Snowflake White)',
      slug: 'hp-14-laptop-intel-celeron-n4020-4-gb-ram-64-gb-storage-14-inch-micro-edge-hd-display-windows-11-home-thin-portable-4k-graphics-one-year-of-microsoft-365-14-dq0040nr-snowflake-white-v3',
      description: 'Thin and portable HP 14 laptop with Intel Celeron N4020 processor, 4GB RAM, 64GB storage, and Windows 11 Home. Features 14-inch Micro-edge HD display and includes one year of Microsoft 365.',
      price: 171,
      originalPrice: 171,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41AhlS+8tfS._AC_US40_.jpg', alt: 'HP 14 Laptop Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41iUBrIDcDS._AC_US40_.jpg', alt: 'HP 14 Laptop Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41wHfNF0gzL._AC_US40_.jpg', alt: 'HP 14 Laptop Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81wQmKSkWVS._AC_SL1500_.jpg', alt: 'HP 14 Laptop Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4345 },
      isFeatured: true,
      isTrending: false,
      brand: 'HP',
      inStock: true,
      tags: ['electronics', 'laptop', 'hp', 'windows', 'portable', 'business'],
      affiliateUrl: 'https://amzn.to/4oh0f8P'
    },

    // Product 2 Copy 1 - Lenovo V15 Gen 4 (Image 2 as primary)
    {
      _id: 'product-lenovo-v15-gen4-copy1',
      productNumber: 2,
      name: 'Lenovo V15 Gen 4 Business Laptop, 15.6" FHD Display, Intel Core i5-13420H (Beat i7-1355U), HDMI, RJ45, Webcam, Numeric Keypad, Wi-Fi, Windows 11 Pro, Black (16GB RAM | 512GB SSD)',
      slug: 'lenovo-v15-gen-4-business-laptop-156-fhd-display-intel-core-i5-13420h-beat-i7-1355u-hdmi-rj45-webcam-numeric-keypad-wi-fi-windows-11-pro-black-16gb-ram-512gb-ssd-v2',
      description: 'Professional business laptop with Intel Core i5-13420H processor, 16GB RAM, 512GB SSD, 15.6" FHD display, and Windows 11 Pro. Features HDMI, RJ45, webcam, and numeric keypad.',
      price: 529,
      originalPrice: 529,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61qJN6Yn8qL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71N9tTF6pML._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61+o7g9qZBL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71FUdhdOSLL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 96 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'intel', 'windows-pro'],
      affiliateUrl: 'https://amzn.to/47a7uJC'
    },

    // Product 2 Copy 2 - Lenovo V15 Gen 4 (Image 3 as primary)
    {
      _id: 'product-lenovo-v15-gen4-copy2',
      productNumber: 2,
      name: 'Lenovo V15 Gen 4 Business Laptop, 15.6" FHD Display, Intel Core i5-13420H (Beat i7-1355U), HDMI, RJ45, Webcam, Numeric Keypad, Wi-Fi, Windows 11 Pro, Black (16GB RAM | 512GB SSD)',
      slug: 'lenovo-v15-gen-4-business-laptop-156-fhd-display-intel-core-i5-13420h-beat-i7-1355u-hdmi-rj45-webcam-numeric-keypad-wi-fi-windows-11-pro-black-16gb-ram-512gb-ssd-v3',
      description: 'Professional business laptop with Intel Core i5-13420H processor, 16GB RAM, 512GB SSD, 15.6" FHD display, and Windows 11 Pro. Features HDMI, RJ45, webcam, and numeric keypad.',
      price: 529,
      originalPrice: 529,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61+o7g9qZBL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71N9tTF6pML._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61qJN6Yn8qL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71FUdhdOSLL._AC_SX679_.jpg', alt: 'Lenovo V15 Gen 4 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 96 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'intel', 'windows-pro'],
      affiliateUrl: 'https://amzn.to/47a7uJC'
    },

    // Product 3 Copy 1 - Lenovo V-Series V15 AMD (Image 2 as primary)
    {
      _id: 'product-lenovo-v15-amd-copy1',
      productNumber: 3,
      name: 'Lenovo V-Series V15 Business Laptop, 15.6" FHD Display, AMD Ryzen 7 7730U, 40GB RAM, 2TB SSD, Numeric Keypad, HDMI, RJ45, Webcam, Wi-Fi, Windows 11 Pro, Black',
      slug: 'lenovo-v-series-v15-business-laptop-156-fhd-display-amd-ryzen-7-7730u-40gb-ram-2tb-ssd-numeric-keypad-hdmi-rj45-webcam-wi-fi-windows-11-pro-black-v2',
      description: 'High-performance business laptop with AMD Ryzen 7 7730U processor, 40GB RAM, 2TB SSD, 15.6" FHD display, and Windows 11 Pro. Perfect for demanding business applications.',
      price: 648,
      originalPrice: 648,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71KQXadhfOL._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71TN6dLVcsL._AC_SL1500_.jpg', alt: 'Lenovo V15 AMD Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41fT-gINjKL._AC_.jpg', alt: 'Lenovo V15 AMD Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61z6GKwnq2L._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 457 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'amd', 'ryzen', 'high-performance'],
      affiliateUrl: 'https://amzn.to/3Jp5zaV'
    },

    // Product 3 Copy 2 - Lenovo V-Series V15 AMD (Image 3 as primary)
    {
      _id: 'product-lenovo-v15-amd-copy2',
      productNumber: 3,
      name: 'Lenovo V-Series V15 Business Laptop, 15.6" FHD Display, AMD Ryzen 7 7730U, 40GB RAM, 2TB SSD, Numeric Keypad, HDMI, RJ45, Webcam, Wi-Fi, Windows 11 Pro, Black',
      slug: 'lenovo-v-series-v15-business-laptop-156-fhd-display-amd-ryzen-7-7730u-40gb-ram-2tb-ssd-numeric-keypad-hdmi-rj45-webcam-wi-fi-windows-11-pro-black-v3',
      description: 'High-performance business laptop with AMD Ryzen 7 7730U processor, 40GB RAM, 2TB SSD, 15.6" FHD display, and Windows 11 Pro. Perfect for demanding business applications.',
      price: 648,
      originalPrice: 648,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41fT-gINjKL._AC_.jpg', alt: 'Lenovo V15 AMD Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71TN6dLVcsL._AC_SL1500_.jpg', alt: 'Lenovo V15 AMD Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71KQXadhfOL._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61z6GKwnq2L._AC_SX679_.jpg', alt: 'Lenovo V15 AMD Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 457 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', 'business', 'amd', 'ryzen', 'high-performance'],
      affiliateUrl: 'https://amzn.to/3Jp5zaV'
    },

    // Product 4 Copy 1 - Lenovo IdeaPad 5X 2-in-1 (Image 2 as primary)
    {
      _id: 'product-lenovo-ideapad-5x-copy1',
      productNumber: 4,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray-v3',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 821,
      originalPrice: 821,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71UmMRFj6aL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81e+sK+U7UL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 32 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/3WjomHN'
    },

    // Product 4 Copy 2 - Lenovo IdeaPad 5X 2-in-1 (Image 3 as primary)
    {
      _id: 'product-lenovo-ideapad-5x-copy2',
      productNumber: 4,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray-v4',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 821,
      originalPrice: 821,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71UmMRFj6aL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81e+sK+U7UL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 32 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/3WjomHN'
    },

    // Product 5 Copy 1 - Lenovo LOQ 15 Gaming Laptop (Image 2 as primary)
    {
      _id: 'product-lenovo-loq-15-copy1',
      productNumber: 5,
      name: 'Lenovo LOQ 15" - NVIDIA GeForce RTX 5050 Graphics - 15.6" IPS LCD FHD 144hz Display - Intel Core i7-13650HX - 24GB DDR5-1 TB SSD - Windows 11 Home - Luna Grey',
      slug: 'lenovo-loq-15-nvidia-geforce-rtx-5050-graphics-156-ips-lcd-fhd-144hz-display-intel-core-i7-13650hx-24gb-ddr5-1-tb-ssd-windows-11-home-luna-grey-v2',
      description: 'Gaming laptop with NVIDIA GeForce RTX 5050 graphics, Intel Core i7-13650HX processor, 24GB DDR5 RAM, 1TB SSD, and 15.6" IPS LCD FHD 144Hz display for smooth gaming.',
      price: 1166,
      originalPrice: 1166,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71jH93E4dxL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Dn-XD8GsL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71MgOGFKAGL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51nqcwm8I9L._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 36 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'gaming', 'nvidia', 'rtx', 'intel', 'high-performance'],
      affiliateUrl: 'https://amzn.to/4o40949'
    },

    // Product 5 Copy 2 - Lenovo LOQ 15 Gaming Laptop (Image 3 as primary)
    {
      _id: 'product-lenovo-loq-15-copy2',
      productNumber: 5,
      name: 'Lenovo LOQ 15" - NVIDIA GeForce RTX 5050 Graphics - 15.6" IPS LCD FHD 144hz Display - Intel Core i7-13650HX - 24GB DDR5-1 TB SSD - Windows 11 Home - Luna Grey',
      slug: 'lenovo-loq-15-nvidia-geforce-rtx-5050-graphics-156-ips-lcd-fhd-144hz-display-intel-core-i7-13650hx-24gb-ddr5-1-tb-ssd-windows-11-home-luna-grey-v3',
      description: 'Gaming laptop with NVIDIA GeForce RTX 5050 graphics, Intel Core i7-13650HX processor, 24GB DDR5 RAM, 1TB SSD, and 15.6" IPS LCD FHD 144Hz display for smooth gaming.',
      price: 1166,
      originalPrice: 1166,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71MgOGFKAGL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Dn-XD8GsL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71jH93E4dxL._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51nqcwm8I9L._AC_SX679_.jpg', alt: 'Lenovo LOQ 15 Display', isPrimary: false }
      ],
      rating: { average: 4.7, count: 36 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'gaming', 'nvidia', 'rtx', 'intel', 'high-performance'],
      affiliateUrl: 'https://amzn.to/4o40949'
    },

    // Product 6 Copy 1 - LG gram Pro 17-inch (Image 2 as primary)
    {
      _id: 'product-lg-gram-pro-17-copy1',
      productNumber: 6,
      name: 'LG gram Pro 17-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra9 285H Processor, NVIDIA RTX5050, Windows 11 Home, 32GB RAM, 2TB SSD, Black',
      slug: 'lg-gram-pro-17-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra9-285h-processor-nvidia-rtx5050-windows-11-home-32gb-ram-2tb-ssd-black-v2',
      description: 'Ultra-lightweight 17-inch laptop with Intel Core Ultra9 285H processor, NVIDIA RTX5050 graphics, 32GB RAM, 2TB SSD, and Windows 11 Home. Perfect for professionals on the go.',
      price: 2749,
      originalPrice: 2749,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/711pbDS5ZNL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/617zFnvYNlL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71rV1HbvkFL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/711QUUUMl6L._AC_SX679_.jpg', alt: 'LG gram Pro 17 Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 8 },
      isFeatured: false,
      isTrending: true,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'ultra-lightweight', 'intel-evo', 'professional'],
      affiliateUrl: 'https://amzn.to/4nm66bO'
    },

    // Product 6 Copy 2 - LG gram Pro 17-inch (Image 3 as primary)
    {
      _id: 'product-lg-gram-pro-17-copy2',
      productNumber: 6,
      name: 'LG gram Pro 17-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra9 285H Processor, NVIDIA RTX5050, Windows 11 Home, 32GB RAM, 2TB SSD, Black',
      slug: 'lg-gram-pro-17-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra9-285h-processor-nvidia-rtx5050-windows-11-home-32gb-ram-2tb-ssd-black-v3',
      description: 'Ultra-lightweight 17-inch laptop with Intel Core Ultra9 285H processor, NVIDIA RTX5050 graphics, 32GB RAM, 2TB SSD, and Windows 11 Home. Perfect for professionals on the go.',
      price: 2749,
      originalPrice: 2749,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71rV1HbvkFL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/617zFnvYNlL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/711pbDS5ZNL._AC_SX679_.jpg', alt: 'LG gram Pro 17 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/711QUUUMl6L._AC_SX679_.jpg', alt: 'LG gram Pro 17 Display', isPrimary: false }
      ],
      rating: { average: 4.8, count: 8 },
      isFeatured: true,
      isTrending: false,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'ultra-lightweight', 'intel-evo', 'professional'],
      affiliateUrl: 'https://amzn.to/4nm66bO'
    },

    // Product 7 Copy 1 - LG gram Pro 16-inch (Image 2 as primary)
    {
      _id: 'product-lg-gram-pro-16-copy1',
      productNumber: 7,
      name: 'LG gram Pro 16-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra7 258V Processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD - Metal Gray',
      slug: 'lg-gram-pro-16-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra7-258v-processor-copilot-windows-11-home-32gb-ram-2tb-ssd-metal-gray-v2',
      description: 'Lightweight 16-inch laptop with Intel Core Ultra7 258V processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD. Features AI-powered productivity and ultra-portable design.',
      price: 1899,
      originalPrice: 1899,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/617DY34HlmL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gIsZX3hgL._AC_SL1500_.jpg', alt: 'LG gram Pro 16 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51VOD-fpeTL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71ZxlCD+VCL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Display', isPrimary: false }
      ],
      rating: { average: 4.9, count: 11 },
      isFeatured: true,
      isTrending: false,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'lightweight', 'intel-evo', 'copilot', 'ai'],
      affiliateUrl: 'https://amzn.to/3JpwHqm'
    },

    // Product 7 Copy 2 - LG gram Pro 16-inch (Image 3 as primary)
    {
      _id: 'product-lg-gram-pro-16-copy2',
      productNumber: 7,
      name: 'LG gram Pro 16-inch Lightweight Laptop Computer, Intel Evo Edition Powered by Intel Core Ultra7 258V Processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD - Metal Gray',
      slug: 'lg-gram-pro-16-inch-lightweight-laptop-computer-intel-evo-edition-powered-by-intel-core-ultra7-258v-processor-copilot-windows-11-home-32gb-ram-2tb-ssd-metal-gray-v3',
      description: 'Lightweight 16-inch laptop with Intel Core Ultra7 258V processor, Copilot+ Windows 11 Home, 32GB RAM, 2TB SSD. Features AI-powered productivity and ultra-portable design.',
      price: 1899,
      originalPrice: 1899,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51VOD-fpeTL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gIsZX3hgL._AC_SL1500_.jpg', alt: 'LG gram Pro 16 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/617DY34HlmL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71ZxlCD+VCL._AC_SX679_.jpg', alt: 'LG gram Pro 16 Display', isPrimary: false }
      ],
      rating: { average: 4.9, count: 11 },
      isFeatured: false,
      isTrending: true,
      brand: 'LG',
      inStock: true,
      tags: ['electronics', 'laptop', 'lg', 'lightweight', 'intel-evo', 'copilot', 'ai'],
      affiliateUrl: 'https://amzn.to/3JpwHqm'
    },

    // Product 8 Copy 1 - Lenovo IdeaPad 5X 2-in-1 Alternative (Image 2 as primary)
    {
      _id: 'product-lenovo-ideapad-5x-alt-copy1',
      productNumber: 8,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray-v5',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 32,
      originalPrice: 32,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41JdHKLzyYL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51i6xIBYPGL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 821 },
      isFeatured: true,
      isTrending: false,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/4hnxVii'
    },

    // Product 8 Copy 2 - Lenovo IdeaPad 5X 2-in-1 Alternative (Image 3 as primary)
    {
      _id: 'product-lenovo-ideapad-5x-alt-copy2',
      productNumber: 8,
      name: 'Lenovo IdeaPad 5X 2-in-1 Copilot+ Extra-Long Battery Life 14" WUXGA FHD+ OLED Touch Display 16GB Memory 512GB Storage Snapdragon X Plus 8-core Processor Windows 11 Home, Pen Included, Luna Gray',
      slug: 'lenovo-ideapad-5x-2-in-1-copilot-extra-long-battery-life-14-wuxga-fhd-oled-touch-display-16gb-memory-512gb-storage-snapdragon-x-plus-8-core-processor-windows-11-home-pen-included-luna-gray-v6',
      description: 'Versatile 2-in-1 laptop with Snapdragon X Plus processor, 16GB RAM, 512GB storage, 14" WUXGA FHD+ OLED touch display, and extra-long battery life. Includes pen and Windows 11 Home.',
      price: 32,
      originalPrice: 32,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71yB66ZUE1L._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Touch', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61oHbqqqvJL._AC_SX679_.jpg', alt: 'Lenovo IdeaPad 5X Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41JdHKLzyYL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51i6xIBYPGL._AC_US40_.jpg', alt: 'Lenovo IdeaPad 5X Display', isPrimary: false }
      ],
      rating: { average: 4.6, count: 821 },
      isFeatured: false,
      isTrending: true,
      brand: 'Lenovo',
      inStock: true,
      tags: ['electronics', 'laptop', 'lenovo', '2-in-1', 'touch', 'oled', 'snapdragon'],
      affiliateUrl: 'https://amzn.to/4hnxVii'
    },

    // Product 9 Copy 1 - Bicycle Pump (Image 2 as primary)
    {
      _id: 'product-bicycle-pump-copy1',
      productNumber: 9,
      name: 'Bicycle Pump with Gauge, 3X Faster & Auto Stop & Brushless Motor, Electric Bike Tire Pump with Presta and Schrader Valve for Road Bike, MTB, Motorcycle, Ball,etc',
      slug: 'bicycle-pump-with-gauge-3x-faster-auto-stop-brushless-motor-electric-bike-tire-pump-with-presta-and-schrader-valve-for-road-bike-mtb-motorcycle-balletc-v2',
      description: 'Electric bicycle pump with gauge, 3X faster pumping, auto-stop feature, and brushless motor. Compatible with Presta and Schrader valves for bikes, motorcycles, and balls.',
      price: 49,
      originalPrice: 49,
      category: 'sports',
      images: [
        { url: 'https://m.media-amazon.com/images/I/91TYUM89NuL._AC_SX679_.jpg', alt: 'Bicycle Pump Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71xuypbqHRL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Bicycle Pump Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/517IrjVMHZL._AC_US100_.jpg', alt: 'Bicycle Pump Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71S8sWIJXxL._AC_SX679_.jpg', alt: 'Bicycle Pump Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 662 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['sports', 'bicycle', 'pump', 'electric', 'gauge', 'auto-stop'],
      affiliateUrl: 'https://amzn.to/4niaus3'
    },

    // Product 9 Copy 2 - Bicycle Pump (Image 3 as primary)
    {
      _id: 'product-bicycle-pump-copy2',
      productNumber: 9,
      name: 'Bicycle Pump with Gauge, 3X Faster & Auto Stop & Brushless Motor, Electric Bike Tire Pump with Presta and Schrader Valve for Road Bike, MTB, Motorcycle, Ball,etc',
      slug: 'bicycle-pump-with-gauge-3x-faster-auto-stop-brushless-motor-electric-bike-tire-pump-with-presta-and-schrader-valve-for-road-bike-mtb-motorcycle-balletc-v3',
      description: 'Electric bicycle pump with gauge, 3X faster pumping, auto-stop feature, and brushless motor. Compatible with Presta and Schrader valves for bikes, motorcycles, and balls.',
      price: 49,
      originalPrice: 49,
      category: 'sports',
      images: [
        { url: 'https://m.media-amazon.com/images/I/517IrjVMHZL._AC_US100_.jpg', alt: 'Bicycle Pump Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71xuypbqHRL._AC_SY300_SX300_QL70_FMwebp_.jpg', alt: 'Bicycle Pump Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/91TYUM89NuL._AC_SX679_.jpg', alt: 'Bicycle Pump Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71S8sWIJXxL._AC_SX679_.jpg', alt: 'Bicycle Pump Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 662 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['sports', 'bicycle', 'pump', 'electric', 'gauge', 'auto-stop'],
      affiliateUrl: 'https://amzn.to/4niaus3'
    },

    // Product 10 Copy 1 - VOCH GALA Nipple Covers (Image 2 as primary)
    {
      _id: 'product-voch-gala-nipple-covers-copy1',
      productNumber: 10,
      name: 'VOCH GALA Nipple Covers 2 Pairs-Seamless and Sheer Adhesive Silicone Nipple Pasties for Women Reusable, Sticky Breast Petals',
      slug: 'voch-gala-nipple-covers-2-pairs-seamless-and-sheer-adhesive-silicone-nipple-pasties-for-women-reusable-sticky-breast-petals-v2',
      description: 'Seamless and sheer adhesive silicone nipple covers for women. Reusable and sticky breast petals that provide comfort and coverage.',
      price: 18.26,
      originalPrice: 18.26,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Package', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4708 },
      isFeatured: true,
      isTrending: false,
      brand: 'VOCH GALA',
      inStock: true,
      tags: ['fashion', 'women', 'underwear', 'silicone', 'adhesive', 'reusable'],
      affiliateUrl: 'https://amzn.to/47hJsg1'
    },

    // Product 10 Copy 2 - VOCH GALA Nipple Covers (Image 3 as primary)
    {
      _id: 'product-voch-gala-nipple-covers-copy2',
      productNumber: 10,
      name: 'VOCH GALA Nipple Covers 2 Pairs-Seamless and Sheer Adhesive Silicone Nipple Pasties for Women Reusable, Sticky Breast Petals',
      slug: 'voch-gala-nipple-covers-2-pairs-seamless-and-sheer-adhesive-silicone-nipple-pasties-for-women-reusable-sticky-breast-petals-v3',
      description: 'Seamless and sheer adhesive silicone nipple covers for women. Reusable and sticky breast petals that provide comfort and coverage.',
      price: 18.26,
      originalPrice: 18.26,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Package', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71F0imqAOCL._AC_SL1500_.jpg', alt: 'VOCH GALA Nipple Covers Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81-JmqabxbL._AC_SX679_.jpg', alt: 'VOCH GALA Nipple Covers Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 4708 },
      isFeatured: false,
      isTrending: true,
      brand: 'VOCH GALA',
      inStock: true,
      tags: ['fashion', 'women', 'underwear', 'silicone', 'adhesive', 'reusable'],
      affiliateUrl: 'https://amzn.to/47hJsg1'
    },

    // Product 11 Copy 1 - Popular Girls Padded Training Bra (Image 2 as primary)
    {
      _id: 'product-girls-training-bra-padded-copy1',
      productNumber: 11,
      name: 'Popular Girls Padded Training Bra Pack – Crop Cami Training Bras for Girls. Seamless Bra Design with Removable Padding',
      slug: 'popular-girls-padded-training-bra-pack-crop-cami-training-bras-for-girls-seamless-bra-design-with-removable-padding-v2',
      description: 'Training bra pack for girls with seamless design and removable padding. Crop cami style training bras perfect for young girls.',
      price: 26.99,
      originalPrice: 26.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41gK0fXglJL._AC_SX679_.jpg', alt: 'Girls Training Bra Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Kh0vW6QqL._AC_SX679_.jpg', alt: 'Girls Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41s3h2zSsKL._AC_SR38,50_.jpg', alt: 'Girls Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51BWs5C9BsL._AC_SR38,50_.jpg', alt: 'Girls Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 4306 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'padded', 'seamless', 'removable-padding'],
      affiliateUrl: 'https://amzn.to/3Jbj26h'
    },

    // Product 11 Copy 2 - Popular Girls Padded Training Bra (Image 3 as primary)
    {
      _id: 'product-girls-training-bra-padded-copy2',
      productNumber: 11,
      name: 'Popular Girls Padded Training Bra Pack – Crop Cami Training Bras for Girls. Seamless Bra Design with Removable Padding',
      slug: 'popular-girls-padded-training-bra-pack-crop-cami-training-bras-for-girls-seamless-bra-design-with-removable-padding-v3',
      description: 'Training bra pack for girls with seamless design and removable padding. Crop cami style training bras perfect for young girls.',
      price: 26.99,
      originalPrice: 26.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/41s3h2zSsKL._AC_SX679_.jpg', alt: 'Girls Training Bra Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Kh0vW6QqL._AC_SX679_.jpg', alt: 'Girls Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41gK0fXglJL._AC_SX679_.jpg', alt: 'Girls Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51BWs5C9BsL._AC_SX679_.jpg', alt: 'Girls Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 4306 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'padded', 'seamless', 'removable-padding'],
      affiliateUrl: 'https://amzn.to/3Jbj26h'
    },

    // Product 12 Copy 1 - Popular Cotton Girls Training Bra (Image 2 as primary)
    {
      _id: 'product-girls-cotton-training-bra-copy1',
      productNumber: 12,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack-v3',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.99,
      originalPrice: 16.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61XCDkGktdL._AC_SX679_.jpg', alt: 'Cotton Training Bra Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41Vzw56F4SL._AC_SX679_.jpg', alt: 'Cotton Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41czkCjmd0L._AC_SX679_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14889 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/47nP1s2'
    },

    // Product 12 Copy 2 - Popular Cotton Girls Training Bra (Image 3 as primary)
    {
      _id: 'product-girls-cotton-training-bra-copy2',
      productNumber: 12,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack-v4',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.99,
      originalPrice: 16.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/41Vzw56F4SL._AC_SR38,50_.jpg', alt: 'Cotton Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61XCDkGktdL._AC_SX679_.jpg', alt: 'Cotton Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/41czkCjmd0L._AC_SR38,50_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14889 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/47nP1s2'
    },

    // Product 13 Copy 1 - Hilarious Jokes For 8 Year Old Kids (Image 2 as primary)
    {
      _id: 'product-hilarious-jokes-book-copy1',
      productNumber: 13,
      name: 'Hilarious Jokes For 8 Year Old Kids: An Awesome LOL Gag Book For Young Boys and Girls Filled With Tons of Tongue Twisters, Rib Ticklers, Side Splitters, and Knock Knocks',
      slug: 'hilarious-jokes-for-8-year-old-kids-an-awesome-lol-gag-book-for-young-boys-and-girls-filled-with-tons-of-tongue-twisters-rib-ticklers-side-splitters-and-knock-knocks-v2',
      description: 'Fun joke book for 8-year-old kids filled with hilarious jokes, tongue twisters, rib ticklers, side splitters, and knock-knock jokes. Perfect for young boys and girls.',
      price: 9.99,
      originalPrice: 9.99,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61VIlVlVaRL.jpg', alt: 'Jokes Book Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71aoNAbO9SL._SL1499_.jpg', alt: 'Jokes Book Cover', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2867 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['books', 'children', 'jokes', 'humor', 'tongue-twisters', 'knock-knock'],
      affiliateUrl: 'https://amzn.to/4nhEJ2p'
    },

    // Product 13 Copy 2 - Hilarious Jokes For 8 Year Old Kids (Image 3 as primary)
    {
      _id: 'product-hilarious-jokes-book-copy2',
      productNumber: 13,
      name: 'Hilarious Jokes For 8 Year Old Kids: An Awesome LOL Gag Book For Young Boys and Girls Filled With Tons of Tongue Twisters, Rib Ticklers, Side Splitters, and Knock Knocks',
      slug: 'hilarious-jokes-for-8-year-old-kids-an-awesome-lol-gag-book-for-young-boys-and-girls-filled-with-tons-of-tongue-twisters-rib-ticklers-side-splitters-and-knock-knocks-v3',
      description: 'Fun joke book for 8-year-old kids filled with hilarious jokes, tongue twisters, rib ticklers, side splitters, and knock-knock jokes. Perfect for young boys and girls.',
      price: 9.99,
      originalPrice: 9.99,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71aoNAbO9SL._SL1500_.jpg', alt: 'Jokes Book Cover Large', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71aoNAbO9SL._SL1499_.jpg', alt: 'Jokes Book Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61VIlVlVaRL.jpg', alt: 'Jokes Book Pages', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2867 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['books', 'children', 'jokes', 'humor', 'tongue-twisters', 'knock-knock'],
      affiliateUrl: 'https://amzn.to/4nhEJ2p'
    },

    // Product 14 Copy 1 - Popular Girl's Bandeau Bra (Image 2 as primary)
    {
      _id: 'product-girls-bandeau-bra-copy1',
      slug: 'girls-bandeau-bra-copy-1',
      
      productNumber: 14,
      name: 'Popular Girl\'s Bandeau Bra with Removable Padding - Strapless Tube Bra for Girls and Teens, Seamless',
      description: 'Strapless tube bra for girls and teens with removable padding. Seamless design provides comfort and support for young girls.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81XuvePYEFL._AC_SX679_.jpg', alt: 'Bandeau Bra Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81XmFVfF69L._AC_SY879_.jpg', alt: 'Bandeau Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81VWc3DgAPL._AC_SX679_.jpg', alt: 'Bandeau Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81cbJ-izFTL._AC_SX679_.jpg', alt: 'Bandeau Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 1181 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'bandeau-bra', 'strapless', 'removable-padding', 'seamless'],
      affiliateUrl: 'https://amzn.to/4hmNg2E'
    },

    // Product 14 Copy 2 - Popular Girl's Bandeau Bra (Image 3 as primary)
    {
      _id: 'product-girls-bandeau-bra-copy2',
      slug: 'girls-bandeau-bra-copy-2',
      
      productNumber: 14,
      name: 'Popular Girl\'s Bandeau Bra with Removable Padding - Strapless Tube Bra for Girls and Teens, Seamless',
      description: 'Strapless tube bra for girls and teens with removable padding. Seamless design provides comfort and support for young girls.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81VWc3DgAPL._AC_SX679_.jpg', alt: 'Bandeau Bra Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81XmFVfF69L._AC_SY879_.jpg', alt: 'Bandeau Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81XuvePYEFL._AC_SX679_.jpg', alt: 'Bandeau Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81cbJ-izFTL._AC_SX679_.jpg', alt: 'Bandeau Bra Package', isPrimary: false }
      ],
      rating: { average: 4.7, count: 1181 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'bandeau-bra', 'strapless', 'removable-padding', 'seamless'],
      affiliateUrl: 'https://amzn.to/4hmNg2E'
    },

    // Product 15 Copy 1 - Popular Cotton Girls Training Bra Alternative (Image 2 as primary)
    {
      _id: 'product-girls-cotton-training-bra-alt-copy1',
      productNumber: 15,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack-v5',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.98,
      originalPrice: 16.98,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SX679_.jpg', alt: 'Cotton Training Bra Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/811oWE2zJRL._AC_SX679_.jpg', alt: 'Cotton Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/411q6dElS4L._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51Em+bZnZcL._AC_SX679_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14832 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/4npeBCF'
    },

    // Product 15 Copy 2 - Popular Cotton Girls Training Bra Alternative (Image 3 as primary)
    {
      _id: 'product-girls-cotton-training-bra-alt-copy2',
      productNumber: 15,
      name: 'Popular Cotton Girls Training Bra - Crop Cami Training Bras for Girls with Adjustable Straps. Cotton Bra Pack.',
      slug: 'popular-cotton-girls-training-bra-crop-cami-training-bras-for-girls-with-adjustable-straps-cotton-bra-pack-v6',
      description: 'Cotton training bra for girls with adjustable straps. Crop cami style training bras made from comfortable cotton material.',
      price: 16.98,
      originalPrice: 16.98,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/411q6dElS4L._AC_SX679_.jpg', alt: 'Cotton Training Bra Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/811oWE2zJRL._AC_SX679_.jpg', alt: 'Cotton Training Bra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/31DEsNmoBDL._AC_SR38,50_.jpg', alt: 'Cotton Training Bra Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51Em+bZnZcL._AC_SR38,50_.jpg', alt: 'Cotton Training Bra Package', isPrimary: false }
      ],
      rating: { average: 4.8, count: 14832 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'girls', 'training-bra', 'cotton', 'adjustable-straps', 'comfortable'],
      affiliateUrl: 'https://amzn.to/4npeBCF'
    },

    // Product 16 Copy 1 - Popular Womens Bike Shorts (Image 2 as primary)
    {
      _id: 'product-womens-bike-shorts-copy1',
      productNumber: 16,
      name: 'Popular Womens Bike Shorts Plus Size - Cotton Biker Bottoms. Bermuda Long Shorts for Women. Great Gym, Workout & Yoga',
      slug: 'popular-womens-bike-shorts-plus-size-cotton-biker-bottoms-bermuda-long-shorts-for-women-great-gym-workout-yoga-v2',
      description: 'Plus size bike shorts for women made from cotton. Bermuda long shorts perfect for gym, workout, and yoga activities.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51ne9LWOKeL._AC_SX679_.jpg', alt: 'Bike Shorts Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61z+raI3QTL._AC_SX679_.jpg', alt: 'Bike Shorts Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61yL2OzBbDL._AC_SX679_.jpg', alt: 'Bike Shorts Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2144 },
      isFeatured: true,
      isTrending: false,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'women', 'bike-shorts', 'plus-size', 'cotton', 'workout', 'yoga'],
      affiliateUrl: 'https://amzn.to/48H5TfB'
    },

    // Product 16 Copy 2 - Popular Womens Bike Shorts (Image 3 as primary)
    {
      _id: 'product-womens-bike-shorts-copy2',
      productNumber: 16,
      name: 'Popular Womens Bike Shorts Plus Size - Cotton Biker Bottoms. Bermuda Long Shorts for Women. Great Gym, Workout & Yoga',
      slug: 'popular-womens-bike-shorts-plus-size-cotton-biker-bottoms-bermuda-long-shorts-for-women-great-gym-workout-yoga-v3',
      description: 'Plus size bike shorts for women made from cotton. Bermuda long shorts perfect for gym, workout, and yoga activities.',
      price: 14.99,
      originalPrice: 14.99,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61yL2OzBbDL._AC_SX679_.jpg', alt: 'Bike Shorts Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61z+raI3QTL._AC_SX679_.jpg', alt: 'Bike Shorts Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51ne9LWOKeL._AC_SX679_.jpg', alt: 'Bike Shorts Side', isPrimary: false }
      ],
      rating: { average: 4.6, count: 2144 },
      isFeatured: false,
      isTrending: true,
      brand: 'Popular',
      inStock: true,
      tags: ['fashion', 'women', 'bike-shorts', 'plus-size', 'cotton', 'workout', 'yoga'],
      affiliateUrl: 'https://amzn.to/48H5TfB'
    },

    // Product 17 Copy 1 - Mouse Jiggler Mover (Image 2 as primary)
    {
      _id: 'product-mouse-jiggler-copy1',
      productNumber: 17,
      name: 'Mouse Jiggler Mover Wiggler Undetectable Shaker USB Port for Computer Laptop, Keeps PC Awake, Simulate Movement to Prevent Laptop Entering Sleep, No Software Plug-and-Play',
      slug: 'mouse-jiggler-mover-wiggler-undetectable-shaker-usb-port-for-computer-laptop-keeps-pc-awake-simulate-movement-to-prevent-laptop-entering-sleep-no-software-plug-and-play-v2',
      description: 'USB mouse jiggler that keeps your computer awake by simulating mouse movement. Undetectable shaker prevents laptop from entering sleep mode. No software required, plug-and-play.',
      price: 6.99,
      originalPrice: 6.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61OWkA9Wl9L._AC_SL1500_.jpg', alt: 'Mouse Jiggler Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61AUhToZptL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71U+2I8UDCL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71I5iqYbwfL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 5269 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'computer', 'mouse-jiggler', 'usb', 'plug-and-play', 'productivity'],
      affiliateUrl: 'https://amzn.to/4qssfb8'
    },

    // Product 17 Copy 2 - Mouse Jiggler Mover (Image 3 as primary)
    {
      _id: 'product-mouse-jiggler-copy2',
      productNumber: 17,
      name: 'Mouse Jiggler Mover Wiggler Undetectable Shaker USB Port for Computer Laptop, Keeps PC Awake, Simulate Movement to Prevent Laptop Entering Sleep, No Software Plug-and-Play',
      slug: 'mouse-jiggler-mover-wiggler-undetectable-shaker-usb-port-for-computer-laptop-keeps-pc-awake-simulate-movement-to-prevent-laptop-entering-sleep-no-software-plug-and-play-v3',
      description: 'USB mouse jiggler that keeps your computer awake by simulating mouse movement. Undetectable shaker prevents laptop from entering sleep mode. No software required, plug-and-play.',
      price: 6.99,
      originalPrice: 6.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71U+2I8UDCL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61AUhToZptL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61OWkA9Wl9L._AC_SL1500_.jpg', alt: 'Mouse Jiggler Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71I5iqYbwfL._AC_SL1500_.jpg', alt: 'Mouse Jiggler Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 5269 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'computer', 'mouse-jiggler', 'usb', 'plug-and-play', 'productivity'],
      affiliateUrl: 'https://amzn.to/4qssfb8'
    },

    // Product 18 Copy 1 - LISEN Retractable Car Charger (Image 2 as primary)
    {
      _id: 'product-lisen-car-charger-copy1',
      productNumber: 18,
      name: 'LISEN Retractable Car Charger, 69W Cars Adapter USB C Fast Charger, Car Accessories for Women Men, Christmas for Gifts for Dad Mom, Gifts for Women Men, for iPhone 17 Pro Max Air 16 15 14 13 Plus',
      slug: 'lisen-retractable-car-charger-69w-cars-adapter-usb-c-fast-charger-car-accessories-for-women-men-christmas-for-gifts-for-dad-mom-gifts-for-women-men-for-iphone-17-pro-max-air-16-15-14-13-plus-v2',
      description: '69W retractable car charger with USB-C fast charging. Compatible with iPhone 17 Pro Max, Air, 16, 15, 14, 13 Plus. Perfect gift for men and women.',
      price: 16.99,
      originalPrice: 29.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61TNXDLQlqL._AC_SL1500_.jpg', alt: 'Car Charger Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71Ryl5xKbuL._AC_SL1500_.jpg', alt: 'Car Charger Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/713wm1uB5nL._AC_SL1500_.jpg', alt: 'Car Charger Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zNi1-2V0L._AC_SL1500_.jpg', alt: 'Car Charger Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 12113 },
      isFeatured: false,
      isTrending: true,
      brand: 'LISEN',
      inStock: true,
      tags: ['electronics', 'car-charger', 'usb-c', 'fast-charging', 'retractable', 'gift'],
      affiliateUrl: 'https://amzn.to/4qrVRFw'
    },

    // Product 18 Copy 2 - LISEN Retractable Car Charger (Image 3 as primary)
    {
      _id: 'product-lisen-car-charger-copy2',
      productNumber: 18,
      name: 'LISEN Retractable Car Charger, 69W Cars Adapter USB C Fast Charger, Car Accessories for Women Men, Christmas for Gifts for Dad Mom, Gifts for Women Men, for iPhone 17 Pro Max Air 16 15 14 13 Plus',
      slug: 'lisen-retractable-car-charger-69w-cars-adapter-usb-c-fast-charger-car-accessories-for-women-men-christmas-for-gifts-for-dad-mom-gifts-for-women-men-for-iphone-17-pro-max-air-16-15-14-13-plus-v3',
      description: '69W retractable car charger with USB-C fast charging. Compatible with iPhone 17 Pro Max, Air, 16, 15, 14, 13 Plus. Perfect gift for men and women.',
      price: 16.99,
      originalPrice: 29.99,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/713wm1uB5nL._AC_SL1500_.jpg', alt: 'Car Charger Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71Ryl5xKbuL._AC_SL1500_.jpg', alt: 'Car Charger Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61TNXDLQlqL._AC_SL1500_.jpg', alt: 'Car Charger Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zNi1-2V0L._AC_SL1500_.jpg', alt: 'Car Charger Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 12113 },
      isFeatured: true,
      isTrending: false,
      brand: 'LISEN',
      inStock: true,
      tags: ['electronics', 'car-charger', 'usb-c', 'fast-charging', 'retractable', 'gift'],
      affiliateUrl: 'https://amzn.to/4qrVRFw'
    },

    // Product 19 Copy 1 - The Very Hungry Caterpillar (Image 2 as primary)
    {
      _id: 'product-very-hungry-caterpillar-copy1',
      productNumber: 19,
      name: 'The Very Hungry Caterpillar',
      slug: 'the-very-hungry-caterpillar-v2',
      description: 'Classic children\'s book "The Very Hungry Caterpillar" by Eric Carle. A beloved story about a caterpillar\'s transformation into a beautiful butterfly.',
      price: 4.61,
      originalPrice: 4.61,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SL1500_.jpg', alt: 'Very Hungry Caterpillar Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SX445_.jpg', alt: 'Very Hungry Caterpillar Cover', isPrimary: false }
      ],
      rating: { average: 4.9, count: 77761 },
      isFeatured: false,
      isTrending: true,
      brand: 'Eric Carle',
      inStock: true,
      tags: ['books', 'children', 'classic', 'picture-book', 'caterpillar', 'butterfly'],
      affiliateUrl: 'https://amzn.to/47Ga3TR'
    },

    // Product 19 Copy 2 - The Very Hungry Caterpillar (Image 3 as primary)
    {
      _id: 'product-very-hungry-caterpillar-copy2',
      productNumber: 19,
      name: 'The Very Hungry Caterpillar',
      slug: 'the-very-hungry-caterpillar-v3',
      description: 'Classic children\'s book "The Very Hungry Caterpillar" by Eric Carle. A beloved story about a caterpillar\'s transformation into a beautiful butterfly.',
      price: 4.61,
      originalPrice: 4.61,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SX445_.jpg', alt: 'Very Hungry Caterpillar Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81qsstEtrgL._SL1500_.jpg', alt: 'Very Hungry Caterpillar Pages', isPrimary: false }
      ],
      rating: { average: 4.9, count: 77761 },
      isFeatured: true,
      isTrending: false,
      brand: 'Eric Carle',
      inStock: true,
      tags: ['books', 'children', 'classic', 'picture-book', 'caterpillar', 'butterfly'],
      affiliateUrl: 'https://amzn.to/47Ga3TR'
    },

    // Product 20 Copy 1 - Chicka Chicka Boom Boom (Image 2 as primary)
    {
      _id: 'product-chicka-chicka-boom-boom-copy1',
      productNumber: 20,
      name: 'Chicka Chicka Boom Boom (Board Book)',
      slug: 'chicka-chicka-boom-boom-board-book-v2',
      description: 'Classic children\'s book "Chicka Chicka Boom Boom" in board book format. A fun alphabet story that teaches letters through rhythm and rhyme.',
      price: 4.17,
      originalPrice: 8.00,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71gZVUYGHdL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gilMPLAHL._SY522_.jpg', alt: 'Chicka Chicka Boom Boom Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61G30iYlguL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61rHuppIU3L._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 40937 },
      isFeatured: true,
      isTrending: false,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'alphabet', 'board-book', 'rhythm', 'rhyme'],
      affiliateUrl: 'https://amzn.to/49ib2L9'
    },

    // Product 20 Copy 2 - Chicka Chicka Boom Boom (Image 3 as primary)
    {
      _id: 'product-chicka-chicka-boom-boom-copy2',
      productNumber: 20,
      name: 'Chicka Chicka Boom Boom (Board Book)',
      slug: 'chicka-chicka-boom-boom-board-book-v3',
      description: 'Classic children\'s book "Chicka Chicka Boom Boom" in board book format. A fun alphabet story that teaches letters through rhythm and rhyme.',
      price: 4.17,
      originalPrice: 8.00,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61G30iYlguL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71gilMPLAHL._SY522_.jpg', alt: 'Chicka Chicka Boom Boom Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71gZVUYGHdL._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61rHuppIU3L._SL1500_.jpg', alt: 'Chicka Chicka Boom Boom Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 40937 },
      isFeatured: false,
      isTrending: true,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'alphabet', 'board-book', 'rhythm', 'rhyme'],
      affiliateUrl: 'https://amzn.to/49ib2L9'
    },

    // Product 21 Copy 1 - Brown Bear, Brown Bear, What Do You See? (Image 2 as primary)
    {
      _id: 'product-brown-bear-brown-bear-copy1',
      productNumber: 21,
      name: 'Brown Bear, Brown Bear, What Do You See?',
      slug: 'brown-bear-brown-bear-what-do-you-see-v2',
      description: 'Classic children\'s book "Brown Bear, Brown Bear, What Do You See?" by Bill Martin Jr. and Eric Carle. A beloved story that teaches colors and animals.',
      price: 4.82,
      originalPrice: 9.64,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81Aot5wdfML._SL1500_.jpg', alt: 'Brown Bear Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81kZ3Gl3WKL._SL1500_.jpg', alt: 'Brown Bear Cover', isPrimary: false }
      ],
      rating: { average: 4.9, count: 55224 },
      isFeatured: false,
      isTrending: true,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'colors', 'animals', 'classic', 'picture-book'],
      affiliateUrl: 'https://amzn.to/49hYLX8'
    },

    // Product 21 Copy 2 - Brown Bear, Brown Bear, What Do You See? (Image 3 as primary)
    {
      _id: 'product-brown-bear-brown-bear-copy2',
      productNumber: 21,
      name: 'Brown Bear, Brown Bear, What Do You See?',
      slug: 'brown-bear-brown-bear-what-do-you-see-v3',
      description: 'Classic children\'s book "Brown Bear, Brown Bear, What Do You See?" by Bill Martin Jr. and Eric Carle. A beloved story that teaches colors and animals.',
      price: 4.82,
      originalPrice: 9.64,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81kZ3Gl3WKL._SL1500_.jpg', alt: 'Brown Bear Cover', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81Aot5wdfML._SL1500_.jpg', alt: 'Brown Bear Pages', isPrimary: false }
      ],
      rating: { average: 4.9, count: 55224 },
      isFeatured: true,
      isTrending: false,
      brand: 'Bill Martin Jr.',
      inStock: true,
      tags: ['books', 'children', 'colors', 'animals', 'classic', 'picture-book'],
      affiliateUrl: 'https://amzn.to/49hYLX8'
    },

    // Product 22 Copy 1 - I Love You to the Moon and Back (Image 2 as primary)
    {
      _id: 'product-love-you-moon-back-copy1',
      productNumber: 22,
      name: 'I Love You to the Moon and Back',
      slug: 'i-love-you-to-the-moon-and-back-v2',
      description: 'Heartwarming children\'s book "I Love You to the Moon and Back" that expresses the depth of a parent\'s love for their child. A perfect bedtime story.',
      price: 3.97,
      originalPrice: 7.94,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71rkrN8ulXL._SL1500_.jpg', alt: 'Love You Moon Back Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81D8qaGlTVL._SL1500_.jpg', alt: 'Love You Moon Back Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/818QZeo8s+L._SL1500_.jpg', alt: 'Love You Moon Back Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/9168cMVcNBL._SL1500_.jpg', alt: 'Love You Moon Back Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 79128 },
      isFeatured: true,
      isTrending: false,
      brand: 'Amelia Hepworth',
      inStock: true,
      tags: ['books', 'children', 'love', 'bedtime-story', 'parent-child', 'heartwarming'],
      affiliateUrl: 'https://amzn.to/493Lx0n'
    },

    // Product 22 Copy 2 - I Love You to the Moon and Back (Image 3 as primary)
    {
      _id: 'product-love-you-moon-back-copy2',
      productNumber: 22,
      name: 'I Love You to the Moon and Back',
      slug: 'i-love-you-to-the-moon-and-back-v3',
      description: 'Heartwarming children\'s book "I Love You to the Moon and Back" that expresses the depth of a parent\'s love for their child. A perfect bedtime story.',
      price: 3.97,
      originalPrice: 7.94,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/818QZeo8s+L._SL1500_.jpg', alt: 'Love You Moon Back Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81D8qaGlTVL._SL1500_.jpg', alt: 'Love You Moon Back Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71rkrN8ulXL._SL1500_.jpg', alt: 'Love You Moon Back Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/9168cMVcNBL._SL1500_.jpg', alt: 'Love You Moon Back Back', isPrimary: false }
      ],
      rating: { average: 4.8, count: 79128 },
      isFeatured: false,
      isTrending: true,
      brand: 'Amelia Hepworth',
      inStock: true,
      tags: ['books', 'children', 'love', 'bedtime-story', 'parent-child', 'heartwarming'],
      affiliateUrl: 'https://amzn.to/493Lx0n'
    },

    // Product 23 Copy 1 - The Going To Bed Book (Image 2 as primary)
    {
      _id: 'product-going-to-bed-book-copy1',
      productNumber: 23,
      name: 'The Going To Bed Book',
      slug: 'the-going-to-bed-book-v2',
      description: 'Classic bedtime book "The Going To Bed Book" by Sandra Boynton. A gentle story that helps children wind down and prepare for sleep.',
      price: 3.86,
      originalPrice: 7.72,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71yRyF+25LL._SL1400_.jpg', alt: 'Going To Bed Book Pages', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71FVbHHW+AL._SL1400_.jpg', alt: 'Going To Bed Book Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71L7jgM-CFL._SL1500_.jpg', alt: 'Going To Bed Book Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715f0EUccwL._SL1400_.jpg', alt: 'Going To Bed Book Back', isPrimary: false }
      ],
      rating: { average: 4.7, count: 19233 },
      isFeatured: true,
      isTrending: false,
      brand: 'Sandra Boynton',
      inStock: true,
      tags: ['books', 'children', 'bedtime', 'sleep', 'gentle', 'wind-down'],
      affiliateUrl: 'https://amzn.to/49kyJTb'
    },

    // Product 23 Copy 2 - The Going To Bed Book (Image 3 as primary)
    {
      _id: 'product-going-to-bed-book-copy2',
      productNumber: 23,
      name: 'The Going To Bed Book',
      slug: 'the-going-to-bed-book-v3',
      description: 'Classic bedtime book "The Going To Bed Book" by Sandra Boynton. A gentle story that helps children wind down and prepare for sleep.',
      price: 3.86,
      originalPrice: 7.72,
      category: 'books',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71L7jgM-CFL._SL1500_.jpg', alt: 'Going To Bed Book Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71FVbHHW+AL._SL1400_.jpg', alt: 'Going To Bed Book Cover', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yRyF+25LL._SL1400_.jpg', alt: 'Going To Bed Book Pages', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/715f0EUccwL._SL1400_.jpg', alt: 'Going To Bed Book Back', isPrimary: false }
      ],
      rating: { average: 4.7, count: 19233 },
      isFeatured: false,
      isTrending: true,
      brand: 'Sandra Boynton',
      inStock: true,
      tags: ['books', 'children', 'bedtime', 'sleep', 'gentle', 'wind-down'],
      affiliateUrl: 'https://amzn.to/49kyJTb'
    },

    // Product 24 Copy 1 - 16 inch Screen Magnifier (Image 2 as primary)
    {
      _id: 'product-screen-magnifier-copy1',
      productNumber: 24,
      name: '16 inch Screen Magnifier for Cell Phone 3D Magnifier Screen Enlarger for Movies,Videos,Reading,Gaming-Screen Amplifie with Foldable Phone Stand Holder. Compatible with All Smartphones-White',
      slug: '16-inch-screen-magnifier-for-cell-phone-3d-magnifier-screen-enlarger-for-moviesvideosreadinggaming-screen-amplifie-with-foldable-phone-stand-holder-compatible-with-all-smartphones-white-v2',
      description: '16-inch screen magnifier for cell phones with 3D magnifier screen enlarger. Perfect for movies, videos, reading, and gaming. Includes foldable phone stand holder, compatible with all smartphones.',
      price: 23.20,
      originalPrice: 23.20,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/714SzEeeoLL._AC_SL1500_.jpg', alt: 'Screen Magnifier Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71LK-Fd3t6L._AC_SX679_.jpg', alt: 'Screen Magnifier Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71SPpqk+Q7L._AC_SL1500_.jpg', alt: 'Screen Magnifier Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71t5PNrKbKL._AC_SL1500_.jpg', alt: 'Screen Magnifier Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 577 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'screen-magnifier', 'phone-accessory', '3d', 'foldable', 'stand'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 24 Copy 2 - 16 inch Screen Magnifier (Image 3 as primary)
    {
      _id: 'product-screen-magnifier-copy2',
      productNumber: 24,
      name: '16 inch Screen Magnifier for Cell Phone 3D Magnifier Screen Enlarger for Movies,Videos,Reading,Gaming-Screen Amplifie with Foldable Phone Stand Holder. Compatible with All Smartphones-White',
      slug: '16-inch-screen-magnifier-for-cell-phone-3d-magnifier-screen-enlarger-for-moviesvideosreadinggaming-screen-amplifie-with-foldable-phone-stand-holder-compatible-with-all-smartphones-white-v3',
      description: '16-inch screen magnifier for cell phones with 3D magnifier screen enlarger. Perfect for movies, videos, reading, and gaming. Includes foldable phone stand holder, compatible with all smartphones.',
      price: 23.20,
      originalPrice: 23.20,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71SPpqk+Q7L._AC_SL1500_.jpg', alt: 'Screen Magnifier Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71LK-Fd3t6L._AC_SX679_.jpg', alt: 'Screen Magnifier Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/714SzEeeoLL._AC_SL1500_.jpg', alt: 'Screen Magnifier Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71t5PNrKbKL._AC_SL1500_.jpg', alt: 'Screen Magnifier Usage', isPrimary: false }
      ],
      rating: { average: 4.6, count: 577 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['electronics', 'screen-magnifier', 'phone-accessory', '3d', 'foldable', 'stand'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 25 Copy 1 - Bitzee Interactive Toy (Image 2 as primary)
    {
      _id: 'product-bitzee-interactive-toy-copy1',
      productNumber: 25,
      name: 'Bitzee, Interactive Toy Digital Pet with 15 Animals Inside, Virtual Electronic Pets React to Touch, Kids Toys for Girls and Boys',
      slug: 'bitzee-interactive-toy-digital-pet-with-15-animals-inside-virtual-electronic-pets-react-to-touch-kids-toys-for-girls-and-boys-v2',
      description: 'Interactive digital pet toy with 15 different animals inside. Virtual electronic pets that react to touch. Perfect toy for girls and boys.',
      price: 36.99,
      originalPrice: 36.99,
      category: 'toys',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81t89hgKo6L._AC_SL1500_.jpg', alt: 'Bitzee Toy Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/716BajcQptL._AC_SL1500_.jpg', alt: 'Bitzee Toy Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81gpb4CEjBL._AC_SL1500_.jpg', alt: 'Bitzee Toy Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81q8fU6oQgL._AC_SL1500_.jpg', alt: 'Bitzee Toy Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 8117 },
      isFeatured: false,
      isTrending: true,
      brand: 'Bitzee',
      inStock: true,
      tags: ['toys', 'interactive', 'digital-pet', 'electronic', 'touch-reactive', 'children'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 25 Copy 2 - Bitzee Interactive Toy (Image 3 as primary)
    {
      _id: 'product-bitzee-interactive-toy-copy2',
      productNumber: 25,
      name: 'Bitzee, Interactive Toy Digital Pet with 15 Animals Inside, Virtual Electronic Pets React to Touch, Kids Toys for Girls and Boys',
      slug: 'bitzee-interactive-toy-digital-pet-with-15-animals-inside-virtual-electronic-pets-react-to-touch-kids-toys-for-girls-and-boys-v3',
      description: 'Interactive digital pet toy with 15 different animals inside. Virtual electronic pets that react to touch. Perfect toy for girls and boys.',
      price: 36.99,
      originalPrice: 36.99,
      category: 'toys',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81gpb4CEjBL._AC_SL1500_.jpg', alt: 'Bitzee Toy Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/716BajcQptL._AC_SL1500_.jpg', alt: 'Bitzee Toy Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81t89hgKo6L._AC_SL1500_.jpg', alt: 'Bitzee Toy Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81q8fU6oQgL._AC_SL1500_.jpg', alt: 'Bitzee Toy Usage', isPrimary: false }
      ],
      rating: { average: 4.7, count: 8117 },
      isFeatured: true,
      isTrending: false,
      brand: 'Bitzee',
      inStock: true,
      tags: ['toys', 'interactive', 'digital-pet', 'electronic', 'touch-reactive', 'children'],
      affiliateUrl: 'https://amzn.to/4nrC9XR'
    },

    // Product 26 Copy 1 - JBL Clip 4 Bluetooth Speaker (Image 2 as primary)
    {
      _id: 'product-jbl-clip-4-speaker-copy1',
      productNumber: 26,
      name: 'JBL Clip 4 - Portable Mini Bluetooth Speaker, big audio and punchy bass, integrated carabiner, IP67 waterproof and dustproof, 10 hours of playtime, speaker for home, outdoor and travel (Black)',
      slug: 'jbl-clip-4-portable-mini-bluetooth-speaker-big-audio-and-punchy-bass-integrated-carabiner-ip67-waterproof-and-dustproof-10-hours-of-playtime-speaker-for-home-outdoor-and-travel-black-v2',
      description: 'Portable mini Bluetooth speaker with big audio and punchy bass. Features integrated carabiner, IP67 waterproof and dustproof rating, 10 hours of playtime. Perfect for home, outdoor, and travel.',
      price: 46.95,
      originalPrice: 46.95,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71AC7CR3MDL._AC_SL1200_.jpg', alt: 'JBL Clip 4 Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/712bkrVtjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/710tqtuNjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81y2odwsmSL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 34039 },
      isFeatured: false,
      isTrending: true,
      brand: 'JBL',
      inStock: true,
      tags: ['electronics', 'bluetooth-speaker', 'portable', 'waterproof', 'carabiner', 'travel'],
      affiliateUrl: 'https://amzn.to/42URtEV'
    },

    // Product 26 Copy 2 - JBL Clip 4 Bluetooth Speaker (Image 3 as primary)
    {
      _id: 'product-jbl-clip-4-speaker-copy2',
      productNumber: 26,
      name: 'JBL Clip 4 - Portable Mini Bluetooth Speaker, big audio and punchy bass, integrated carabiner, IP67 waterproof and dustproof, 10 hours of playtime, speaker for home, outdoor and travel (Black)',
      slug: 'jbl-clip-4-portable-mini-bluetooth-speaker-big-audio-and-punchy-bass-integrated-carabiner-ip67-waterproof-and-dustproof-10-hours-of-playtime-speaker-for-home-outdoor-and-travel-black-v3',
      description: 'Portable mini Bluetooth speaker with big audio and punchy bass. Features integrated carabiner, IP67 waterproof and dustproof rating, 10 hours of playtime. Perfect for home, outdoor, and travel.',
      price: 46.95,
      originalPrice: 46.95,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/710tqtuNjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/712bkrVtjHL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71AC7CR3MDL._AC_SL1200_.jpg', alt: 'JBL Clip 4 Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/81y2odwsmSL._AC_SL1500_.jpg', alt: 'JBL Clip 4 Usage', isPrimary: false }
      ],
      rating: { average: 4.8, count: 34039 },
      isFeatured: true,
      isTrending: false,
      brand: 'JBL',
      inStock: true,
      tags: ['electronics', 'bluetooth-speaker', 'portable', 'waterproof', 'carabiner', 'travel'],
      affiliateUrl: 'https://amzn.to/42URtEV'
    },

    // Product 27 Copy 1 - Samsung Galaxy Watch Ultra (Image 2 as primary)
    {
      _id: 'product-samsung-galaxy-watch-ultra-copy1',
      productNumber: 27,
      name: 'Samsung Galaxy Watch Ultra (2024) 47mm LTE AI Smartwatch w/Energy Score, Wellness Tips, Heart Rate Tracking, Sleep Monitor, Fitness Tracker, GPS,Titanium Silver [US Version, 1Yr Manufacturer Warranty]',
      slug: 'samsung-galaxy-watch-ultra-2024-47mm-lte-ai-smartwatch-wenergy-score-wellness-tips-heart-rate-tracking-sleep-monitor-fitness-tracker-gpstitanium-silver-us-version-1yr-manufacturer-warranty-v2',
      description: 'Samsung Galaxy Watch Ultra 47mm LTE AI smartwatch with energy score, wellness tips, heart rate tracking, sleep monitoring, fitness tracking, and GPS. Titanium silver with 1-year manufacturer warranty.',
      price: 449,
      originalPrice: 449,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71LYrwpBxPL._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/817QHxxq34L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/61WGpLzX--L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 817 },
      isFeatured: false,
      isTrending: true,
      brand: 'Samsung',
      inStock: true,
      tags: ['electronics', 'smartwatch', 'samsung', 'galaxy-watch', 'fitness-tracker', 'gps', 'lte'],
      affiliateUrl: 'https://amzn.to/4qrVRFw'
    },

    // Product 27 Copy 2 - Samsung Galaxy Watch Ultra (Image 3 as primary)
    {
      _id: 'product-samsung-galaxy-watch-ultra-copy2',
      productNumber: 27,
      name: 'Samsung Galaxy Watch Ultra (2024) 47mm LTE AI Smartwatch w/Energy Score, Wellness Tips, Heart Rate Tracking, Sleep Monitor, Fitness Tracker, GPS,Titanium Silver [US Version, 1Yr Manufacturer Warranty]',
      slug: 'samsung-galaxy-watch-ultra-2024-47mm-lte-ai-smartwatch-wenergy-score-wellness-tips-heart-rate-tracking-sleep-monitor-fitness-tracker-gpstitanium-silver-us-version-1yr-manufacturer-warranty-v3',
      description: 'Samsung Galaxy Watch Ultra 47mm LTE AI smartwatch with energy score, wellness tips, heart rate tracking, sleep monitoring, fitness tracking, and GPS. Titanium silver with 1-year manufacturer warranty.',
      price: 449,
      originalPrice: 449,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61WGpLzX--L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/817QHxxq34L._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Front', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71LYrwpBxPL._AC_SL1500_.jpg', alt: 'Samsung Galaxy Watch Ultra Side', isPrimary: false }
      ],
      rating: { average: 4.6, count: 817 },
      isFeatured: true,
      isTrending: false,
      brand: 'Samsung',
      inStock: true,
      tags: ['electronics', 'smartwatch', 'samsung', 'galaxy-watch', 'fitness-tracker', 'gps', 'lte'],
      affiliateUrl: 'https://amzn.to/4qrVRFw'
    },

    // Product 1 Copy 1 - DreamQuest Support Windows Computers (Image 2 as primary)
    {
      _id: 'product-1-copy1',
      productNumber: 1,
      name: 'DreamQuest Support Windows Computers Bluetooth5-3',
      slug: 'dreamquest-support-windows-computers-bluetooth5-3-v2',
      description: 'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/714MXVDkijL._AC_SL1500_.jpg', alt: 'DreamQuest Computer Support Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71Z401LjFFL._AC_SL1500_.jpg', alt: 'DreamQuest Computer Support', isPrimary: false }
      ],
      rating: { average: 4.6, count: 0 },
      isFeatured: false,
      isTrending: true,
      brand: 'DreamQuest',
      inStock: true,
      tags: ['electronics', 'computer', 'support', 'bluetooth'],
      affiliateUrl: 'https://amzn.to/478mN4d'
    },

    // Product 1 Copy 2 - DreamQuest Support Windows Computers (Image 3 as primary)
    {
      _id: 'product-1-copy2',
      productNumber: 1,
      name: 'DreamQuest Support Windows Computers Bluetooth5-3',
      slug: 'dreamquest-support-windows-computers-bluetooth5-3-v3',
      description: 'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71Z401LjFFL._AC_SL1500_.jpg', alt: 'DreamQuest Computer Support', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/714MXVDkijL._AC_SL1500_.jpg', alt: 'DreamQuest Computer Support Detail', isPrimary: false }
      ],
      rating: { average: 4.6, count: 0 },
      isFeatured: true,
      isTrending: false,
      brand: 'DreamQuest',
      inStock: true,
      tags: ['electronics', 'computer', 'support', 'bluetooth'],
      affiliateUrl: 'https://amzn.to/478mN4d'
    },

    // Product 2 Copy 1 - Huidun Laptops Computer Business (Image 2 as primary)
    {
      _id: 'product-2-copy1',
      productNumber: 2,
      name: 'Huidun Laptops Computer Business Quad-Core',
      slug: 'huidun-laptops-computer-business-quad-core-v2',
      description: 'Business laptop with quad-core processor for professional computing needs.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71TlVU8NwVL._AC_SL1500_.jpg', alt: 'Huidun Laptop Side', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71lIO9V46sL._AC_SL1500_.jpg', alt: 'Huidun Laptop', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71IKXFXwibL._AC_SL1500_.jpg', alt: 'Huidun Laptop Keyboard', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71tzRV8BBkL._AC_SL1500_.jpg', alt: 'Huidun Laptop Screen', isPrimary: false }
      ],
      rating: { average: 4.7, count: 0 },
      isFeatured: true,
      isTrending: false,
      brand: 'Huidun',
      inStock: true,
      tags: ['electronics', 'laptop', 'business', 'quad-core'],
      affiliateUrl: 'https://www.amazon.com/Huidun-Laptops-Computer-Business-Quad-Core/dp/B0FBRP3VG8?crid=3AVKTSZ7HOQRK&dib=eyJ2IjoiMSJ9.HbzpBJ1F9FbiB-b7h_UTNVFelnWTuV0A-sIGYuScf2Ew7IKbHV_W_JOkx19n886qH8UxNOWPMRel-mChaetRjYt4NFkX3xDT-J4mOqLYMVMBweDxCvq84V1HJkwWG99OyU8IvxQhzn6z0aN515WCKuZOmiHAnWQBe2ZzSFCa3ASFZWQ9kVpe1To-xy09mIOxzNvK9GvXSM5bfx_-FXnHnQIophsq-u_yvRtIdehzLyo.vOe6OglW_9MsyMquBRev9P15iS4usBIFQ_36X10rd7Q&dib_tag=se&keywords=computer&qid=1760758080&sprefix=computer%2Caps%2C342&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=fc7ee0b405f96fe2d78b5292a3c44553&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 2 Copy 2 - Huidun Laptops Computer Business (Image 3 as primary)
    {
      _id: 'product-2-copy2',
      productNumber: 2,
      name: 'Huidun Laptops Computer Business Quad-Core',
      slug: 'huidun-laptops-computer-business-quad-core-v3',
      description: 'Business laptop with quad-core processor for professional computing needs.',
      price: 0,
      originalPrice: 0,
      category: 'electronics',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71IKXFXwibL._AC_SL1500_.jpg', alt: 'Huidun Laptop Keyboard', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71lIO9V46sL._AC_SL1500_.jpg', alt: 'Huidun Laptop', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71TlVU8NwVL._AC_SL1500_.jpg', alt: 'Huidun Laptop Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71tzRV8BBkL._AC_SL1500_.jpg', alt: 'Huidun Laptop Screen', isPrimary: false }
      ],
      rating: { average: 4.7, count: 0 },
      isFeatured: false,
      isTrending: true,
      brand: 'Huidun',
      inStock: true,
      tags: ['electronics', 'laptop', 'business', 'quad-core'],
      affiliateUrl: 'https://www.amazon.com/Huidun-Laptops-Computer-Business-Quad-Core/dp/B0FBRP3VG8?crid=3AVKTSZ7HOQRK&dib=eyJ2IjoiMSJ9.HbzpBJ1F9FbiB-b7h_UTNVFelnWTuV0A-sIGYuScf2Ew7IKbHV_W_JOkx19n886qH8UxNOWPMRel-mChaetRjYt4NFkX3xDT-J4mOqLYMVMBweDxCvq84V1HJkwWG99OyU8IvxQhzn6z0aN515WCKuZOmiHAnWQBe2ZzSFCa3ASFZWQ9kVpe1To-xy09mIOxzNvK9GvXSM5bfx_-FXnHnQIophsq-u_yvRtIdehzLyo.vOe6OglW_9MsyMquBRev9P15iS4usBIFQ_36X10rd7Q&dib_tag=se&keywords=computer&qid=1760758080&sprefix=computer%2Caps%2C342&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=fc7ee0b405f96fe2d78b5292a3c44553&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 3 Copy 1 - Cordless Robotic Pool Cleaner (Image 2 as primary)
    {
      _id: 'product-3-copy1',
      productNumber: 3,
      name: 'Cordless Robotic Pool Cleaner – 150 Mins Runtime, IPX8 Waterproof, 2200 Sq Ft Coverage, Powerful Automatic Pool Vacuum Robot for In-Ground & Above-Ground Pools, Quick Charging, Dual Brushes',
      slug: 'cordless-robotic-pool-cleaner-150-mins-runtime-ipx8-waterproof-2200-sq-ft-coverage-powerful-automatic-pool-vacuum-robot-for-in-ground-above-ground-pools-quick-charging-dual-brushes-v2',
      description: 'Advanced cordless robotic pool cleaner with 150 minutes runtime and IPX8 waterproof rating for complete pool maintenance.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71NihcTbfVL._AC_SL1500_.jpg', alt: 'Pool Cleaner Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71cdqL6rWjL._AC_SL1500_.jpg', alt: 'Robotic Pool Cleaner', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71FpAA3YvBL._AC_SL1500_.jpg', alt: 'Pool Cleaner Brushes', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/7137SMAraHL._AC_SL1500_.jpg', alt: 'Pool Cleaner Charging', isPrimary: false }
      ],
      rating: { average: 4.8, count: 345 },
      isFeatured: false,
      isTrending: true,
      brand: 'Generic',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'robotic'],
      affiliateUrl: 'https://www.amazon.com/Cordless-Robotic-Pool-Cleaner-Ground/dp/B0FK4FKWPZ?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot+piscina&qid=1760796004&sprefix=robot+piscina%2Caps%2C330&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll1&tag=adsmarket08-20&linkId=fe12ab24bf40176fc47a8f3fe0a6427c&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 3 Copy 2 - Cordless Robotic Pool Cleaner (Image 3 as primary)
    {
      _id: 'product-3-copy2',
      productNumber: 3,
      name: 'Cordless Robotic Pool Cleaner – 150 Mins Runtime, IPX8 Waterproof, 2200 Sq Ft Coverage, Powerful Automatic Pool Vacuum Robot for In-Ground & Above-Ground Pools, Quick Charging, Dual Brushes',
      slug: 'cordless-robotic-pool-cleaner-150-mins-runtime-ipx8-waterproof-2200-sq-ft-coverage-powerful-automatic-pool-vacuum-robot-for-in-ground-above-ground-pools-quick-charging-dual-brushes-v3',
      description: 'Advanced cordless robotic pool cleaner with 150 minutes runtime and IPX8 waterproof rating for complete pool maintenance.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71FpAA3YvBL._AC_SL1500_.jpg', alt: 'Pool Cleaner Brushes', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/71cdqL6rWjL._AC_SL1500_.jpg', alt: 'Robotic Pool Cleaner', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71NihcTbfVL._AC_SL1500_.jpg', alt: 'Pool Cleaner Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/7137SMAraHL._AC_SL1500_.jpg', alt: 'Pool Cleaner Charging', isPrimary: false }
      ],
      rating: { average: 4.8, count: 345 },
      isFeatured: true,
      isTrending: false,
      brand: 'Generic',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'robotic'],
      affiliateUrl: 'https://www.amazon.com/Cordless-Robotic-Pool-Cleaner-Ground/dp/B0FK4FKWPZ?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot+piscina&qid=1760796004&sprefix=robot+piscina%2Caps%2C330&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll1&tag=adsmarket08-20&linkId=fe12ab24bf40176fc47a8f3fe0a6427c&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 4 Copy 1 - WYBOT C2 Vision Cordless Pool Cleaner (Image 2 as primary)
    {
      _id: 'product-4-copy1',
      productNumber: 4,
      name: 'WYBOT C2 Vision Cordless Pool Cleaner with Camera, 8-in-1 Pool Vacuum for Inground Pools, Powerful Suction, Ultra-Fine Filter System Pool Robot, Wall Climbing Navigation, Gray',
      slug: 'wybot-c2-vision-cordless-pool-cleaner-with-camera-8-in-1-pool-vacuum-for-inground-pools-powerful-suction-ultra-fine-filter-system-pool-robot-wall-climbing-navigation-gray-v2',
      description: 'Advanced pool cleaner with camera technology, 8-in-1 functionality, and wall climbing navigation for complete pool cleaning.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71d83jk0UWL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Detail', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61Lce9JQjnL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71h7XR4IbqL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Camera', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yNT0gNnZL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Filter', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/811eyTO0rcL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Navigation', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71td5Ciu9FL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Accessories', isPrimary: false }
      ],
      rating: { average: 4.9, count: 128 },
      isFeatured: false,
      isTrending: true,
      brand: 'WYBOT',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'camera'],
      affiliateUrl: 'https://www.amazon.com/WYBOT-Cordless-Inground-Ultra-Fine-Navigation/dp/B0FM7RHT4H?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot%2Bpiscina&qid=1760796004&sprefix=robot%2Bpiscina%2Caps%2C330&sr=8-6&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=d7308d4087f7d7cba5146f951768b756&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 4 Copy 2 - WYBOT C2 Vision Cordless Pool Cleaner (Image 3 as primary)
    {
      _id: 'product-4-copy2',
      productNumber: 4,
      name: 'WYBOT C2 Vision Cordless Pool Cleaner with Camera, 8-in-1 Pool Vacuum for Inground Pools, Powerful Suction, Ultra-Fine Filter System Pool Robot, Wall Climbing Navigation, Gray',
      slug: 'wybot-c2-vision-cordless-pool-cleaner-with-camera-8-in-1-pool-vacuum-for-inground-pools-powerful-suction-ultra-fine-filter-system-pool-robot-wall-climbing-navigation-gray-v3',
      description: 'Advanced pool cleaner with camera technology, 8-in-1 functionality, and wall climbing navigation for complete pool cleaning.',
      price: 0,
      originalPrice: 0,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/71h7XR4IbqL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Camera', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/61Lce9JQjnL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71d83jk0UWL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71yNT0gNnZL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Filter', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/811eyTO0rcL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Navigation', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71td5Ciu9FL._AC_SL1500_.jpg', alt: 'WYBOT Pool Cleaner Accessories', isPrimary: false }
      ],
      rating: { average: 4.9, count: 128 },
      isFeatured: true,
      isTrending: false,
      brand: 'WYBOT',
      inStock: true,
      tags: ['home', 'pool', 'cleaner', 'camera'],
      affiliateUrl: 'https://www.amazon.com/WYBOT-Cordless-Inground-Ultra-Fine-Navigation/dp/B0FM7RHT4H?crid=1GH011HVF49PQ&dib=eyJ2IjoiMSJ9.1Ig_2kXfg5Q-FozjHXWToPgDzSRJjOoEOcKxytOHSpfwoRvfFZP-lWYkQ4Mgr_CpsZ4xGi_UQseZb176SoWr_1fSZGueHyJI7H9KtuvP_mRTd1hEi2laSBXlK_UjlOdNMp0zQsd1dpiGZUJPm9xZj2Y53GmkGUuAt79CMZyWHQNiPK7836I_m0o-3IWki2LgqOFWyqvdC7rfmmq67TdwsP3H-RRGUykHK3Ml28s_FC0.N9R0ipNb_8ZVhwRCmgfSnuPoo35SFHxPBXTnnrje3LY&dib_tag=se&keywords=robot%2Bpiscina&qid=1760796004&sprefix=robot%2Bpiscina%2Caps%2C330&sr=8-6&th=1&linkCode=ll1&tag=adsmarket08-20&linkId=d7308d4087f7d7cba5146f951768b756&language=en_US&ref_=as_li_ss_tl'
    },

    // Product 28 - Trendy Queen Women's Oversized Cable Knit Crewneck Sweaters
    {
      _id: 'product-trendy-queen-cable-knit-sweater',
      slug: 'trendy-queen-cable-knit-sweater',
      
      productNumber: 28,
      name: 'Trendy Queen Women\'s Oversized Cable Knit Crewneck Sweaters',
      description: 'Stylish oversized cable knit crewneck sweater for women. Perfect for casual wear with a trendy and comfortable design.',
      price: 39,
      originalPrice: 39,
      category: 'fashion',
      images: [
        { url: 'https://m.media-amazon.com/images/I/81oalmKiLvL._AC_SY879_.jpg', alt: 'Trendy Queen Cable Knit Sweater Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/81TReYIN1ZL._AC_SY879_.jpg', alt: 'Trendy Queen Cable Knit Sweater Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71vt2CYPyAL._AC_SY879_.jpg', alt: 'Trendy Queen Cable Knit Sweater Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71BxfG0OL1L._AC_SY879_.jpg', alt: 'Trendy Queen Cable Knit Sweater Back', isPrimary: false }
      ],
      rating: { average: 4.7, count: 1290 },
      isFeatured: true,
      isTrending: false,
      brand: 'Trendy Queen',
      inStock: true,
      tags: ['fashion', 'women', 'sweater', 'cable-knit', 'oversized', 'crewneck', 'casual'],
      affiliateUrl: 'https://amzn.to/3WiZQXf'
    },

    // Product 29 - boeemi Frog Toilet Bolt Covers Decorative Glow in The Dark
    {
      _id: 'product-boeemi-frog-toilet-bolt-covers',
      productNumber: 29,
      name: 'boeemi Frog Toilet Bolt Covers Decorative Glow in The Dark- 2PCs Toilet Screw Caps Luminous Green PLA Cute Bathroom Decor Accessories Push-on Install',
      slug: 'boeemi-frog-toilet-bolt-covers-decorative-glow-in-the-dark-2pcs-toilet-screw-caps-luminous-green-pla-cute-bathroom-decor-accessories-push-on-install',
      description: 'Decorative glow-in-the-dark frog toilet bolt covers. 2-piece set with luminous green PLA material for cute bathroom decor. Easy push-on installation.',
      price: 14.48,
      originalPrice: 14.48,
      category: 'home',
      images: [
        { url: 'https://m.media-amazon.com/images/I/61hevoyJucL._AC_SL1500_.jpg', alt: 'Boeemi Frog Toilet Bolt Covers Front', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/616IQwvkC4L._AC_SL1500_.jpg', alt: 'Boeemi Frog Toilet Bolt Covers Side', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71WBO30UsrL._AC_SL1500_.jpg', alt: 'Boeemi Frog Toilet Bolt Covers Detail', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/619HxovRRLL._AC_SL1500_.jpg', alt: 'Boeemi Frog Toilet Bolt Covers Glow', isPrimary: false }
      ],
      rating: { average: 4.6, count: 175 },
      isFeatured: false,
      isTrending: true,
      brand: 'boeemi',
      inStock: true,
      tags: ['home', 'bathroom', 'decor', 'toilet', 'glow-in-dark', 'cute', 'accessories', 'frog'],
      affiliateUrl: 'https://amzn.to/4hocaio'
    },

    // Product 30 - YRU True Military-Grade Car Phone Holder
    {
      _id: 'product-30',
      productNumber: 30,
      name: 'YRU True Military-Grade [360° Rotation Suction] 2025 Ultimate Car Phone Holder Mount 【90+LBS Safest Strongest & Patent Certs】 Dashboard Windshield Vent for iPhone 17 16 Pro Max Samsung, Gloss Black',
      slug: 'yru-true-military-grade-360-rotation-suction-2025-ultimate-car-phone-holder-mount-90lbs-safest-strongest-patent-certs-dashboard-windshield-vent-for-iphone-17-16-pro-max-samsung-gloss-black',
      description: 'Military-grade car phone holder with 360° rotation, 90+ lbs suction strength, and patent certifications. Compatible with iPhone 17, 16, Pro Max, Samsung and other smartphones.',
      price: 25.97,
      originalPrice: 25.97,
      category: 'automotive',
      images: [
        { url: 'https://m.media-amazon.com/images/I/712xBKWDniL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Main', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/513RREuJ6mL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 1', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51DwNKly0GL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/517miOTe-3L._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zC6qiiAUL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Installation', isPrimary: false }
      ],
      rating: { average: 4.8, count: 5000 },
      isFeatured: true,
      isTrending: true,
      brand: 'YRU',
      inStock: true,
      tags: ['automotive', 'phone-holder', 'car-accessories', 'military-grade', 'suction-mount', '360-rotation', 'dashboard', 'windshield', 'vent-mount'],
      affiliateUrl: 'https://amzn.to/4hocaio'
    },

    // Product 30 Copy 1 - YRU True Military-Grade Car Phone Holder (Image 2 as primary)
    {
      _id: 'product-30-copy1',
      productNumber: 30,
      name: 'YRU True Military-Grade [360° Rotation Suction] 2025 Ultimate Car Phone Holder Mount 【90+LBS Safest Strongest & Patent Certs】 Dashboard Windshield Vent for iPhone 17 16 Pro Max Samsung, Gloss Black',
      slug: 'yru-true-military-grade-360-rotation-suction-2025-ultimate-car-phone-holder-mount-90lbs-safest-strongest-patent-certs-dashboard-windshield-vent-for-iphone-17-16-pro-max-samsung-gloss-black-v2',
      description: 'Military-grade car phone holder with 360° rotation, 90+ lbs suction strength, and patent certifications. Compatible with iPhone 17, 16, Pro Max, Samsung and other smartphones.',
      price: 25.97,
      originalPrice: 25.97,
      category: 'automotive',
      images: [
        { url: 'https://m.media-amazon.com/images/I/513RREuJ6mL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 1', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/712xBKWDniL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Main', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/51DwNKly0GL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 2', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/517miOTe-3L._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zC6qiiAUL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Installation', isPrimary: false }
      ],
      rating: { average: 4.8, count: 5000 },
      isFeatured: false,
      isTrending: true,
      brand: 'YRU',
      inStock: true,
      tags: ['automotive', 'phone-holder', 'car-accessories', 'military-grade', 'suction-mount', '360-rotation', 'dashboard', 'windshield', 'vent-mount'],
      affiliateUrl: 'https://amzn.to/4hocaio'
    },

    // Product 30 Copy 2 - YRU True Military-Grade Car Phone Holder (Image 3 as primary)
    {
      _id: 'product-30-copy2',
      productNumber: 30,
      name: 'YRU True Military-Grade [360° Rotation Suction] 2025 Ultimate Car Phone Holder Mount 【90+LBS Safest Strongest & Patent Certs】 Dashboard Windshield Vent for iPhone 17 16 Pro Max Samsung, Gloss Black',
      slug: 'yru-true-military-grade-360-rotation-suction-2025-ultimate-car-phone-holder-mount-90lbs-safest-strongest-patent-certs-dashboard-windshield-vent-for-iphone-17-16-pro-max-samsung-gloss-black-v3',
      description: 'Military-grade car phone holder with 360° rotation, 90+ lbs suction strength, and patent certifications. Compatible with iPhone 17, 16, Pro Max, Samsung and other smartphones.',
      price: 25.97,
      originalPrice: 25.97,
      category: 'automotive',
      images: [
        { url: 'https://m.media-amazon.com/images/I/51DwNKly0GL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 2', isPrimary: true },
        { url: 'https://m.media-amazon.com/images/I/712xBKWDniL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Main', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/513RREuJ6mL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 1', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/517miOTe-3L._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Detail 3', isPrimary: false },
        { url: 'https://m.media-amazon.com/images/I/71zC6qiiAUL._AC_SX679_.jpg', alt: 'YRU Car Phone Holder Installation', isPrimary: false }
      ],
      rating: { average: 4.8, count: 5000 },
      isFeatured: true,
      isTrending: false,
      brand: 'YRU',
      inStock: true,
      tags: ['automotive', 'phone-holder', 'car-accessories', 'military-grade', 'suction-mount', '360-rotation', 'dashboard', 'windshield', 'vent-mount'],
      affiliateUrl: 'https://amzn.to/4hocaio'
    },
    
    // Kinetic Innovative Staffing Services LLC
    {
      _id: 'kinetic-staffing-services',
      productNumber: 282,
      name: 'Kinetic Innovative Staffing Services LLC',
      slug: 'kinetic-innovative-staffing-services-llc',
      description: 'Revolutionary remote staffing solutions since 2013. Access to over 9 million qualified professionals in the Philippines at costs up to 76% lower than local recruitment.',
      price: 0,
      originalPrice: 0,
      category: 'business',
      images: [
        { url: 'https://www.uc.edu/content/dam/uc/news/units/one-stop/summer-jobs.png/_jcr_content/renditions/cq5dam.web.1280.1280.png', alt: 'Kinetic Staffing Services - Professional Network', isPrimary: true },
        { url: 'https://tse4.mm.bing.net/th/id/OIP.8gx8AlZ0jXKLfnbr2e4ClwHaFj?pid=ImgDet&w=179&h=134&c=7&dpr=1.5&o=7&rm=3', alt: 'Kinetic Staffing Services - Digital Network Ecosystem', isPrimary: false }
      ],
      rating: { average: 4.8, count: 1250 },
      isFeatured: true,
      isTrending: true,
      inStock: true,
      brand: 'Kinetic',
      affiliateUrl: 'https://www.kineticstaff.com/share/v1/?ref=62a362f&linkId=1',
      specifications: {
        'Service Type': 'Remote Staffing Solutions',
        'Founded': '2013',
        'Talent Pool': '9+ Million Professionals',
        'Cost Savings': 'Up to 76%',
        'Recruitment Time': '3-5 Days',
        'Locations': 'Philippines, USA, Australia, Singapore, UK',
        'Specialties': 'Customer Support, Data Entry, Virtual Assistants, Technical Roles'
      },
      features: [
        'Access to 9+ million qualified professionals',
        'Cost savings up to 76% compared to local recruitment',
        'Fast recruitment process (3-5 days)',
        'International presence across multiple time zones',
        'Flexible team management',
        'Seamless integration with client processes',
        'High-quality talent pool',
        'Transparent pricing with no hidden fees'
      ],
      tags: ['remote-staffing', 'offshore-recruitment', 'business-services', 'talent-solutions', 'cost-effective', 'philippines', 'virtual-assistants']
    },
    
    // Kinetic Partnership Program
    {
      _id: 'kinetic-partnership-program',
      productNumber: 283,
      name: 'Devenir Partenaire Kinetic',
      slug: 'devenir-partenaire-kinetic',
      description: 'Strategic partnership program for businesses seeking to optimize human resources. Join Kinetic to access global talent pool, reduce costs, and increase competitiveness in the digital economy.',
      price: 0,
      originalPrice: 0,
      category: 'business',
      images: [
        { url: 'https://tse4.mm.bing.net/th/id/OIP.MiFi-iU4-Rk4XEHIR4X3HAHaFN?pid=ImgDet&w=179&h=126&c=7&dpr=1.5&o=7&rm=3', alt: 'Kinetic Partnership Program - Business Collaboration', isPrimary: true },
        { url: 'https://www.uc.edu/content/dam/uc/news/units/one-stop/summer-jobs.png/_jcr_content/renditions/cq5dam.web.1280.1280.png', alt: 'Kinetic Partnership Program - Professional Network', isPrimary: false }
      ],
      rating: { average: 4.9, count: 890 },
      isFeatured: true,
      isTrending: true,
      inStock: true,
      brand: 'Kinetic',
      affiliateUrl: 'https://www.kineticstaff.com/client-referral-program/?ref=62a362f',
      specifications: {
        'Program Type': 'Strategic Partnership',
        'Target': 'Businesses & Enterprises',
        'Benefits': 'Cost Optimization & Talent Access',
        'Flexibility': 'Scalable Solutions',
        'Support': '24/7 International Support',
        'Integration': 'Seamless Process Integration',
        'ROI': 'Proven Return on Investment',
        'Growth': 'Business Scalability'
      },
      features: [
        'Strategic partnership for business growth',
        'Access to global talent marketplace',
        'Cost optimization and reduction',
        'Scalable workforce solutions',
        '24/7 international support',
        'Seamless integration with existing processes',
        'Proven ROI and business results',
        'Flexible partnership terms'
      ],
      tags: ['partnership', 'business-growth', 'strategic-alliance', 'talent-marketplace', 'cost-optimization', 'scalability', 'roi', 'business-solutions']
    }
  ];
  
  // Normaliser les ratings avec distribution: 4.6, 4.7, 4.8, 4.9, 5.0
  return normalizeRatings(products);
};

// Function to normalize ratings with distribution: 4.6, 4.7, 4.8, 4.9, 5.0
const normalizeRatings = (products) => {
  const ratingOptions = [4.6, 4.7, 4.8, 4.9, 5.0];
  
  return products.map((product, index) => {
    if (product.rating && product.rating.average < 4.6) {
      // Distribute ratings across the 5 options
      const ratingIndex = index % ratingOptions.length;
      product.rating.average = ratingOptions[ratingIndex];
    }
    return product;
  });
};

export const getFeaturedProducts = () => {
  return getSampleProducts().filter(product => product.isFeatured);
};

export const getTrendingProducts = () => {
  return getSampleProducts().filter(product => product.isTrending);
};

export const getAllProducts = () => {
  return getSampleProducts();
};