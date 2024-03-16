import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { userService } from '../../../services';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    /**
     * xử lý thay đổi input
     * @param {object} event
     * @param {string} id : id của input cần thay đổi
     */
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    /**
     * lưu thông tin markdown và html tương ứng vào state
     * @param {String} html: nội dung html ứng với markdown
     * @param {String} text: nội dung markdown
     */
    handleEditorChange = ({ html, text }) => {
        this.setState({ descriptionHTML: html, descriptionMarkdown: text });
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
                imageBase64: base64,
            });
        }
    };

    /**
     * xử lý khi bấm nút save thông tin chuyên khoa
     */
    handleSaveNewSpecialty = async () => {
        let res = await userService.createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Error creating new specialty');
        }
    };

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Upload ảnh</label>
                        <input
                            className="form-control-file"
                            type="file"
                            // value={this.state.imageBase64}
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary btn-save-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            Save
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
