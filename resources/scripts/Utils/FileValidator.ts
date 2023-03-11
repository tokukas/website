export type FileValidatorOptions = {
  /**
   * The maximum file size in MB.
   */
  maxSize?: number;
  /**
   * The list of allowed file MIME types.
   *
   * See:
   * - [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
   * - [Complete list of MIME types](https://www.iana.org/assignments/media-types/media-types.xhtml)
   */
  allowedTypes?: string[];
};

type TFile<
  Multiple extends boolean = false
> = Multiple extends true ? File[] : File;

class FileValidator<Multiple extends boolean = false> {
  private errorMessage: string | null = null;

  constructor(
    private options: FileValidatorOptions,
  ) {
    this.options = options;
  }

  private isValidFile(file: File): boolean {
    const { maxSize, allowedTypes } = this.options;

    if (maxSize && file.size > maxSize) {
      this.errorMessage = `File size is too large.
        Maximum file size is ${maxSize / 1024 / 1024} MB.`;
      return false;
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      this.errorMessage = 'File type is not allowed.';
      return false;
    }

    this.errorMessage = null;
    return true;
  }

  public validate(value: TFile<Multiple>): boolean {
    if (Array.isArray(value)) {
      return value.every((file) => this.isValidFile(file));
    }

    return this.isValidFile(value);
  }

  public getError(): string|null {
    return this.errorMessage;
  }
}

export default FileValidator;
