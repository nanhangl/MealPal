import mealpalApi from '../api/mealpal';

export default async (orderId, status) => {
    const response = await mealpalApi.post(`/updateOrderStatus`, {orderId, status});
    return response.data
}

