/* COMPONENTE PER IL BODY DELLA TABELLA PRINCIPLAE DELLA PAGINA UTENTI */

import { Fragment } from "react";

import { Box, TableCell, Paper, Skeleton, TableRow } from "@mui/material";

import SnackMessage from "../Snack/SnackMessage";
import HomepageTable from "./HomepageTable";

import { connectionError } from "../../../utils/strings";

export default function HomepageTableBody({
	tableTitle,
	headCells,
	headerButtons = null,
	tableRows,
	loading,
	error,
	rows,
	tablePaginationLabel,
	order,
	setOrder,
	orderBy,
	setOrderBy,
	page,
	setPage,
	rowsPerPage,
	setRowsPerPage,
}) {
	/* Funzione per gestire la richiesta di sorting della tabella */
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	/* Funzione per gestire la richiesta di cambio pagina */
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	/* Funzione per gestire la richiesta di cambio numero righe visualizzate */
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (loading) {
		return (
			<Skeleton
				variant="rectangular"
				animation="wave"
				width={"100%"}
				height={200}
				sx={{ borderRadius: 2 }}
			/>
		);
	}

	if (error) {
		return (
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<SnackMessage text={connectionError} severity="error" variant="filled" />{" "}
				</Paper>
			</Box>
		);
	}

	/* Calcolo di eventuale spazio da aggiugnere all'ultima pagina per fixare il "salto" del layout*/
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%", boxShadow: 4 }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<HomepageTable
					title={tableTitle}
					headerButtons={headerButtons}
					headCells={headCells}
					order={order}
					orderBy={orderBy}
					handleRequestSort={handleRequestSort}
					rows={rows}
					tableBody={
						<Fragment>
							{tableRows}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 73 * emptyRows,
									}}
								>
									<TableCell colSpan={headCells.length} />
								</TableRow>
							)}
						</Fragment>
					}
					paginationLabel={tablePaginationLabel}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				></HomepageTable>
			</Paper>
		</Box>
	);
}
