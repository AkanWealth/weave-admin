import { Bounce, toast } from "react-toastify";


export default function exportData(list, titleArrays, fileName) {
    let toastOptions = {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    if (list.length === 0) {
        toast.error('No data to export', toastOptions)
        return
    }

    let content = '';
    let title = '';
    titleArrays.forEach((item) => {
        title += item + ',';
    });
    content += title + '\n';
    list.forEach((item) => {
        let line = '';
        titleArrays.forEach((titleItem) => {
            if (item[titleItem] !== undefined) {
                line += item[titleItem] + ',';
            } else {
                line += ',';
            }
        });
        content += line + '\n';
    });

    try {

        let file = new Blob([content], { type: 'text/plain' });
        let a = document.createElement('a');
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName + '.csv';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Exported Successfully', toastOptions)
    } catch (error) {
        console.log(error);

    }

}