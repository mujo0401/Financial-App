CREATE PROCEDURE sp_DeleteFile
    @fileHash VARCHAR(255)
AS
BEGIN
    DELETE FROM dbo.Files WHERE filehash = @fileHash;
END
