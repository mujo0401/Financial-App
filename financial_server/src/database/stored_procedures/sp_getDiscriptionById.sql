CREATE PROCEDURE sp_GetDescriptionById
    @descriptionId INT
AS
BEGIN
    S SELECT id FROM Descriptions WHERE id = @descriptionId;
END
