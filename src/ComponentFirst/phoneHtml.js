import React from "react";

class phoneHtml extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    render() {
        return (
            <div class="container">
            <form id="login" onsubmit="process(event)">
              <p>Enter your phone number:</p>
              <input id="phone" type="tel" name="phone" />
              <input type="submit" class="btn" value="Verify" />
            </form>
           </div>
        );
    }
}
export default phoneHtml;
