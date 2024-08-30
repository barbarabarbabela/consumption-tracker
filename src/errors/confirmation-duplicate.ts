class ConfirmationDuplicate extends Error {
  error_code: string;
  error_description: string;

  constructor(message: string = "Leitura já confirmada") {
    super(message);
    this.name = "ConfirmationDuplicate";
    this.error_code = "CONFIRMATION_DUPLICATE";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default ConfirmationDuplicate;
