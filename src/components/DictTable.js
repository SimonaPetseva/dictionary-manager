import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TextField from "material-ui/TextField";

const row = (
    dataItem,
    i,
    header,
    removeRow,
    startEditing,
    editIndex,
    handleChange,
    stopEditing,
    editError,
    errors
) => {
    const currentlyEditing = editIndex === i;
    return(
        // Each Row
        <TableRow key={`tr-${i}`} selectable={false}>
            {/*Row Columns*/}
            {
                header.map((headerItem, k) => (
                    <TableRowColumn key={`trc-${k}`}>
                        {currentlyEditing ? (
                            <TextField
                                name={headerItem.prop}
                                onChange={(e) => handleChange(e, headerItem.prop, i)}
                                value={dataItem[headerItem.prop]}
                            />
                        ) : (
                            dataItem[headerItem.prop]
                        )}
                    </TableRowColumn>
                ))
            }

            {/*Errors*/}
            <TableRowColumn className="errors">
                <div>{errors[i]}</div>
            </TableRowColumn>

            {/*Edit Icon*/}
            <TableRowColumn className="icon">
                {currentlyEditing ? (
                <CheckIcon onClick={() => stopEditing()} />
            ) : (
                <EditIcon onClick={() => startEditing(i)} />
            )}
            </TableRowColumn>
            {/*Trash Icon*/}
            <TableRowColumn className="icon">
                <TrashIcon onClick={() => removeRow(i)} />
            </TableRowColumn>

        </TableRow>
    );
};

const DictTable = ({
    data,
    header,
    removeRow,
    startEditing,
    editIndex,
    handleChange,
    stopEditing,
    editError,
    errors
}) => (
    <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                {
                    header.map((headerItem, i) => (
                        <TableHeaderColumn key={`thc-${i}`}>
                            {headerItem.name}
                        </TableHeaderColumn>
                    ))
                }
                {/*For errors*/}
                <TableHeaderColumn />
                {/*2 more header columns bc of icons*/}
                <TableHeaderColumn />
                <TableHeaderColumn />
            </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>

            { data.map((dataItem, i) =>
                row(
                    dataItem,
                    i,
                    header,
                    removeRow,
                    startEditing,
                    editIndex,
                    handleChange,
                    stopEditing,
                    editError,
                    errors
                )
            )}
        </TableBody>

    </Table>
);

export default DictTable;