import {GridColDef} from "@mui/x-data-grid";

export type ListDatas<T> = {
    columns: GridColDef[];
    totalCount: number;
    list: T[];
}