CREATE TABLE dbo.TransactionDetails (
    id INT PRIMARY KEY IDENTITY,
    ADD mappingId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (mappingId) REFERENCES dbo.CategoryMapping(id);
);
