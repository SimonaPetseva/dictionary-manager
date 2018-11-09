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

        if ((!this.state.domain.replace(/\s/g, '').length)) {
            isError = true;
            errors.domainError = "Cannot be blank";
        }

        if ((!this.state.range.replace(/\s/g, '').length)) {
            isError = true;
            errors.rangeError = "Cannot be blank.";
        }

        // Domain and range the same
        if(this.state.domain === this.state.range) {
            isError = true;
            errors.domainError = "Domain and range cannot be the same and/or blank.";
            errors.rangeError = "Domain and range cannot be the same and/or blank.";
        }

        // Duplicate combination of domain and range
        if (this.state.domains.includes(this.state.domain) && this.state.ranges.includes(this.state.range)) {
            isError = true;
            errors.domainError = "Combination of domain and range already exists";
            errors.rangeError = "Combination of domain and range already exists";
        }

        // Duplicate domain
        if (this.state.domains.includes(this.state.domain)) {
            isError = true;
            errors.domainError = "Domain already exists.";
        }

        // Cycles and chains
        if (this.state.domains.includes(this.state.range)) {
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
        const err = this.validate();

        if(!err) {
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
        }
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
                    errorText={this.state.domainError}
                    className="row-input"
                />
                <TextField
                    name="range"
                    hintText="Range"
                    value={this.state.range}
                    onChange={e => this.onChange(e)}
                    floatingLabelFixed
                    errorText={this.state.rangeError}
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