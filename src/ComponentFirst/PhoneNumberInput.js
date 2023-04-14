import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = () => {

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm();


    const onSubmit = (data) => {
        console.log({ data });
    };

    const handleValidate = (value) => {
        const isValid = isValidPhoneNumber(value);
        console.log({ isValid })
        console.log(value);
        return isValid
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
                <div>
                    <label htmlFor="phone-input">Phone Number</label>
                    <Controller
                        name="phone-input"
                        control={control}
                        rules={{
                            validate: (value) => handleValidate(value)
                        }}
                        render={({ field: { onChange, value } }) => (
                            <PhoneInput

                                value={value}
                                onChange={onChange}
                                defaultCountry="US"
                                international
                                countryCallingCodeEditable={false}
                                // country="US"

                                id="phone-input"
                            />

                            // this is where our react-phone-number-input will go
                        )}
                    />

                    {errors["phone-input"] && (
                        <p className="text-danger">Invalid Phone</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PhoneNumberInput;


// -------------------------------------
// getPhone2 = (e, value, data, formattedValue) => {

//     console.log(this.state.input);
//     console.log(value);
//     // console.log(value.dialCode.length);
//     // console.log(value.format.length);

//     // console.log({ rawPhone: value.slice(data.dialCode.length) });
//     // let actualDigit = value.slice(data.dialCode.length).length

//     // console.log("actualDigit : "+actualDigit);

//     // let dialCodeLen = (data.dialCode.length);
//     // let inputLen = (value.length);
//     // console.log(data.dialCode + "length: " + dialCodeLen);
//     // console.log(value + " val length : " + inputLen);

//     // let phoneDigit = inputLen - dialCodeLen;

//     // console.log("phoneDigit : " + phoneDigit);

//     // let b1 = ((data.format.length) - (data.dialCode.length))

//     let inputs = this.state.input;
//     inputs["phone"] = value;
//     this.setState({
//         input: inputs,
//         // FormatLen : b1,        
//     });
// }


  // console.log(value.dialCode.length);
        // console.log(value.format.length);
        // console.log(typeof(value.format));
        // console.log(value.format);
        // const words = value.format.split(' ');
        // console.log(words);