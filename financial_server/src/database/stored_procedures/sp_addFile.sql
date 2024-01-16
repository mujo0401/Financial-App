CREATE PROCEDURE sp_AddFile
    @filename VARCHAR(255),
    @filesize INT,
    @importdate DATETIME,
    @filehash VARCHAR(255),
    @mediatype VARCHAR(255),
    @encoding VARCHAR(255),
    @isprocessed BIT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM dbo.Files WHERE filehash = @fileHash)
    BEGIN
        RAISERROR('File already exists with this hash.', 16, 1);
    END
    ELSE
    BEGIN
        INSERT INTO dbo.Files (filename, filesize, importdate, filehash, mediatype, encoding, isprocessed)
        VALUES (@filename, @filesize, @importdate, @filehash, @mediatype, @encoding, @isprocessed);
    END
END
