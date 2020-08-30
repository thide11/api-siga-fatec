export function lerHoraParaInt(hora : string) : number {
  const horasEMinutos = hora.split(":");
  const horas = parseInt(horasEMinutos[0]);
  const minutos = parseInt(horasEMinutos[1]);
  return (horas * 60) + minutos;
}