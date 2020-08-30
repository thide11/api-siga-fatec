import { Rede } from '../../../../domain/rede/rede';
import { AxiosRede } from '../../../../infrastructure/rede/axios_rede';


const rede : Rede = new AxiosRede();

it('Testar get do axios', async () => {
  //Usa a api do github como teste
  const result = await rede.get("https://api.github.com/users/thide11");
  const decode : any = result.body;

  expect(result.httpCode).toBe(200);
  expect(decode["login"]).toBe("thide11");
});