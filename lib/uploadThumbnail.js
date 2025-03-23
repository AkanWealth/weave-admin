import Cookies from 'js-cookie'
import { baseUrl } from './envfile';
export const readAndUploadThumbnail = async (file) => {
    const accessToken = Cookies.get('session')
    if (!file) return;
    let formdata = new FormData();
    formdata.append("file", file);

    try {
        const resp = await fetch(`${baseUrl}/thumbnails`, {
            body: formdata,
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                contentType: "multipart/formdata",
            },
        });
       
        const respBody = await resp.json();

        return { message: respBody.message, status: "success" };
    } catch (e) {
        return {
            message: e.message, status: "error", stack: e
        }
    }
};