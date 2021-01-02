import mealpalApi from '../api/mealpal';

export default async (meals) => {
    const response = await mealpalApi.post(`/cust/createOrder`, {meals});
    return response.data
}

