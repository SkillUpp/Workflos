import { BASE_URL } from "./constant";
import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  withCredentials: true,
});

interface CustomAxiosError extends AxiosError {
  response: AxiosResponse;
}

api.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Cookie: `workflos_session=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaWF0IjoxNzI0MTE0NzExLCJ1YXQiOjE3MjQxMjU2MjAsImV4cCI6MTcyNDIxMjAyMH0..DLBNqmRdlOa8MLFL.kQk74hkiU7rqKuvB6dUiWWVblvk25jpxzOKpz_CyrPDxkId-1a2jmiBCtLVw5UAiFbORubdwYRKP4cEAmujYvoMjCb41YOOaI_zCvZV8YKHgyj0nAm65jVPgKuGEHv2r-RlC3AY-knI1asTWaS-gadHanQSX12tn1rXJwohbSGzx4TyMRvNHavxhyTzkrnpnevTl6jzFe6GBr7-3B9GqcUZS13ytCwqGZaK3dunwDpB4XQp4mTbwDnY3jDJyZJ_kQm317LW8ut5ttuAWZWTtItOzkzigcJkb-KonJ4t0zP6cVuLe93nF7eV7d6NUC7I3LUN27VQqqM5tc-8c20oGM4NekhUa9sljrTWjry9Xq9F8o7LgTRSO2DORKv6_n9cLIbOxwaGno2nXtoRDQOzYwVZngUya7POZx5J4MgZcm0_TuF73cexmj27hHjwD5ikBF7JYLbFGwf-GW2vI5rMZSZhbB0uMzlwSas1ZPd8tNTbvTX4AvbYxRLFat_uUKOGy0VAeebW8zMsm3Y49nw0muzxsoOVQpFZWrsqO1UIuWC0j0aRlkM2G7WVD-JIUasdZRqQu7ZD6dHTrVbUvx_l0QDd0EeyE9l_Py1RWdbTP0g-5O0pi92iXnCBc87SnMpOllReRd-k_y2x8jIvRBvqglJw9Dh6InHrFzktwVpK7yzeZFEhegFv7QnhRf_vkpGyWEokqQu1ru71bYTfafUMF_BdB2BR-ZnXUVnRlAef1vDRVcmzvZ4jddE_TuBxPpxwDP5zS1bQ5RoMAUoCQlIHW1GiRMWGOqUecoFLZpRTAlbaw4ngK33JS4hHwvU0j7cMa0DaKGf_LEbEtmjGG1OZWPxPgMFLlbc-5pNp3UfT7VxD_Qznrcl3sMztrRI_oh53AFNgXzvFKTEa72-iqYDDuhh3qt_8BEVupXe6-rKbh1rTdDiAMjYyvxe0Pc-b-UaxQPO24UY0ZW18r9z5ErFKYux0DIo5B5Ad94zEqdvvqQw_mwdwCx3VqRigSDWhR0m0Hu2PONNPdKPM6eMkHlK0iu3IUUH0qjcNpezt6-xlJO4eFbyiNq5AZndIH8MlhMgr1Ya23jAw7dNi16YkDj1ESIL9baCGw_klSXM8WgnDPtsNAUePmJbp9OqMbLzUaWiuVA241xYgZ2ajCwbau1xOfmxCqmX8qWr-fpcuk89MIkz7lQUpYmdII21QyCwUQL_Xz2S8ptyEwe_9c-4M6B7jYjnRH_FsrSUHZQWAGYaGBOQHkc00BibXLZmJcckTTI-QFoopC5Ldf0CivoVZvB9gO1c1_00jOG1Rij-SzaPvo4ITeuiQ63GViP8-VmZvQ-yw6f1PHxC82IcHiG_55sh3kHfr1oyqaedg3ujg9oiMxjjIT4SOVza_0vjUICgkoaCw_CFvBtJjZhTzHoXY3o5WeP12WV5n8-X3mnORqLNxrWCD0kXFwC2GDsRV0rBRnPNbP6Zm-Aq_wBXzdQuybpWGGG1AkGgSRPy8yHlnQqtljI9ASWvauJ7AUn7dTBHKc0Ji9_w-p5XzTOUjZttHRriPZiJnZsfZ-9HPWq-4s0XpkeYeUrWAAEmpaQu8yYA2qMt0XGiWmqI4CQt-og9-73AFkoBED4M4KfIQ2aza8vVAFzM21Sn7GRoQMPpfeok23ycJ8G_emnJ2qiwXH5eh-dMYv2-myXoBx.V140gJhW6ctJR8H2Wo7ZZg`,
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: { data: any }) => {
    if (response.data) {
      const data = response.data;
      return data;
    }
  },
  (error: CustomAxiosError) => {
    if (error.response) {
    }
  }
);

export default api;
