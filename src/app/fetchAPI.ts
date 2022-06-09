export const fetchAPI = async (url:string):Promise<string> => {
    
    const data = await fetch(url).then(data => data.json())
    return data.files['view.json'].content
}