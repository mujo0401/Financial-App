// Import dependencies
import categoryController from '../controllers/categoryController.js'; 


// Mock Category model
jest.mock('../models/categoryModel', () => ({
    Category: {
      findAll: jest.fn()
    }
  }));

import categoryModel from '../models/categoryModel';
const { Category } = categoryModel;

describe('getCategories', () => {
  let mockRequest;
  let mockResponse;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis()
    };
  });

  it('should return categories successfully', async () => {
    // Mock data
    const mockCategories = [{ id: 1, name: 'Vehicle' }, { id: 2, name: 'Income' }];
    Category.findAll.mockResolvedValue(mockCategories);

    // Call the function
    await getCategories(mockRequest, mockResponse);

    // Assertions
    expect(Category.findAll).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(mockCategories);
  });

  it('should handle errors when fetching categories', async () => {
    // Mock error
    Category.findAll.mockRejectedValue(new Error('Database Error'));

    // Call the function
    await categoryController.getCategories(mockRequest, mockResponse);

    // Assertions
    expect(Category.findAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error fetching categories' });
  });
});
