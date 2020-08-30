
export const BASE_URL : string = "https://siga.cps.sp.gov.br";

export enum Endpoints {
  LOGIN = "/aluno/login.aspx?",
  HOME = "/aluno/home.aspx",
  HORARIO = "/aluno/horario.aspx",
}

export const TOKEN_SESSAO : string = "ASP.NET_SessionId={?}; path=/; Domain=siga.cps.sp.gov.br; HttpOnly;";

export const GXStateDefault = `{"_EventName":"E'EVT_CONFIRMAR'.","_EventGridId":"","_EventRowId":"","MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vSAIDA":"","vREC_SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"8C0897A1EC82946DB66C8388C4B78AD0","AJAX_SECURITY_TOKEN":"2AC665E5F5AF72AECB8F5559E88D8A7EC422284BECF3A408F75BE570EF181BD9","GX_CMP_OBJS":{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResourceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModified":"1"}`;