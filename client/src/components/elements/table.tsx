/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';
import MaterialTable, { Column, Options, Icons, Action, Localization } from '@material-table/core';

interface TableProps {
    title: string;
    columns: Array<Column<any>>;
    data: Array<any>;
    components?: any;
    icons?: Icons;
    options?: Options<any>;
    editable?: any;
    actions?:
        | (
              | Action<any>
              | ((rowData: any) => Action<any>)
              | {
                    action: (rowData: any) => Action<any>;
                    position: string;
                    onClick: any;
                }
          )[]
        | undefined;
    localization?: Localization;
    tableRef?: React.MutableRefObject<any>;
    onSelectionChange?: (tableData: any[], rowData?: any) => void;
}

// Data table component

const Table: FC<TableProps> = (props: TableProps) => (
    <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        components={props.components}
        tableRef={props.tableRef}
        icons={props.icons}
        options={props.options}
        editable={props.editable}
        actions={props.actions}
        localization={props.localization}
        onSelectionChange={props.onSelectionChange}
    />
);

export default Table;
