declare module 'formidable' {
  import { IncomingMessage } from 'http';

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface File {
    filepath: string;
    originalFilename: string | null;
    mimetype: string;
    size: number;
  }

  interface FormidableOptions {
    multiples?: boolean;
    uploadDir?: string;
    keepExtensions?: boolean;
  }

  class Formidable {
    constructor(options?: FormidableOptions);
    parse(req: IncomingMessage, callback: (err: Error | null, fields: Fields, files: Files) => void): void;
  }

  export default Formidable;
}
