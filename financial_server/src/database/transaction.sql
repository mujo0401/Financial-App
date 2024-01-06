CREATE TABLE dbo.TransactionDetails (
    id INT PRIMARY KEY IDENTITY,
    categoryId INT NOT NULL,
    descriptionId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES dbo.Categories(id),
    FOREIGN KEY (descriptionId) REFERENCES dbo.Descriptions(id)
);