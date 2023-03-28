
import React from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class PhoneDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = (value, data, event, formattedValue) => {
        let dialCodeLen =(data.dialCode.length);
        console.log(data.dialCode+"length: "+dialCodeLen);
        let inputLen =(value.length);
        console.log(data.dialCode+"length: "+dialCodeLen );
        console.log(value+" val length : "+ inputLen);
        this.setState({ phone: value });
    }

    render() {
        return (
            <div>
                <p>Phone Demo</p>
                <PhoneInput
                    country={'us'}
                    value={this.state.phone}
                    onChange={this.handleOnChange}
                />
            </div>
        );
    }
}
export default PhoneDemo;
