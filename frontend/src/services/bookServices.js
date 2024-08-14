const API_URL = "http://localhost:3000/api/books";

export const getBooks = async () => {
    try {
        const response = await fecth(API_URL);
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};