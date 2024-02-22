import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomeHeader.scss';
import { FormattedMessage } from "react-intl";

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>Chuyên khoa</b>
                                </div>
                                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Cơ sở y tế</b>
                                </div>
                                <div className="sub-title">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Bác sĩ</b>
                                </div>
                                <div className="sub-title">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>Gói khám</b>
                                </div>
                                <div className="sub-title">Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div>
                                <i className="fas fa-question-circle"></i>Hỗ trợ
                            </div>
                            <div className="flag">Việt Nam</div>
                        </div>
                    </div>
                </div> */}
                <HomeHeader />
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title"><FormattedMessage id="banner.title1"/></div>
                        <div className="title"><FormattedMessage id="banner.title2"/></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.check-specialty"/></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-procedures"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.general"/></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.test"/></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.mental"/></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.dental"/></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child"><FormattedMessage id="banner.remote"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
