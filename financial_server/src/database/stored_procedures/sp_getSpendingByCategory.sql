
CREATE PROCEDURE [dbo].[sp_GetSpendingByCategory]
    @startDate DATE,
    @endDate DATE
AS
BEGIN
    SELECT 
	    t.categoryId, 
        SUM(t.amount) AS TotalAmount,
        c.name AS categoryName, 
        d.name AS descriptionName 
      FROM 
        dbo.TransactionDetails T
    INNER JOIN 
        dbo.Categories C ON T.categoryId = C.id
    INNER JOIN 
        dbo.Descriptions D ON T.descriptionId = D.id
     WHERE 
        date >= @startDate AND date <= @endDate
    GROUP BY 
        t.categoryId, c.name, d.name
END
