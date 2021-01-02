import mealpalApi from '../api/mealpal';

export default async (meals) => {
    const response = await mealpalApi.post(`/delivery/getOrdersToDeliver`);
    return response.data
}

