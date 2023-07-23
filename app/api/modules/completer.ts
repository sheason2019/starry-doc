export class Completer<T extends any> {
  promise: Promise<T>;
  complete: (arg: T | PromiseLike<T>) => void = () => {};
  reject: (reason?: any) => void = () => {};
  constructor() {
    this.promise = new Promise((res, rej) => {
      this.complete = res;
      this.reject = rej;
    });
  }
}
