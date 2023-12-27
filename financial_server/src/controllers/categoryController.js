import Category from '../models/categoryModel.js'; 

const getCategories = async (req, res) => {
try {
    const categories = await Category.findAll({});
    res.json(categories);
} catch (error) {
    console.error("Error fetching categories:", error); 
    res.status(500).json({ error: 'Error fetching categories' });
}
};

export default {
  getCategories,
};
