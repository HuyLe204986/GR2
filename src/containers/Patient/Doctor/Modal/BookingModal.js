import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import _ from 'lodash';
import { languages } from '../../../../utils';
import { userService } from '../../../../services';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',

            genders: '',
            selectedGender: '',
            timeType: '',

            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.props.fetchGenders();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                let { genders } = this.props;
                this.setState({
                    genders: this.buildDataGender(genders),
                });
            }
        }
        if (this.props.language !== prevProps.language) {
            let { genders } = this.props;
            this.setState({
                genders: this.buildDataGender(genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let { dataTime } = this.props;
            console.log('date time: ', dataTime);
            let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
            this.setState({
                doctorId: doctorId,
                timeType: dataTime.timeType,
            });
        }
    }

    /**
     * build data gender cho thẻ Select
     * @param {object} data : danh sách giới tính
     * @returns
     */
    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    /**
     * xử lý thay đổi input
     * @param {*} event
     * @param {string} id: định danh cho input nào đang thay đổi
     */
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({ birthday: date[0] });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };

    /**
     * in hoa chữ cái đầu
     * @param {*} string
     * @returns
     */
    capitalizeFirstLetter(string) {
        return string
            .split(' ')
            .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
            .join(' ');
    }

    /**
     * build ngày giờ khám bệnh
     * @param {object} dataTime : thông tin ngày giờ khám bệnh
     * @returns
     */
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === languages.VI
                    ? this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('ddd - MM/DD/YYYY');
            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            return `${time} ${date}`;
        }
        return '';
    };

    /**
     * build tên bác sĩ để call api
     * @param {*} dataTime
     * @returns
     */
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === languages.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return '';
    };

    /**
     * xử lý sự kiện khi bấm vào nút xác nhận tạo thông tin khám bệnh
     */
    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        });

        //validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await userService.postPatientBookAppointment({
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        this.setState({
            isShowLoading: false,
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            this.props.closeBookingModal();
        } else {
            toast.error(res.errMessage);
        }
    };

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
                <Modal isOpen={isOpenModal} className="booking-modal-container" size="lg" centered>
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={closeBookingModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescDoctor={false}
                                    dataTime={dataTime}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        value={this.state.birthday}
                                        // minDate={yesterday}
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn btn-primary" onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className="btn btn-light btn-booking-cancel" onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
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
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
