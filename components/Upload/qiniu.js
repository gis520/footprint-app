import request from "@/shared/request";

export function getToken() {
  return request({
    url: "/qiniu/upload/token",
    method: "get"
  });
}
