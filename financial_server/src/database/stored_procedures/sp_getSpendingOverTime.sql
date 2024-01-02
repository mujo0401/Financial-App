CREATE PROCEDURE sp_GetSpendingOverTime
    @startDate DATETIME,
    @endDate DATETIME
AS
BEGIN
    SELECT 
        MONTH(date) AS month, 
        SUM(amount) AS totalAmount
    FROM 
        dbo.TransactionDetails
    WHERE 
        date >= @startDate AND 
        date <= @endDate AND
        categoryId IN (SELECT id FROM dbo.Category WHERE name = 'Expense')
    GROUP BY 
        MONTH(date)
    ORDER BY 
        month ASC;
END
