import sequelize from "../services/connectionService.js";

const CategoryController = {
    getCategories: async (req, res) => {
        try {
            // Call the combined stored procedure without a category ID
            const [categories] = await sequelize.query('EXEC sp_GetCategories');
            res.json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ error: 'Error fetching categories' });
        }
    },

    getCategoryById: async (categoryId, res) => {

        try {
            // Call the combined stored procedure with a category ID
            const [category] = await sequelize.query(`EXEC sp_GetCategories @categoryId = categoryId`, {
                replacements: { categoryId: categoryId  },
                type: sequelize.QueryTypes.SELECT
            });
            res.json(category);
        } catch (error) {
            console.error("Error fetching category by ID:", error);
            res.status(500).json({ error: 'Error fetching category by ID' });
        }
    },
};

export default CategoryController;
