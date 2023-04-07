import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DataGridStyle} from "../../assets/GlobalStyle";
import {CustomPagination} from "../product/ProductListMain";
import {ListDatas} from "../../interface/ListDatas";

export default function HistoryTab<T>({list, totalCount, columns}: ListDatas<T>) {
    return (
      <>
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
      </>
    );
}