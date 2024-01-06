CREATE PROCEDURE sp_GetCategoryById
    @categoryId INT
AS
BEGIN
    SELECT id FROM dbo.Categories WHERE id = @categoryId;
END
