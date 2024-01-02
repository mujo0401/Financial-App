CREATE PROCEDURE sp_AddTransaction
    @categoryId INT,
    @descriptionId INT,
    @amount DECIMAL(10, 2),
    @transactionDate DATETIME
AS
BEGIN
    -- Assuming validation checks and other necessary logic are included
    INSERT INTO dbo.TransactionDetails (category_id, description_id, amount, date)
    VALUES (@categoryId, @descriptionId, @amount, @transactionDate);

    SELECT SCOPE_IDENTITY() AS NewTransactionId; -- Returns the ID of the newly added transaction
END
