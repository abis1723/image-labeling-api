export interface File {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  }

  export interface UploadedFile {
    path: string;
  }

  export interface ImageMetaData {
    id: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    bucket: string
    location: string;
    key: string,
    size: Number;
    diseasetype: string;
    username: string;
  }

  