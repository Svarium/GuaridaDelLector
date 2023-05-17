export const UseFetch = async (endpoint, method = 'GET', data, token) => {

const apiURLBase = process.env.REACT_APP_API_URL_BASE;

const url = apiURLBase + endpoint // endpoint = "/libros"

let response; 


try {
    if(method === 'GET'){
        response = await fetch(url)
    }
    
    if(method === 'POST'){
        response = await fetch(url, {
            method : 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-Types' : 'application/json',
                Authorization: token
            }
        })
    }
    
    let result = await response.json()

    return result
    
} catch (error) {
    console.log(error);
}

}

