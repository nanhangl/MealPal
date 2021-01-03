import mealpalApi from '../api/mealpal';

export default async (chefEmail) => {
    const response = await mealpalApi.post(`/getReviews`, {chefEmail});
    return response.data
}

