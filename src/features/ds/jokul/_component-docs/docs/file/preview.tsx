import {File as JklFile} from "@fremtind/jokul/file";

export function FilePreview() {
    return (
        <div style={{maxWidth: "22rem", width: "100%"}}>
            <JklFile
                fileName="kvittering.pdf"
                fileType="application/pdf"
                fileSize={428000}
                state="loading"
            />
        </div>
    );
}
