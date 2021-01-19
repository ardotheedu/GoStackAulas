export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
// <T> é o tipo que ele vai receber que nesse caso é um array de user (User[]) e
// deve retornar um array de user por isso o Promise< T | null>
