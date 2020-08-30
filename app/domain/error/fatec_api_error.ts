export class FatecApiError extends Error {
  constructor(public code: number, public mensagemErro : string) {
    super(mensagemErro);
  }
}