import { CoreEntity } from './core-entity'

export interface CoreRepository<E extends CoreEntity> {
  /**
   * @description Gets all entity instance in a repository.
   * @returns {Promise<E>} Returns all the instances in the repository  as an array.
   * @throws {InfrastructureError} Throws a InfrastructureError in case of failure.
   */
  getAll(): Promise<E[]>

  /**
   * @description Finds a single entity instance that matches a given id.
   * @param {E['id']} id An id that matches the single instance to find.
   * @returns {Promise<E> | undefined} Returns the matched entity or undefined found
   */
  fidnById(id: E['id']): Promise<E | undefined>

  /**
   * @description Gets a single entity instance that matches a given id.
   * @param {E['id']} id An id that matches the single instance to get.
   * @returns {Promise<E>} Returns the matched entity or throws
   */
  getById(id: E['id']): Promise<E>

  /**
   * @description Creates a single entity instance. It will assign the instance a unique id and the createdAt/updatedAt timestamps.
   * @param {EntityProperties<E>} properties The assignable properties that will be used to create the entity instancy.
   * @returns {Promise<E>} Returns the created instance.
   */
  create(properties: CoreEntity.Entries<E>): Promise<E>
}
