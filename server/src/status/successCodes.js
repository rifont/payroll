class SuccessCode {
  constructor(data, status) {
    this.status = status;
    this.data = data;
  }
}

export class CreatedResource extends SuccessCode {
  constructor(data) {
    super(data, 201);
  }
}
