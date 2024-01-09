CREATE PROCEDURE sp_DeleteFileByHash
    @fileHash VARCHAR(255)
AS
BEGIN
    DELETE FROM dbo.Files WHERE filehash = @fileHash;
END
