CREATE PROCEDURE sp_AddTransaction
    @categoryId INT,
    @descriptionId INT,
    @amount DECIMAL(10, 2),
    @date DATE 
AS
BEGIN
    BEGIN TRY
        -- Insert transaction details
        INSERT INTO dbo.TransactionDetails (categoryId, descriptionId, amount, date)
        VALUES (@categoryId, @descriptionId, @amount, CAST(@date AS DATE));

        -- Return the new transaction ID
        SELECT SCOPE_IDENTITY() AS NewTransactionId;
    END TRY
    BEGIN CATCH
        -- Return the error message if the insert fails
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_MESSAGE() AS ErrorMessage,
            1 AS ErrorCode; 
    END CATCH
END