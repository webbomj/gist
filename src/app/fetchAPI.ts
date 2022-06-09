import axios from 'axios'

export const fetchAPI = async (url:string):Promise<string> => {
    const { data } = await axios.get(url);
    return data.files['view.json'].content
}
