import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { userService } from '../../../services';
import moment from 'moment';
import { languages } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverLay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await userService.getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        // console.log('check api', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            },
        );
    };

    /**
     * xử lý khi bác sĩ bấm vào nút xác nhận lịch hẹn
     */
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
        console.log('check data', data);
    };

    /**
     * xử lí khi bấm vào nút cancel hoặc x để đóng modal gửi hóa đơn
     */
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await userService.sendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success(res.errMessage);
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error(res.errMessage);
        }
    };

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverLay active={this.state.isShowLoading} spinner text="loading...">
                    <div className="mange-patient-container">
                        <div className="m-p-title"><FormattedMessage id="manage-patient.medical-examination-schedule"/></div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="manage-patient.choose-date"/></label>
                                <DatePicker
                                    value={this.state.currentDate}
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-patient.numerical-order"/></th>
                                            <th><FormattedMessage id="manage-patient.time"/></th>
                                            <th> <FormattedMessage id="manage-patient.choose-date"/></th>
                                            <th> <FormattedMessage id="manage-patient.full-name"/></th>
                                            <th> <FormattedMessage id="manage-patient.address"/></th>
                                            <th> <FormattedMessage id="manage-patient.actions"/></th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let gender =
                                                    language === languages.VI
                                                        ? item.patientData.genderData.valueVi
                                                        : item.patientData.genderData.valueEn;
                                                let time =
                                                    language === languages.VI
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                <FormattedMessage id="manage-patient.btn-confirm"/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: 'center' }}>
                                                <FormattedMessage id="manage-patient.no-data"/>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverLay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
