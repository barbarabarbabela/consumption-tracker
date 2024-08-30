class PersistenceError extends Error {
  error_code: string;
  error_description: string;

  constructor(message: string = "Erro na persistência de dados") {
    super(message);
    this.name = "PersistenceError";
    this.error_code = "PERSISTENCE_ERROR";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default PersistenceError;
