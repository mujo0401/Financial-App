CREATE PROCEDURE getFileName
    @filehash VARCHAR(255)
AS
BEGIN
    SELECT filename FROM dbo.Files WHERE filehash = @filehash;
END;