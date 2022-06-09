import { fetchAPI } from "./fetchAPI";

export interface DataInterface {
  entityLabelPages: [{
    labels: string[]
    entityLongIds: number[]
    parentEntityLongIds: number[]
  }]
}

export interface AdaptedDataInterface {
  id: number | string
  parent: number | string
  text: string
  droppable?: boolean
}

export type ArrayOfAdaptedDataInterface = AdaptedDataInterface[]

export const dataAdapter = async (url: string):Promise<ArrayOfAdaptedDataInterface> => {
  let arrayOfData:AdaptedDataInterface[] = []
  let data:DataInterface = await fetchAPI(url).then(el => JSON.parse(el))
  
  let {labels, entityLongIds, parentEntityLongIds} = data.entityLabelPages[0]
  
  labels.forEach((el, id) => {
    let adaptedData:AdaptedDataInterface = {
      'id': entityLongIds[id], 
      'parent': parentEntityLongIds[id] === -1 ? 0 : parentEntityLongIds[id],
      'text': labels[id],
      'droppable': !labels[id].includes('#')

    }
    arrayOfData.push(adaptedData)
  })

  return arrayOfData
};  

export default dataAdapter;