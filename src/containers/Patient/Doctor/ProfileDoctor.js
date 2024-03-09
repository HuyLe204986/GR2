import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../../services';
import './ProfileDoctor.scss';
import { languages } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({ dataProfile: data });
    }

    /**
     * call API lấy thông tin bác sĩ
     * @param {Number} id : id bác sĩ
     * @returns
     */
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await userService.getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId);
        }
        if (this.props.language !== prevProps.language) {
        }
    }

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
     * render ngày giờ khám bệnh lên modal
     * @param {object} dataTime : thông tin ngày giờ khám bệnh
     * @returns
     */
    renderTimeBooking = (dataTime) => {
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
            return (
                <>
                    <div>{time} {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking"/></div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescDoctor, dataTime } = this.props;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left" style={{ backgroundImage: `url(${dataProfile?.image})` }}></div>
                    <div className="content-right">
                        <div className="up">{language === languages.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {isShowDescDoctor ? (
                                <>
                                    {dataProfile?.Markdown?.description && (
                                        <span>{dataProfile.Markdown?.description}</span>
                                    )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile && dataProfile.Doctor_Infor && language === languages.VI && (
                        <NumberFormat
                            value={dataProfile?.Doctor_Infor?.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' VNĐ'}
                            className="currency"
                        />
                    )}

                    {dataProfile && dataProfile.Doctor_Infor && language === languages.EN && (
                        <NumberFormat
                            value={dataProfile?.Doctor_Infor?.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={' $'}
                            className="currency"
                        />
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
