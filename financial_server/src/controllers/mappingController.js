const MappingController = {
  getCategoryKeywords: async (req, res) => {
    const mapping = {
      "Medical": ["MAYO CLINIC", "North Memorial", "Park Nicollet", "Amazon Pharmacy"],
      "Phone": ["ATT"],
      "Streaming Services": ["FULGAZ", "PRIME VIDEO", "YOUTUBEPREMIUM", "ESPN PLUS", "NETFLIX", "Strava", "SLING", "CHATGPT"],
      "Software Subscriptions": ["MICROSOFT 36", "GITHUB", "GODADDY"],
      "Groceries": ["CUB FOODS", "LUNDS&BYERLYS", "WALMART"],
      "Internet": ["COMBAST CABLE"],
      "Vape Carts": ["3CHi", "LOVE IS AN INGREDI", "MAINSTREAM"],
      "Magni&Sanders": ["FETCH", "PETCO"],
      "Laundry": ["BDS LAUNDRY"],
      "Vehicle": ["STATE FARM INSURANCE", "HOLIDAY STATIONS", "HONDA PMT"],
      "Rent": ["SAGE"],
      "Income": ["OLDREPUBLICTTLPAYROLL"],
      "Discover Payment": ["DISCOVERE-PAYMENT"],
      "Utilities": ["XCELENERGY"],
      "Gaming": ["STEAM", "BLIZZARD", "NINTENDO"],
      "Fast Food": ["RAISING CANE'S"],
      "Online Shopping": ["AMAZON"]
    };
    res.json(mapping);
  }
};

export default MappingController;