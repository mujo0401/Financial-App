CREATE PROCEDURE sp_GetDescriptions
    @descriptionId INT = NULL  -- Default to NULL, indicating no specific description is requested
AS
BEGIN
    IF @descriptionId IS NULL
    BEGIN
        -- If no description ID is provided, select all descriptions
        SELECT * FROM dbo.Descriptions;
    END
    ELSE
    BEGIN
        -- If a description ID is provided, select the specific description
        SELECT * FROM dbo.Descriptions WHERE id = @descriptionId;
    END
END
