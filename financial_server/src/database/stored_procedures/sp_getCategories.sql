CREATE PROCEDURE sp_GetCategories
    @categoryId INT = NULL  -- Default to NULL, indicating no specific category is requested
AS
BEGIN
    IF @categoryId IS NULL
    BEGIN
        -- If no category ID is provided, select all categories
        SELECT * FROM dbo.Categories;
    END
    ELSE
    BEGIN
        -- If a category ID is provided, select the specific category
        SELECT * FROM dbo.Categories WHERE id = @categoryId;
    END
END
