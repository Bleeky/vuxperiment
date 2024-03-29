import { v4 as uuidv4 } from 'uuid';

export default class Payload {
  constructor(req) {
    this.req = req;
    this.uuid = uuidv4();
  }

  merge(payload) {
    return {
      ...payload,
      uuid: this.uuid,
      req: this.req,
    };
  }
}
