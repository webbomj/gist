//@ts-ignore
import axios from 'axios'

// export const fetchAPI = async (url:string):Promise<string> => {
//     const { data } = await axios.get(url);
//     return data.files['view.json'].content
// }

export const fetchAPI = async (url:string):Promise<string> => {
    
    const data = await fetch(url).then(data => data.json())
    return data.files['view.json'].content
}