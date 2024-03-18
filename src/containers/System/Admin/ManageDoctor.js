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

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            selectedPrice: '',

            listPayment: [],
            selectedPayment: '',

            listProvince: [],
            selectedProvince: '',

            listClinic: [],
            selectedClinic: '',

            listSpecialty: [],
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'users');
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resProvince, resPrice, resSpecialty } = this.props.allRequiredDoctorInfor;
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'users');
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'price');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'payment');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'province');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'specialty');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            });
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resProvince, resPrice, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'price');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'payment');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'province');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'specialty');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'clinic');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }

        if (prevProps.isSaveDetailDoctor !== this.props.isSaveDetailDoctor) {
            if (this.props.isSaveDetailDoctor) {
                this.setState({
                    contentHtml: '',
                    contentMarkdown: '',
                    description: '',
                    hasOldData: false,
                    addressClinic: '',
                    nameClinic: '',
                    note: '',
                    selectedPayment: '',
                    selectedPrice: '',
                    selectedProvince: '',
                    selectedSpecialty: '',
                    selectedDoctor: '',
                    selectedClinic: '',
                });
            }
        }
    }

    /**
     * chuyển dữ liệu thành kiểu mảng với các option(item) là object dạng {key, value}
     * @param {array} inputData : mảng dữ liệu các option của select
     * @param {string} type: phân biệt khi nào load data của tên bác sĩ  với (phương thức thanh toán, giá, tỉnh thành..)
     * @returns
     */
    buildDataInputSelect(inputData, type) {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'users') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'price') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'payment' || type === 'province') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'specialty') {
                inputData.map((item) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'clinic') {
                inputData.map((item) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
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
    handleSaveContentMarkdown = async () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        });
        if (this.props.isSaveDetailDoctor) {
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedDoctor: '',
                selectedClinic: '',
            });
        }
    };

    /**
     * xử lý load thông tin bác sĩ khi chọn 1 người trong thẻ Select
     * @param {object} selectedDoctor : data gồm {key, value} của bác sĩ được chọn trong thẻ Select
     */
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listProvince, listPayment, listPrice, listSpecialty, listClinic } = this.state;
        let res = await userService.getDetailDoctor(selectedDoctor.value);
        console.log("res", res);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let nameClinic = '',
                addressClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '',
                specialtyId = '',
                clinicId = '',
                selectedPayment = '',
                selectedPrice = '',
                selectedProvince = '',
                selectedSpecialty = '',
                selectedClinic = '';
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find((item) => item.value === paymentId);
                selectedPrice = listPrice.find((item) => item.value === priceId);
                selectedProvince = listProvince.find((item) => item.value === provinceId);
                selectedSpecialty = listSpecialty.find((item) => item.value === specialtyId);
                selectedClinic = listClinic.find((item) => item.value === clinicId);
            }
            this.setState({
                contentHtml: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            });
        } else {
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
            });
        }
    };

    /**
     *
     * @param {object} selectedOption: item được chọn trong select
     * @param {object} name : object được thư viện return (truyền props name khi sử dụng thẻ Selecte)
     */
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({ ...stateCopy });

        // console.log(selectedOption);
        // console.log('name', name);
    };

    /**
     * lưu lại thông tin description của bác sĩ vào state
     * @param {*} event
     * @param {string} id: định danh cho input cần sửa đổi giá trị
     */
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };
    render() {
        let { hasOldData } = this.state;
        console.log(this.props.isSaveDetailDoctor);
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="doctor-infor row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedSpecialty"
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedClinic"
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
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
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        isSaveDetailDoctor: state.admin.isSaveDetailDoctor,
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
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
