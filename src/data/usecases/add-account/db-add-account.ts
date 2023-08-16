import { AccountModel } from '../../../domain/models/account';
import {
  AddAccount,
  AddAccountModel,
} from '../../../domain/usecases/add-account';
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    // TS nao deixa retornar um valor null pois o metodo deve retornar um Obj do tipo AccountModel
    const data = {
      id: 'any_id',
      name: account.name,
      email: account.email,
      password: await this.encrypter.encrypt(account.password),
    };

    return new Promise((resolve) => resolve(data));
  }
}
