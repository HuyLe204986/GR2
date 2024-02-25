import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Giải trí</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/5PvzGDU8WjM"
                            title="HIEUTHUHAI - Không Thể Say | Live Performance at Sóng 24"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <div className='content-text'>Trong tim tớ câu luôn là SỐ 1 nhưng lại luôn bị cậu FIRST lờ.</div>
                        <div className='content-text'>Vì TOIEC kỷ nên không muốn IELTS bạn.</div>
                        <div className='content-text'>Life is not about the quantity of friends you have. It is about the quanlity of friends you have.</div>
                        <div className='content-text'>Family is the only thing that exists. If other things are there or not, it doesn't matter.</div>
                        <div className='content-text'>I don't need the whole world to love me, understand me, cafe for me, be there for me. I just need one person and that's you.</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
