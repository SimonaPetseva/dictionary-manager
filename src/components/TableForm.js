import React, {Component} from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class TableForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            titleError: "",

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
        let titleError = "";

        if (!this.state.title.replace(/\s/g, '').length) {
            isError = true;
            titleError = "Please enter a title"
        }

        this.setState({
            ...this.state,
            titleError: titleError
        });

        return isError;
    };

    onSubmit = (e) => {
        e.preventDefault();

        const err = this.validate();

        if(!err) {
            this.setState({
                title: "",
            });
            this.props.onSubmit(this.state);
        }
    };

    handleEnterPress = (e) => {
        e.preventDefault();
        this.onSubmit(e);
    };

    render() {
        return (
            <form onSubmit={e => this.handleEnterPress(e)}>
                <TextField
                    name="title"
                    hintText="Dictionary Title"
                    value={this.state.title}
                    onChange={e => this.onChange(e)}
                    errorText={this.state.titleError}
                    floatingLabelFixed
                    className="table-form-input"
                />
                <RaisedButton
                    label="Add Dictionary"
                    onClick={e => this.onSubmit(e)}
                    primary
                />
            </form>
        );
    }
}

export default TableForm;