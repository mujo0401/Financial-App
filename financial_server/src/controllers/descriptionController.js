import Description from '../models/descriptionModel.js'; 

const getDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.findAll({});
    res.json(descriptions);
  } catch (error) {
    console.error("Error fetching descriptions:", error);  
    res.status(500).json({ error: 'Error fetching descriptions' });
  }
};

export default {
  getDescriptions,
};
