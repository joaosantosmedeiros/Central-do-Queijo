export class EntityAlreadyExistsError extends Error {
  constructor(entity: string) {
    super(`${entity} already exists.`);
  }
}
