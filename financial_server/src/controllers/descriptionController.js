import sequelize from "../services/connectionService.js";

const DescriptionController = {
    getDescriptions: async (req, res) => {
        try {
            const [descriptions] = await sequelize.query('EXEC sp_GetDescriptions');
            res.json(descriptions);
        } catch (error) {
            console.error("Error fetching descriptions:", error);
            res.status(500).json({ error: 'Error fetching descriptions' });
        }
    },

    getDescriptionById: async (descriptionId, res) => {
        try {
            const [description] = await sequelize.query(`EXEC sp_GetDescriptions @descriptionId = ${descriptionId}`, {
                type: sequelize.QueryTypes.SELECT
            });
            res.json(description);
        } catch (error) {
            console.error("Error fetching description:", error);
            res.status(500).json({ error: 'Error fetching description' });
        }
    },

    descriptionExists: async (descriptionId) => {
        const description = await DescriptionController.getDescriptionById(descriptionId);

        if (!description) {
            return { 
                isValid: false, 
                message: 'Description not found'
            };
        }

        return { isValid: true };
    },
};

export default DescriptionController;