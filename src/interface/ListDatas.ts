import {GridColDef} from "@mui/x-data-grid";

export interface ListDatas<T> {
    columns: GridColDef[];
    totalCount: number;
    list: T[];
}