import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_Actions, languages } from '../../../utils';
import { userService } from '../../../services';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
    }

    /**
     * chuyển dữ liệu thành kiểu mảng với các option(item) là object dạng {key, value}
     * @param {array} inputData : mảng dữ liệu các option của select
     * @returns
     */
    buildDataInputSelect(inputData) {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    }

    // Finish!
    /**
     * lưu thông tin markdown và html tương ứng vào state
     * @param {String} html: nội dung html ứng với markdown
     * @param {String} text: nội dung markdown
     */
    handleEditorChange = ({ html, text }) => {
        this.setState({ contentHtml: html, contentMarkdown: text });
    };

    /**
     * xử lý khi bấm vào nút lưu thông tin
     */
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await userService.getDetailDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
        console.log('check res handleChangeSelect', res);
    };

    /**
     * lưu lại thông tin description của bác sĩ vào state
     * @param {*} event
     */
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        });
    };
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiếu: </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={
                        hasOldData === true
                            ? 'btn btn-primary save-content-doctor'
                            : 'btn btn-primary create-content-doctor'
                    }
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => {
            dispatch(actions.fetchAllDoctors());
        },
        saveDetailDoctor: (data) => {
            dispatch(actions.saveDetailDoctor(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
