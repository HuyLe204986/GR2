import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    /**
     * thực hiện chọn/thay đổi hình ảnh
     * tạo đường link ảnh url
     * @param {*} event
     */
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        let { isOpenModal, dataModal, closeRemedyModal } = this.props;
        let { email } = this.state;
        return (
            <Modal isOpen={isOpenModal} className="booking-modal-container" size="md" centered>
                <div className="modal-header">
                    <h5 className="modal-title">
                        <FormattedMessage id="manage-patient.send-remedy.send-medical-bill" />
                    </h5>
                    <button type="butotn" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-patient.send-remedy.email" />
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-patient.send-remedy.remedy-file" />
                            </label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        <FormattedMessage id="manage-patient.send-remedy.send" />
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        <FormattedMessage id="manage-patient.send-remedy.cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
