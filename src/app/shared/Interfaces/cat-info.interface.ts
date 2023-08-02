import {IBreeds} from "./breeds.interface";

export interface ICatInfo {
  breeds: IBreeds[];
  categories?: ICategories;
  id: string;
  url: string;
  width: number;
  height: number;
}

interface ICategories {
  id: number;
  name: string;
}
