import Transaction from '../models/transactionModel.js';
import Category from '../models/categoryModel.js';
import Sequelize from 'sequelize';

// Spending over time
export const getSpendingOverTime = async (startDate, endDate) => {
  try {
    return await Transaction.findAll({
      include: [{
        model: Category,
        as: 'category',
        where: { name: 'Expense' }
      }],
      where: {
        date: { 
          [Sequelize.Op.gte]: new Date(startDate),
          [Sequelize.Op.lte]: new Date(endDate)
        }
      },
      attributes: [
        [Sequelize.fn('month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount']
      ],
      group: [Sequelize.fn('month', Sequelize.col('date'))],
      order: [[Sequelize.fn('month', Sequelize.col('date')), 'ASC']]
    });
  } catch (error) {
    console.error("Error in getting spending over time:", error);
    throw error;
  }
};

// Category-wise Spending
/*export const getCategoryWiseSpending = async (startDate, endDate) => {
  try {
    if (!(startDate instanceof Date) && !(endDate instanceof Date)) {
      throw new Error('Invalid date parameters');
    }

    return await Transaction.findAll({
      include: [{
        model: Category,
        as: 'category'
      }],
      where: {
        date: {
          [Sequelize.Op.gte]: startDate,
          [Sequelize.Op.lte]: endDate
        }
      },
      attributes: [
        'categoryId',
        [Sequelize.fn('sum', Sequelize.col('amount')), 'totalAmount'],
        [Sequelize.col('category.name'), 'name']
      ],
      group: ['categoryId', 'category.name']
    });
  } catch (error) {
    console.error("Error in getting category-wise spending:", error);
    throw error;
  }
};*/

// Monthly Income vs Expense
export const getMonthlyIncomeVsExpense = async (startDate, endDate) => {
  try {
    if (!(startDate instanceof Date) && !(endDate instanceof Date)) {
      throw new Error('Invalid date parameters');
    }

    return await Transaction.findAll({
      include: [{
        model: Category,
        as: 'category'
      }],
      where: {
        date: {
          [Sequelize.Op.gte]: startDate,
          [Sequelize.Op.lte]: endDate
        }
      },
      attributes: [
        [Sequelize.fn('month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('sum', Sequelize.col('amount')), 'totalIncome',
          Sequelize.where(Sequelize.col('category.name'), 'Income')],
        [Sequelize.fn('sum', Sequelize.col('amount')), 'totalExpense',
          Sequelize.where(Sequelize.col('category.name'), { [Sequelize.Op.ne]: 'Income' })]
      ],
      group: [Sequelize.fn('month', Sequelize.col('date'))],
      order: [[Sequelize.fn('month', Sequelize.col('date')), 'ASC']]
    });
  } catch (error) {
    console.error("Error in getting monthly income vs expense:", error);
    throw error;
  }
};
