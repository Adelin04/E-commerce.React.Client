import { URI } from "@/utils/globalUri";
import axios from "axios";
import { useEffect, useState } from "react";

export function API() {
    let [response, setResponse] = useState();

    useEffect(() => {
        let isMounted = true;

        axios.get(`${URI}Product/v1/get/allProducts`)
            .then((res: any) => {
                return setResponse(res);
            });


        return () => {
            isMounted = false;
        }

    })

    return response;
}