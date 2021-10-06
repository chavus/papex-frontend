import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

export default function Notification(props){
    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);
    
    const {
        title,
        body
    } = props
    return(

            <Toast isOpen={show}>
                <ToastHeader toggle={toggle}>{title}</ToastHeader>
                <ToastBody>
                    {body}
                </ToastBody>
            </Toast>
    )
}