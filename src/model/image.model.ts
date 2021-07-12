export interface IFile {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
  }

  export interface IUploadedFile {
    path: string;
  }

  export interface IImageMetaData {
    id: string;
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: Number;
    label: string;
    username: string;
  }

  