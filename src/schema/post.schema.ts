import { object, string, ref } from "yup";


const label = {
    params: object({
      label: string().required("label is required"),
    }),
  };

  export const createPostSchema = object({
    ...label,
    
  });