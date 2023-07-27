export enum ProductCategory {
  CategoryOne = "Category 1",
  CategoryTwo = "Category 2",
  CategoryThree = "Category 3",
  CategoryFour = "Category 4",
  CategoryFive = "Category 5",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}