import xlsx from 'xlsx';
import sequelize from "../services/connectionService.js";
import mappingController from './mappingController.js';
import categoryController from './categoryController.js';
import descriptionController from './descriptionController.js';

const parsingController = {
  getCategoryFromDescription: (description, categoryKeywords) => {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => description.includes(keyword))) {
            return category;
        }
    }
    return null; 
  },

  readXLSXFile: async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 13 });

    for (let i = 1; i < data.length; i++) {
      const [transDate, , description, amount] = data[i];
      // Assume getCategoryFromDescription, getCategoryId, getDescriptionId are defined
      const categoryName = mappingController.getCategoryFromDescription(description);
      if (categoryName) {
        const categoryId = await categoryController.getCategories(categoryName);
        const descriptionId = await descriptionController.getDescriptions(description);
        const parsedDate = parsedDate(transDate); 

        await sequelize.query('EXEC sp_addTransaction @categoryId = :categoryId, @descriptionId = :descriptionId, @amount = :amount, @date = :date', {
          replacements: { categoryId, descriptionId, amount: parseFloat(amount), date: parsedDate }
        });
      }
    }
  },

  parseDate: (dateStr) => {
    if (!dateStr) return new Date(); 
    const parts = dateStr.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  },



  extractKeyword: (descriptionText) => {
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        const foundKeyword = keywords.find(keyword => descriptionText.includes(keyword));
        if (foundKeyword) {
          return foundKeyword; 
        }
      }
      return null; 
    }
};

export default parsingController;