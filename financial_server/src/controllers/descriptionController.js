import connect from "../services/connectionService.js";

const DescriptionController = {
    getDescriptions: async (req, res) => {
        try {
            const [descriptions] = await connect.query('EXEC sp_GetAllDescriptions');
            res.json(descriptions);
        } catch (error) {
            console.error("Error fetching descriptions:", error);
            res.status(500).json({ error: 'Error fetching descriptions' });
        }
    },

    getDescriptionById: async (descriptionId) => {
        try {
            const [description] = await connect.query('EXEC sp_GetDescriptionById @descriptionId = :descriptionId', {
                replacements: { descriptionId },
                type: connect.QueryTypes.SELECT
            });
            return description;
        } catch (error) {
            console.error("Error fetching description:", error);
            throw error;
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