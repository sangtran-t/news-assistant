import React, {Component} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './styles/demo.style.css';
import cancel from '../images/cancel.svg';
import next from '../images/next.svg';
import loading from '../images/loading.svg';

const animatedComponents = makeAnimated();
const options = [
    { 
        value: {
            context: 'Bác sĩ Đào Thị Loan cho biết viêm não, viêm màng não là tình trạng viêm nhiễm của nhu mô não và màng não. Bệnh cấp cứu nguy hiểm có thể gặp ở mọi lứa tuổi do nhiều tác nhân như virus, vi khuẩn, nấm, ký sinh trùng, nấm, lao... Nguyên nhân thường gặp ở trẻ em do virus như virus gây viêm não Nhật bản, virus Herpes, EV71, sởi, cúm. Triệu chứng gồm sốt, đau đầu, nôn, quấy khóc, li bì. Trường hợp nặng có thể gây co giật, hôn mê, bệnh diễn biến nhanh. Bệnh xuất hiện rải rác quanh năm, xu hướng tăng vào mùa nắng nóng. Viêm màng não do virus rất khó phát hiện vì biểu hiện rất giống với người bị cảm cúm. Do đó, cần phát hiện sớm và điều trị kịp thời để giảm thiểu nguy cơ tử vong hoặc để lại di chứng chậm phát triển tinh thần, vận động, bại não, động kinh cho trẻ.', 
            question: 'Những nguyên nhân nào gây nên bệnh viêm màng não?'
        }, 
        label: 'Những nguyên nhân nào gây nên bệnh viêm màng não?' 
    },
    { 
        value: {
            context: 'Sáng 1/9, đại diện Sở Y tế Quảng Trị cho hay người dân 5 xã gồm Vĩnh Hà, Vĩnh Ô, Vĩnh Tú (huyện Vĩnh Linh), xã Linh Trường (huyện Gio Linh), xã Hương Sơn (huyện Hướng Hóa), được tiêm vaccine bạch hầu trong tháng 9 và 10. Dự kiến, việc tiêm chủng thực hiện làm hai đợt, mỗi đợt tiêm một mũi, cách nhau một tháng. Kế hoạch tiêm chủng thực hiện theo phương thức cuốn chiếu để huy động được tối đa nguồn nhân lực, vật tư tiêm chủng, tránh bỏ sót người dân. Mục tiêu là trên 95% người từ 49 tháng tuổi đến 40 tuổi tại 5 xã được tiêm đủ mũi vaccine Td phòng bạch hầu. Kế hoạch tiêm chủng giúp tỉnh phòng chống dịch bạch hầu chủ động, giảm tỷ lệ mắc và tử vong. Quảng Trị đề nghị Bộ Y tế hỗ trợ 18.800 liều vaccine Td, kinh phí 157 triệu đồng. Hai tháng 7 và 8, Quảng Trị ghi nhận 22 ca bạch hầu. Bệnh nhân chủ yếu là người dân tộc thiểu số, ở vùng sâu xa, vùng khó khăn. Tại Tây Nguyên, từ đầu năm đến ngày 18/7 ghi nhận 117 ca bạch hầu, trong đó ba trường hợp tử vong. Đa số bệnh nhân không tiêm chủng vaccine bạch hầu đủ mũi, đúng lịch.', 
            question: 'Những tỉnh nào sẽ được tiêm vaccine bạch hầu?'
        }, 
        label: 'Những tỉnh nào sẽ được tiêm vaccine bạch hầu?' },
    { 
        value: {
            context: 'Sáng 1/9, đại diện Sở Y tế Quảng Trị cho hay người dân 5 xã gồm Vĩnh Hà, Vĩnh Ô, Vĩnh Tú (huyện Vĩnh Linh), xã Linh Trường (huyện Gio Linh), xã Hương Sơn (huyện Hướng Hóa), được tiêm vaccine bạch hầu trong tháng 9 và 10. Dự kiến, việc tiêm chủng thực hiện làm hai đợt, mỗi đợt tiêm một mũi, cách nhau một tháng. Kế hoạch tiêm chủng thực hiện theo phương thức cuốn chiếu để huy động được tối đa nguồn nhân lực, vật tư tiêm chủng, tránh bỏ sót người dân. Mục tiêu là trên 95% người từ 49 tháng tuổi đến 40 tuổi tại 5 xã được tiêm đủ mũi vaccine Td phòng bạch hầu. Kế hoạch tiêm chủng giúp tỉnh phòng chống dịch bạch hầu chủ động, giảm tỷ lệ mắc và tử vong. Quảng Trị đề nghị Bộ Y tế hỗ trợ 18.800 liều vaccine Td, kinh phí 157 triệu đồng. Hai tháng 7 và 8, Quảng Trị ghi nhận 22 ca bạch hầu. Bệnh nhân chủ yếu là người dân tộc thiểu số, ở vùng sâu xa, vùng khó khăn. Tại Tây Nguyên, từ đầu năm đến ngày 18/7 ghi nhận 117 ca bạch hầu, trong đó ba trường hợp tử vong. Đa số bệnh nhân không tiêm chủng vaccine bạch hầu đủ mũi, đúng lịch.', 
            question: 'Kinh phí ước tính cho 18.800 liều vaccine bạch hầu là bao nhiêu?'
        }, 
        label: 'Kinh phí ước tính cho 18.800 liều vaccine bạch hầu là bao nhiêu?' 
    }];


