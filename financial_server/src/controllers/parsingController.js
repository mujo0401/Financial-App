import fs from 'fs';
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

  readTextFile: async (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n'); // Adjust this if your file uses a different line delimiter

    for (let line of lines) {
      const fields = line.split(','); // Adjust the delimiter based on your file's format
      const [transDate, , description, amount] = fields;

      const categoryName = mappingController.getCategoryFromDescription(description);
      if (categoryName) {
        const categoryId = await categoryController.getCategories(categoryName);
        const descriptionId = await descriptionController.getDescriptions(description);
        const parsedDate = this.parseDate(transDate); 

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