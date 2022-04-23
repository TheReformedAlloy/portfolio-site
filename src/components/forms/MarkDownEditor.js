import Script from "next/script";
import Form from "react-bootstrap/Form";

export default function MarkDownEditor({title, controlId, onInit, defaultValue, ...rest}) {
    return (
        <>
            <Script
                strategy="beforeInteractive"
                key="jquery"
                src="https://code.jquery.com/jquery-3.6.0.min.js" />
            <Script
                strategy="afterInteractive"
                key="easymde"
                src="https://unpkg.com/easymde/dist/easymde.min.js"
                onLoad={() => {
                    const element = $(`#${controlId}`)[0];
                    let editor = new EasyMDE({element});
                    if(onInit) onInit(editor);
                    if(defaultValue) editor.value(defaultValue);
                }}/>
            <Form.Group controlId={controlId}>
                <Form.Label>{title}</Form.Label>
                <Form.Control className="d-none" name="description" as="textarea" {...rest} />
            </Form.Group>
        </>
    )
}