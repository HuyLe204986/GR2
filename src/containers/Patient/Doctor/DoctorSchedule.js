import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { languages } from '../../../utils';
import { userService } from '../../../services';
import { FormattedMessage } from 'react-intl';

import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [],
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({ allDays: allDays });
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let index = 0; index < 7; index++) {
            let obj = {};
            if (index === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = language === languages.VI ? `Hôm nay - ${ddMM}` : `Today - ${ddMM}`;
                obj.label = today;
            } else {
                if (language === languages.VI) {
                    let labelVi = moment(new Date()).add(index, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                } else {
                    obj.label = moment(new Date()).add(index, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(index, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }
        return allDays;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({ allDays: allDays });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            console.log('check all days: ', allDays);
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
                this.setState({
                    allAvailableTimes: res.data ? res.data : [],
                });
            }
        }
    }
    /**
     * xử lý khi thay đổi khi chọn ngày tháng  trong thẻ select
     * @param {*} event
     */
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await userService.getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({ allAvailableTimes: res.data ? res.data : [] });
            }
            console.log('scheduleDoctor', res);
        }
    };

    /**
     * in hoa chữ cái đầu
     * @param {*} string
     * @returns
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { allDays, allAvailableTimes } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fas fa-calendar-alt">
                            {' '}
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </i>
                    </div>
                    <div className="time-content">
                        {allAvailableTimes && allAvailableTimes.length > 0 ? (
                            <>
                                <div className="time-content-btns">
                                    {allAvailableTimes.map((item, index) => {
                                        let time =
                                            language === languages.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn;
                                        return (
                                            <button
                                                key={index}
                                                className={language === languages.VI ? 'btn-vi' : 'btn-en'}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="book-free">
                                    <FormattedMessage id="patient.detail-doctor.choose" />
                                    <i className="far fa-hand-point-up"></i>
                                    <FormattedMessage id="patient.detail-doctor.book-free" />
                                </div>
                            </>
                        ) : (
                            <div className="no-schedule">
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
