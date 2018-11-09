import React, { Component } from 'react';
import TrashIcon from "material-ui/svg-icons/action/delete";

import RowForm from './RowForm';
import DictTable from './DictTable';

class TableContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            editIndex: -1,
            edit: '',
            editError: '',
        };
    }


    validateEdit = (i) => {
        let isError = false;
        const errors = {
            editError: "",
        };

        // Domain/range empty
        if ((!this.state.edit.replace(/\s/g, '').length)) {
            isError = true;
            errors.editError = "Cannot be blank";
        }

        // Domain and range the same
        if(this.state.edit === this.state.rows[i].domain && this.state.edit === this.state.rows[i].range) {
            isError = true;
            errors.editError = "Domain and range cannot be the same and/or blank.";
        }

        if (isError) {
            this.setState({
                ...this.state,
                ...errors
            });
        }

        return isError;
    };

    startEditing = (i) => {
        this.setState({
            editIndex: i
        });
    };

    stopEditing = () => {
        if (this.state.editError === '') {
            this.setState({
                editIndex: -1
            });
        }
    };

    handleChange = (e, name, i) => {
        const { value } = e.target;
        let err = false;

        this.setState({
            edit: value
        }, () => {
            setTimeout(() => { err = this.validateEdit(i) }, 500);

            if(!err) {
                this.setState(state => ({
                    rows: state.rows.map(
                        (row, j) => (j === i ? { ...row, [name]: value } : row)
                    )
                }), () => {
                    this.setState({
                        editError: ''
                    })
                });
            }
        });
    };

    removeRow = (i) => {
        this.setState(state => ({
            rows: state.rows.filter((row, j) => j !== i),
        }));
    };

    removeTable = (e) => {
        this.setState({
            rows: [],
        });
        e.target.parentNode.parentNode.parentNode.remove(0);
    };

    render() {
        return (
            <div className="dictionary">
                <header>
                    <h2>{this.props.title}</h2>
                    <TrashIcon onClick={(e) => this.removeTable(e)} />
                </header>

                {/*Generate Table*/}
                <DictTable
                    removeRow={this.removeRow}
                    editError={this.state.editError}
                    startEditing={this.startEditing}
                    editIndex={this.state.editIndex}
                    stopEditing={this.stopEditing}
                    handleChange={this.handleChange}

                    data={this.state.rows}
                    header={[
                        {
                            name: 'Domain',
                            prop: 'domain'
                        },
                        {
                            name: 'Range',
                            prop: 'range'
                        }
                    ]}
                />

                {/*Add new row*/}
                <RowForm
                    onSubmit={submission =>
                        this.setState({
                            rows: [...this.state.rows, submission]
                        })}
                />

            </div>
        );
    }
}

export default TableContainer;
