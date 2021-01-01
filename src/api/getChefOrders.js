import mealpalApi from '../api/mealpal';

export default async (email) => {
    const response = await mealpalApi.post(`/chef/getAllOrders`, {email});
    return response.data
}

