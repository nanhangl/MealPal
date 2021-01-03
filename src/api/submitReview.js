import mealpalApi from '../api/mealpal';

export default async (chefEmail, mealRating, comments) => {
    const response = await mealpalApi.post(`/submitReview`, {chefEmail, mealRating, comments});
    return response.data
}

