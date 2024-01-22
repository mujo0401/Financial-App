-- Create the AddMessage stored procedure
CREATE PROCEDURE AddMessage
  @messageContent NVARCHAR(MAX)
AS
BEGIN
  INSERT INTO messages(content) VALUES (@messageContent);
END;