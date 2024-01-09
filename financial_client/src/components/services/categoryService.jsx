const CAT_URL = 'http://localhost:3000/api/categories'; 

const CategoryService = {
  getCategories: async () => {
    try {
      const response = await fetch(CAT_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response) {
        console.error('Error Data:', error.response.data);
        console.error('Error Status:', error.response.status);
        console.error('Error Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      return [];
    }
  }
};

export default CategoryService;