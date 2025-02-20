import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1, // 1ms timeout은 axios 인스턴스가 기다릴수 있는 최대 시간
});

api.interceptors.request.use((config) => {
  // 공통 header를 설정할수도 있고.. 로그를 찍을 수도 있고..
  console.log("인터셉트 요청 성공");
  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log("인터셉트 응답 성공");
    return res;
  },
  (err) => {
    console.log("인터셉트 응답 실패");
    return Promise.reject(err); // promise로 넘어오는 객체를 오류처리 할 수 있도록 컴포넌트에 줌
  }
);

export default api;
