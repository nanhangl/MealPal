import mealpalApi from '../api/mealpal';

export default async (email) => {
    const response = await mealpalApi.get(`/getCustByEmail?email=${email}`);
    return response.data
}