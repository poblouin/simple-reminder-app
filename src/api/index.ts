import axios, { AxiosResponse, AxiosError } from 'axios';

import Entity from '@/entities';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;

export abstract class Api<E extends Entity> {
  public baseApiUrl: string;
  public entityName: string;
  public entitiesName: string;

  constructor(baseApiUrl: string, entityName: string, entitiesName: string) {
    this.baseApiUrl = baseApiUrl;
    this.entityName = entityName;
    this.entitiesName = entitiesName;
  }

  private wrapper = (p: Promise<AxiosResponse<E>>): Promise<any> =>
    p
      .then((result: AxiosResponse<E>) => ({ result, error: null }))
      .catch((error: AxiosError<E>) => ({ error, result: null }));

  private processError = (err: AxiosError<E> | null): void => {
    if (err) {
      console.log(err.toJSON());
      throw err;
    }
  };

  async getAll(filters?: Array<string>): Promise<Array<E>> {
    const { result, error } = await this.wrapper(axios.get(this.baseApiUrl));

    this.processError(error);

    return result.data[this.entitiesName];
  }

  async create(e: E): Promise<E> {
    const { result, error } = await this.wrapper(
      axios.post(this.baseApiUrl, { [this.entityName]: e.toAPI() })
    );

    this.processError(error);

    return result.data[this.entityName];
  }
}
