import connect from "../services/connectionService.js";

const CategoryController = {
    getCategories: async (req, res) => {
        try {
            const [categories] = await connect.query('EXEC sp_GetAllCategories');
            res.json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ error: 'Error fetching categories' });
        }
    },

    getCategoryById: async (categoryId) => {
        try {
            const [category] = await connect.query('EXEC sp_GetCategoryById @categoryId = :categoryId', {
                replacements: { categoryId },
                type: connect.QueryTypes.SELECT
            });
            return category;
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    },

    categoryExists: async (categoryId) => {
        const category = await CategoryController.getCategoryById(categoryId);

        if (!category) {
            return { 
                isValid: false, 
                message: 'Category not found'
            };
        }

        return { isValid: true };
    },
};

export default CategoryController;