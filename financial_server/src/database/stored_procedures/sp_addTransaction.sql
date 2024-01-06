CREATE PROCEDURE sp_AddTransaction
    @id INT
    @categoryId INT,
    @descriptionId INT,
    @amount DECIMAL(10, 2),
    @date DATETIME
AS
BEGIN
    -- Assuming validation checks and other necessary logic are included
    INSERT INTO dbo.TransactionDetails (id, categoryId, descriptionId, amount, date)
    VALUES (@id, @categoryId, @descriptionId, @amount, @date);

    SELECT SCOPE_IDENTITY() AS NewTransactionId; -- Returns the ID of the newly added transaction
END