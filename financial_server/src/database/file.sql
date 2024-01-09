CREATE TABLE dbo.Files (
    id INT IDENTITY(1,1) PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    filesize INT NOT NULL,
    importdate DATETIME DEFAULT GETDATE(),
    filehash VARCHAR(255) NOT NULL UNIQUE,
    mediatype VARCHAR(255) NOT NULL,
    encoding VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    isprocessed BIT DEFAULT 0
);
