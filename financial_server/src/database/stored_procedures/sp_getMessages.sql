CREATE PROCEDURE sp_getMessages
 @messageType NVARCHAR(255)
AS
BEGIN
  IF @messageType IS NULL
    RETURN;
  SELECT messageName FROM dbo.Messages WHERE messageType = @messageType;
END;