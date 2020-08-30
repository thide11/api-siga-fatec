import * as qs from 'querystring';
import { GXStateDefault } from '../../domain/crawler/siga_constants';


export function gerarLoginPostData(usuario : string, senha : string) : string {
  return qs.stringify({
    vSIS_USUARIOID: usuario,
    vSIS_USUARIOSENHA: senha,
    BTCONFIRMA: "Confirmar",
    GXState: GXStateDefault,
  });
}