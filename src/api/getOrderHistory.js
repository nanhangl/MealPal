import mealpalApi from '../api/mealpal';

export default async (role) => {
    const response = await mealpalApi.post(`/getOrderHistory`, {role});
    return response.data
}

