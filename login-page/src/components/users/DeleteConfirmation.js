import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function DeleteConfirmation(props) {
    return (
        <>
            <Modal
                show={props.showModal}
                onHide={() => {props.closeModalHandler()}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {props.closeModalHandler()}}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => {props.deleteHandler()}}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}