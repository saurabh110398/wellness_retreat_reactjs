export async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    if (response.status == 400) {
        const error = await response.text();
        throw new Error(error);
    }

    throw new Error('Network response is not ok.')
}

export async function handleError(error) {

    throw error;
}