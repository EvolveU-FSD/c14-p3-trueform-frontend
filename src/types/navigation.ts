// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Category: {
    slug: string;  // Will contain the category ID
  };
  BodyScan: undefined;
};