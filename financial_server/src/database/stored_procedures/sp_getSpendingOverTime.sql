CREATE PROCEDURE sp_GetSpendingOverTime
   @startDate DATE,
    @endDate DATE
AS
BEGIN
    SELECT 
        t.amount, 
        c.name AS categoryName, 
        d.name AS descriptionName 
    FROM 
        TransactionDetails t
    JOIN 
        Categories c ON t.categoryId = c.id
    JOIN 
        Descriptions d ON t.descriptionId = d.id;
    WHERE 
        date >= @startDate AND date <= @endDate
END
