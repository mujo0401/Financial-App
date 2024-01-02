CREATE TABLE CategoryMapping (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    description_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (description_id) REFERENCES Descriptions(id)
);