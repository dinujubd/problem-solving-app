import Axios, { Method } from "axios";
import { Config } from "shared/config";
import { ApiPaths } from "./apiRegistry"


export const httpClient = {
    req: <T>(path: keyof typeof ApiPaths, data: any = null, callback: (resposne: T) => void) => {
        debugger;
        const url = "http://localhost:8181" + ApiPaths[path];

        const actualMethod = path.split(':').slice(-1).pop();

        switch (actualMethod) {
            case "GET":
                {
                    Axios.get<T>(url, {
                        headers: {
                            "Content-Type": "application/json"
                        },

                    }).then(response => {
                        callback(response.data)
                    });
                    break;
                }
            case "POST": {
                Axios.post<T>(url, data, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    callback(response.data)
                });
                break;
            }
            case "PUT": {
                Axios.put<T>(url, data, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    callback(response.data)
                });
                break;
            }
            case "DELETE": {

                Axios.delete<T>(url.replace("{id}", data)).then(response => {
                    callback(response.data)
                });
                break;
            }
        }
    }
}