import React, {Component} from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class RowForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            domain: "",
            range: "",
            domainError: "",
            rangeError: "",
            domains: [],
            ranges: []
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // Validation
    validate = () => {
        let isError = false;
        const errors = {
            domainError: "",
            rangeError: ""
        };

        if ((!this.state.domain.replace(/\s/g, '').length) || (!this.state.range.replace(/\s/g, '').length)) {
            isError = true;
            errors.domainError = "Cannot be blank";
        }

        // Domain and range the same
        if(this.state.domain === this.state.range && ( (this.state.domain.replace(/\s/g, '').length) || (this.state.range.replace(/\s/g, '').length) )) {
            isError = true;
            errors.domainError = "Domain and range are the same.";
            errors.rangeError = "";
        }

        // Duplicate combination of domain and range
        if (this.state.domains.includes(this.state.domain) && this.state.ranges.includes(this.state.range)) {
            isError = true;
            errors.domainError = "Combination of domain and range already exists";
            errors.rangeError = "";
        }

        // Cycles and chains
        if (this.state.domains.includes(this.state.domain) && this.state.domains.includes(this.state.range)) {
            isError = true;
            errors.rangeError = "This value already exist in the Domain column of another entry.";
        }

        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }

        return isError;
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.validate();

        setTimeout(() => { this.props.handleErrors(this.state.domainError, this.state.rangeError) }, 1000);


        setTimeout(() => {
            this.setState({
                    domains: [...this.state.domains, this.state.domain],
                    ranges: [...this.state.ranges, this.state.range],
                },
                () => {
                    this.props.onSubmit(this.state);
                    this.setState({
                        domain: "",
                        range: "",
                        domainError: "",
                        rangeError: "",
                    })
                }
            );
        }, 1500);

    };

    render() {
        return (
            <form className="row-form">
                <TextField
                    name="domain"
                    hintText="Domain"
                    value={this.state.domain}
                    onChange={e => this.onChange(e)}
                    floatingLabelFixed
                    className="row-input"
                />
                <TextField
                    name="range"
                    hintText="Range"
                    value={this.state.range}
                    onChange={e => this.onChange(e)}
                    floatingLabelFixed
                    className="row-input"
                />
                <RaisedButton
                    label="Add Row"
                    onClick={e => this.onSubmit(e)} primary
                />
            </form>
        );
    }
}

export default RowForm;