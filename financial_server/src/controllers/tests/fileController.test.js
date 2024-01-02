import { generateHash, getFile, importFile, deleteFile } from '../fileController.js'; // Replace with your actual file path
import File from '../models/fileModel';
import crypto from 'crypto';

jest.mock('../models/fileModel'); // Mock the File model

describe('File Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mocks after each test
    });

    // Test for hash generation
    describe('generateHash', () => {
        it('should generate the correct hash', () => {
            const testContent = 'test data';
            const expectedHash = crypto.createHash('sha256').update(testContent).digest('hex');

            expect(generateHash(testContent)).toBe(expectedHash);
        });
    });

    // Test for importing files
    describe('importFile', () => {
        it('should throw an error if file already exists', async () => {
            const fileData = { content: 'some content', fileHash: '' };
            File.findOne.mockResolvedValue(fileData);

            await expect(importFile(fileData)).rejects.toThrow('File already exists with this hash.');
        });

        it('should store file data correctly', async () => {
            const fileData = { content: 'new content', fileHash: '' };
            File.findOne.mockResolvedValue(null);
            File.prototype.save = jest.fn().mockResolvedValue(fileData);

            const result = await importFile(fileData);

            expect(File.prototype.save).toHaveBeenCalled();
            expect(result).toEqual(expect.objectContaining(fileData));
        });
    });

    // Test for fetching files
    describe('getFile', () => {
        it('should fetch the correct file based on hash', async () => {
            const fileHash = 'someHash';
            const fileData = { content: 'file content', fileHash };
            File.findOne.mockResolvedValue(fileData);

            const result = await getFile(fileHash);

            expect(result).toEqual(fileData);
        });
    });

    // Test for deleting files
    describe('deleteFile', () => {
        it('should delete the file based on hash', async () => {
            const fileHash = 'someHashToDelete';
            File.destroy.mockResolvedValue(1); // Assuming 1 means one record deleted

            const result = await deleteFile(fileHash);

            expect(result).toBe(1);
        });
    });
});
