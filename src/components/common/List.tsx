import {DataGridStyle} from "../../assets/GlobalStyle";
import {CustomPagination} from "../product/ProductListMain";
import {DataGrid} from "@mui/x-data-grid";
import {ListDatas} from "../../interface/ListDatas";

export default function List<T>({list, columns, totalCount}: ListDatas<T>) {
    return (
        <DataGrid
            rows={list}
            columns={columns}
            pageSize={totalCount}
            sx={DataGridStyle}
            // rowsPerPageOptions={[listFilter.limit as number]}
            pagination
            paginationMode={'server'}
            rowCount={0}
            keepNonExistentRowsSelected
            components={{
                Pagination: CustomPagination
            }}
        />
    );
}