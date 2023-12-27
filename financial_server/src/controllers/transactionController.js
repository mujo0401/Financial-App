import Category from '../models/categoryModel.js';
import Description from '../models/descriptionModel.js';
import TransactionDetails from '../models/transactionModel.js';

const addTransaction = async (req, res) => {
  const { id, categoryId, descriptionId, amount, date } = req.body;

  try {
    // Check if the category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      console.log(`Category not found for id: ${categoryId}`); 
      return res.status(400).send({ error: 'Category not found' });
    }

    // Check if the description exists
    const description = await Description.findByPk(descriptionId);
    if (!description) {
      console.log(`Looking up description with id: ${descriptionId}`);
      return res.status(400).send({ error: 'Description not found' });
    }

    // Create transaction
    const newTransaction = await TransactionDetails.create({ 
      id,
      categoryId,
      descriptionId,
      amount, 
      date });

    // Send the newly created transaction in the response
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Transaction creation failed:', error);
    res.status(400).json({ error: error.message });
  }
};

export { addTransaction };