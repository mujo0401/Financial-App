import { addTransaction } from '../transactionController.js';
import Category from '../models/categoryModel.js';
import Description from '../models/descriptionModel.js';
import Transaction from '../models/transactionModel.js';

// Mock the Sequelize model methods you use
jest.mock('../models/categoryModel.js', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../models/descriptionModel.js', () => ({
  findByPk: jest.fn(),
}));
jest.mock('../models/transactionModel.js', () => ({
  create: jest.fn(),
}));

describe('addTransaction', () => {
  // Setup for the test
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Category.findByPk.mockClear();
    Description.findByPk.mockClear();
    Transaction.create.mockClear();
  });

  it('should create a transaction when provided with valid category and description IDs', async () => {
    // Arrange
    const req = {
      body: {
        categoryId: 1, 
        descriptionId: 1, 
        amount: 100.00,
        date: '2023-12-18'
      },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Mock the findByPk method to simulate found category and description
    Category.findByPk.mockResolvedValue({ categoryId: 1, name: 'Phone' });
    Description.findByPk.mockResolvedValue({ cdescriptionId: 1, name: 'ATT' });
    Transaction.create.mockResolvedValue({
      transactionDetailId: 1,
      categoryId: req.body.categoryId,
      descriptionId: req.body.descriptionId,
      amount: req.body.amount,
      date: req.body.date,
    });

    // Act
    await addTransaction(req, res);

    // Assert
    expect(Category.findByPk).toHaveBeenCalledWith(1);
    expect(Description.findByPk).toHaveBeenCalledWith(1);
    expect(Transaction.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

});
