const HEALTH_URL = 'http://localhost:3000/api/health'; 

const HealthCheckService = {
   checkBackendHealth: async () => {
    try {
      const response = await fetch(HEALTH_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching descriptions:', error);
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

export default HealthCheckService;
