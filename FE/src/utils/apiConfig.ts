import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/';

const data = {
  "accountID": "665f382613e36f62bab16c0d",
  "sessionID": "6662bca25adf31b792be40ac",
};

export default async function apiFetch(endpoint, moreData){
    try {
        const response = await axios({
            method: 'post',
            url: baseURL + endpoint,
            data: {
                ...data,
                ...moreData,
            },
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}
