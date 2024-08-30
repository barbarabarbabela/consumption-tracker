class InvalidType extends Error {
  error_code: string;
  error_description: string;

  constructor(message: string = "Tipo de medição não permitida") {
    super(message);
    this.name = "InvalidType";
    this.error_code = "MEASURE_TYPE_NOT_ALLOWED";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default InvalidType;
