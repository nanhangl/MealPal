import mealpalApi from '../api/mealpal';

export default async (email) => {
    const response = await mealpalApi.post(`/cust/getAllChef`);
    return response.data
}

