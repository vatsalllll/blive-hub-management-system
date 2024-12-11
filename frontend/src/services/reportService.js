import api from './api';

export const fetchServiceTATReport = async () => {
  try {
    const response = await api.get('/reports/service-tat');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching service TAT report');
  }
};

export const fetchHubTATReport = async () => {
  try {
    const response = await api.get('/reports/hub-tat');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching hub TAT report');
  }
}; 