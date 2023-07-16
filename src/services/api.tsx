import { Person, SearchResponse } from "../interfaces";
import { data } from "../mocks/data";

export const searchBy = async (searchTerm:string | undefined, noise=false): Promise<SearchResponse[]> => {
  try {
    const response: Person[]  = await mockedApiCall(noise);  
    const results: SearchResponse[] = [];
  
    if(response.length && searchTerm){
      response.forEach((item: Person) => {
        const target = item.name.toString().toLowerCase();
        const matchIndex = target.indexOf(searchTerm.toLowerCase());
        if(matchIndex >= 0){
          results.push({item, index: matchIndex});
        }
      });
    }
  
    return results;
  } catch (error) {
    return [];
  }
}

const mockedApiCall = async (withNoise: boolean): Promise<Person[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(withNoise){
        const randomNumber = Math.random();
        if (randomNumber <= 0.9) {
          reject()
        }
      }
        
      resolve(data);
    }, 1500);
  });
}