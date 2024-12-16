import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const renderFilePreview = (file, type) => {
    switch (type) {
        case "images":
            return <Icon icon="material-symbols:image" className="w-8 h-8" />;
        case "videos":
            return <Icon icon="mdi:video" className="w-8 h-8" />;
        case "audios":
            return <Icon icon="nt-design:audio-filled" className="w-8 h-8" />;
        default:
            return <Icon icon="mdi:files" className="w-8 h-8" />;
    }
};
const downloadFile = (file) => {
    if (file.id) {
        downloadFromUrl(NEXT_PUBLIC_STRAPI_URL + file.url, file.name)
        return
    } else {
        downloadFromUrl(URL.createObjectURL(file), file.name)
    }
}


function downloadFromUrl(url, fileName) {
    const link = document.createElement("a");
    link.href = url;
    link.target = '_blank'
    link.download = fileName || "download";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



function MediaPreview({ files, type, handleMediaRemove }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePreview = (file) => {
        setSelectedFile(file);
        setIsModalOpen(true);
    };
    function formatBytes(bytes) {
        if (bytes === 0) return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = bytes / Math.pow(1024, i);
        return `${size.toFixed(2)} ${sizes[i]}`;
    }

    return (
        <>
            {files.map((file, fileIndex) => (
                <div className="col-span-12 lg:col-span-4 inline-flex mr-6">
                <div key={file.name} className="border border-default-400 py-10 p-6 my-6 rounded-sm showTopicContent">
                    <div className="flex space-x-3 items-center ">
                        <div className="">
                            {renderFilePreview(file, type)}
                        </div>
                        <div>
                            <div className="text-sm text-card-foreground">{file.name}</div>
                            {file.size && <div className="text-xs font-light text-muted-foreground">
                                {formatBytes(file.size)}
                            </div>}
                        </div>
                    </div>
                    <div className="editTopicContent absolute  top-1 right-3  gap-1.5">

          <Button size="icon" variant="outline" className=" h-6 w-6 mr-2" onClick={() => downloadFile(file)}>
            <Icon icon="heroicons:arrow-down-tray" className=" h-4 w-4  " />
          </Button>

          <Button size="icon" variant="outline" className=" h-6 w-6 mr-2" onClick={() => handlePreview(file)}>
            <Icon icon="raphael:view" className=" h-4 w-4  " />
          </Button>

          <Button size="icon" variant="outline" className=" h-6 w-6" onClick={() => handleMediaRemove(fileIndex, type)}>
            <Icon icon="heroicons:trash" className=" h-4 w-4  " />
          </Button>
        </div>
                    {/* <div className="editTopicContent">
                        <Button
                            size="icon"
                            color="default"
                            variant=""
                            className="mr-2 h-8 w-8 rounded-full"
                            onClick={() => downloadFile(file)}
                        >
                            <Icon icon="material-symbols:download-sharp" className="h-6 w-6" />
                        </Button>

                        {(file?.name?.endsWith('pdf') || type !== 'files') && <Button
                            size="icon"
                            color="default"
                            variant=""
                            className="mr-2 h-8 w-8 rounded-full"
                            onClick={() => handlePreview(file)}
                        >
                            <Icon icon="raphael:view" className="h-6 w-6" />
                        </Button>}
                        <Button
                            size="icon"
                            color="default"
                            variant=""
                            className=" h-8 w-8 rounded-full"
                            onClick={() => handleMediaRemove(fileIndex, type)}
                        >
                            <Icon icon="mi:delete" className="h-6 w-6" />
                        </Button>
                    </div> */}
                </div>
                </div>
            ))}

            {isModalOpen && (
                <Dialog defaultOpen onOpenChange={() => setIsModalOpen(false)}>
                    <DialogContent size={selectedFile?.name?.endsWith('.pdf') ? "full" : '5xl'}>
                        <DialogHeader>
                            <DialogTitle className="text-base font-medium text-default-700 ">
                                Preview {type}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-sm text-default-500 space-y-4 flex self-center">
                            {type === "images" && <img src={selectedFile.id ? NEXT_PUBLIC_STRAPI_URL + selectedFile.url : URL.createObjectURL(selectedFile)} alt={selectedFile.name} className="w-10 h-10 rounded-md object-cover" />}
                            {type === "videos" && <video
                                controls
                                src={selectedFile.id ? NEXT_PUBLIC_STRAPI_URL + selectedFile.url : URL.createObjectURL(selectedFile)}
                                className="max-w-full max-h-[80vh]"
                            />}
                            {type === "audios" && <audio
                                controls
                                src={selectedFile.id ? NEXT_PUBLIC_STRAPI_URL + selectedFile.url : URL.createObjectURL(selectedFile)}
                                className="max-w-full max-h-[80vh]"
                            >
                                Your browser does not support the audio element.
                            </audio>}
                            {type === "files" && selectedFile?.name?.endsWith('.pdf') &&
                                <div className="h-screen w-screen">
                                    <object data={selectedFile.id ? NEXT_PUBLIC_STRAPI_URL + selectedFile.url : URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="100%" />
                                </div>}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default MediaPreview;
