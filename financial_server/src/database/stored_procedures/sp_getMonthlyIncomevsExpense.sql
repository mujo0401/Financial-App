CREATE PROCEDURE sp_GetMonthlyIncomeVsExpense
    @startDate DATETIME,
    @endDate DATETIME
AS
BEGIN
    SELECT 
        MONTH(T.date) AS Month,
        SUM(CASE WHEN C.name = 'Income' THEN T.amount ELSE 0 END) AS TotalIncome,
        SUM(CASE WHEN C.name <> 'Income' THEN T.amount ELSE 0 END) AS TotalExpense
    FROM 
        dbo.TransactionDetails T
    INNER JOIN 
        dbo.Categories C ON T.category_id = C.id
    WHERE 
        T.date >= @startDate AND 
        T.date <= @endDate
    GROUP BY 
        MONTH(T.date)
    ORDER BY 
        MONTH(T.date);
END
