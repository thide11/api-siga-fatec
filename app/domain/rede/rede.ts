import { RedeResponse } from "./rede_response";

export abstract class Rede {
  abstract get(url : string, cookies? : string) : Promise<RedeResponse>;
  abstract post(url : string, data : any, contentType : string, cookies : string) : Promise<RedeResponse>;
}