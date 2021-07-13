import { object, string, ref } from "yup";


const file = {
    params: object({
      file: string().required("label is required"),
    }),
  };

  export const createPostSchema = object({
    ...file,
    
  });