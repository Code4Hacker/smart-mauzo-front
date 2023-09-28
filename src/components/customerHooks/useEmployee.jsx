import axios from "axios";
import { useEffect, useState } from "react";

const useEmployee = (PATH,fname,lname,address,phone,mail,codes) => {
    const [status, setStatus] = useState();
    
    useEffect(() => {
        const addNew = async () => {
            let formdata = new FormData();
            formdata.append("fname", fname);
            formdata.append("lname", lname);
            formdata.append("address", address);
            formdata.append("phone", phone);
            formdata.append("mail", mail);
            formdata.append("codes", codes);
            let bodyContent = formdata;
    
            let reqOptions = {
                url: PATH,
                method: "POST",
                data: bodyContent,
            }
    
            let response = await axios.request(reqOptions);
            setStatus(response);
        }
        addNew();
    }, [PATH,fname,lname,address,phone,mail,codes]);

    return { status };
}
export default useEmployee;