class Demo extends Component {
    constructor(props){
        super(props);
        this.state={
            context: "",
            question: "",
            answer: "",
            context_processed: "",
            loading: false,
        }
    }

    handleSelect = (e)=>{
        if (e){
            this.setState({
                context: e.value.context,
                question: e.value.question
            })
        }
    }

    handleEnter = (e)=>{
        if (e.key === 'Enter') {
            this.clickSend()
        }
    }

    clickSend = async () => {
        this.setState({
            answer:"",
            loading:true
        });
        
        if (this.state.context && this.state.question){
            await fetch(process.env.REACT_APP_MRC_BOT_ENDPOINT + "/predict", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ctx: this.state.context, q: this.state.question })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            loading: false,
                            answer: result,
                            context_processed: this.getHighlightedText(this.state.context, result['answer'])
                        })
                    },
                    (error) => {
                        this.setState({
                            answer:"",
                            loading: false,
                            error
                        })
                    }
                )
        } else {
            this.setState({
                loading: false
            })
        }
    }
    
    getHighlightedText(text, highlight) {
        const escapeRegExp = (string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
        };
        const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, 'gi'));
        return(
            <span>
                {parts.map((part, i) =>
                    <span key={i} style={part === highlight && i < 2 ?
                        { fontWeight: 'bold', backgroundColor: 'aqua', borderRadius: '5px' } : {}}>
                        {part}
                    </span>)
                }
            </span>
        );
    }

    render(){
        return(
            <div className='demopopup'>
                <div className='demopopup_inner'>
                    <div id='container'>
                        <div id='option'>
                            <div>
                                <Select
                                    closeMenuOnSelect='true'
                                    components={animatedComponents}
                                    options={options}
                                    onChange={this.handleSelect}
                                    placeholder="Select question sample..."
                                    // isMulti
                                />
                            </div>
                        </div>
                        <div id="demo-content">
                            <div id='demo-input'>
                                Passage
                                <textarea spellCheck="false" onChange={(event)=>{
                                    this.setState({
                                        context: event.target.value
                                    })
                                }} required value={this.state.context}/>
                                <br/>Question
                                <input spellCheck="false" onChange={(event)=>{
                                    this.setState({
                                        question: event.target.value
                                    })
                                }} onKeyPress={this.handleEnter} required value={this.state.question}/>
                            </div>
                            <div id='status'>
                                {this.state.loading ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50px" height="50px" viewBox="0 0 128 128">
                                        <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><g>
                                            <circle cx="16" cy="64" r="16" fill="#000000" fillOpacity="1" />
                                            <circle cx="16" cy="64" r="14.344" fill="#000000" fillOpacity="1" transform="rotate(45 64 64)" />
                                            <circle cx="16" cy="64" r="12.531" fill="#000000" fillOpacity="1" transform="rotate(90 64 64)" />
                                            <circle cx="16" cy="64" r="10.75" fill="#000000" fillOpacity="1" transform="rotate(135 64 64)" />
                                            <circle cx="16" cy="64" r="10.063" fill="#000000" fillOpacity="1" transform="rotate(180 64 64)" />
                                            <circle cx="16" cy="64" r="8.063" fill="#000000" fillOpacity="1" transform="rotate(225 64 64)" />
                                            <circle cx="16" cy="64" r="6.438" fill="#000000" fillOpacity="1" transform="rotate(270 64 64)" />
                                            <circle cx="16" cy="64" r="5.375" fill="#000000" fillOpacity="1" transform="rotate(315 64 64)" />
                                            <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
                                            </animateTransform>
                                        </g>
                                    </svg> 
                                    : <img src={next} alt="" onClick={this.clickSend}/>}
                            </div>
                            <div id='demo-result'>
                                Answer
                                {/* <textarea readOnly spellCheck="false" value={this.state.answer['answer']}/> */}
                                <div id='demo-answer'>{this.state.loading ? <div><img src={loading} alt=""/></div> : this.state.answer['answer'] }</div>
                                <br/>Passage Context
                                {/* <textarea readOnly spellCheck="false" value={this.state.context_processed}/> */}
                                <div>{this.state.loading ? <div><img src={loading} alt=""/></div> : this.state.context_processed }</div>
                            </div>
                        </div>
                        <div className="copyright">
                            <span>Made with</span> 
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heartbeat" className="svg-inline--fa fa-heartbeat fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#e00" d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"></path></svg>
                            <span>ISE-UIT</span> 
                        </div>
                    </div>
                    <img src={cancel} onClick={this.props.toggleDemo} alt="Close"/>
                </div>
            </div>
        )
    }
}

export default Demo;