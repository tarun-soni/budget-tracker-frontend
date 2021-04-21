import { Button, Col, Form, Modal } from 'react-bootstrap'

const AddTransactionModal = ({
  transactionData,
  setTransactionData,
  submitTransaction,
  ...props
}) => {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {console.log('in modal')}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md={12}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-2 font-l">Amount</Form.Label>
                <Form.Control
                  value={transactionData.amount}
                  onchange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      amount: e.taget.value
                    })
                  }
                />

                <Form.Label className="font-l">Type</Form.Label>
                <Form.Control
                  as="select"
                  value={transactionData.type}
                  onchange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      type: e.taget.value
                    })
                  }
                >
                  <option className="font-m">EXPENSE</option>
                  <option className="font-m">DEPOSIT</option>
                </Form.Control>

                <Form.Label className="font-l">Select Category</Form.Label>
                <Form.Control
                  as="select"
                  value={transactionData.category}
                  onchange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      category: e.taget.value
                    })
                  }
                >
                  <option className="font-m">FOOD</option>
                  <option className="font-m">TRANSPORT</option>
                  <option className="font-m">CAR</option>
                  <option className="font-m">SHOPPING</option>
                  <option className="font-m">TELEPHONE</option>
                  <option className="font-m">MEDICINE</option>
                  <option className="font-m">PET</option>
                  <option className="font-m">TRAVEL</option>
                  <option className="font-m">OTHER</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer className="lspace-large">
          <Button className="lspace-large" onClick={props.onHide}>
            Close
          </Button>
          <Button className="lspace-large" onClick={submitTransaction}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddTransactionModal
