class NotFound extends Error {
  error_code: string;
  error_description: string;

  constructor(message: string = "Leitura(s) não encontrada(s)") {
    super(message);
    this.name = "NotFound";
    this.error_code = "MEASURE_NOT_FOUND";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default NotFound;
