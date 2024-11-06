export interface RecipeInterface {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
