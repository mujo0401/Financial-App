CREATE PROCEDURE sp_GetFile
    @fileHash VARCHAR(255)
AS
BEGIN
    SELECT * FROM dbo.Files WHERE filehash = @fileHash;
END
