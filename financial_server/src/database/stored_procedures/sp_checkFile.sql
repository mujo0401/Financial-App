CREATE PROCEDURE sp_CheckFile
    @fileHash VARCHAR(255)
AS
BEGIN
    IF @fileHash IS NULL
        RETURN NULL;
    ELSE
        SELECT * FROM dbo.Files WHERE filehash = @fileHash;
END