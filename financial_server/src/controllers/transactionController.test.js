import { addTransaction } from '../controllers/transactionController.js';
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
        categoryId: 1, // existing ID
        descriptionId: 1, // existing ID
        amount: 100.00,
        date: new Date(),
      },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Mock the findByPk method to simulate found category and description
    Category.findByPk.mockResolvedValue({ id: 1, name: 'Vehicle' });
    Description.findByPk.mockResolvedValue({ id: 1, name: 'HONDA PMT' });
    Transaction.create.mockResolvedValue({
      id: 1,
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
