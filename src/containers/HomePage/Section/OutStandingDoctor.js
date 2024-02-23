import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor-img"></div>
                                    </div>
                                    <div className="positon text-center">
                                        <div>Giáo sư, Tiến sĩ ABCXYZ</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor-img"></div>
                                    </div>
                                    <div className="positon text-center">
                                        <div>Giáo sư, Tiến sĩ ZZZ</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor-img"></div>
                                    </div>
                                    <div className="positon text-center">
                                        <div>Phó giáo sư, Tiến sĩ AAA</div>
                                        <div>Ngoại thần kinh</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor-img"></div>
                                    </div>
                                    <div className="positon text-center">
                                        <div>Giáo sư, Tiến sĩ BBB</div>
                                        <div>Thần kinh </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className="bg-image section-outstanding-doctor-img"></div>
                                    </div>
                                    <div className="positon text-center">
                                        <div>Giáo sư, Tiến sĩ CCC</div>
                                        <div>Tai mũi họng</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
