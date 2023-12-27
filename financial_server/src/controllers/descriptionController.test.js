// Import dependencies
import Description from '../models/descriptionModel';
import descriptionController from '../controllers/descriptionController.js'; 


// Mock Category model
jest.mock('../models/descriptionModel', () => ({
  findAll: jest.fn()
}));

describe('getDescriptions', () => {
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

  it('should return descriptions successfully', async () => {
    // Mock data
    const mockDescriptions = [{ id: 1, name: 'HONDA PMT' }, { id: 2, name: 'OLDREPUBLICTTLPAYROLL' }];
    Description.findAll.mockResolvedValue(mockDescriptions);

    // Call the function
    await getDescriptions(mockRequest, mockResponse);

    // Assertions
    expect(Description.findAll).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(mockDescriptions);
  });

  it('should handle errors when fetching descriptions', async () => {
    // Mock error
    Description.findAll.mockRejectedValue(new Error('Database Error'));

    // Call the function
    await descriptionController.getDescriptions(mockRequest, mockResponse);

    // Assertions
    expect(Description.findAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error fetching descriptions' });
  });
});
