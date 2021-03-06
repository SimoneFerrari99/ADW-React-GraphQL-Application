/* COMPONENTE PER LA STRUTTURA DELLA TABELLA PRINCPALE DELLA PAGINA UTENTE */

import { Fragment } from "react";

import { visuallyHidden } from "@mui/utils";

import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableContainer,
	TableHead,
	TableSortLabel,
	TableRow,
	Toolbar,
	Typography,
	Box,
} from "@mui/material";

/* HEADER DELLA TABELLA */
function CustomTableHead({ order, orderBy, onRequestSort, headCells }) {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding="normal"
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ fontWeight: "bold", fontSize: "1rem" }}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "Ordine decrescente" : "Ordine crescente"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

/* TOOLBAR DELLA TABELLA */
const CustomTableToolbar = ({ title, headerButtons }) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Typography
				sx={{ fontWeight: "bold" }}
				variant="h5"
				id="tableTitle"
				component="div"
			>
				{title}
			</Typography>
			{headerButtons}
		</Toolbar>
	);
};

/* COMPONENTE PRINCIPALE */
export default function HomepageTable({
	headCells,
	title,
	tableBody,
	headerButtons,
	order,
	orderBy,
	rows,
	handleRequestSort,
	paginationLabel,
	rowsPerPage,
	page,
	onPageChange,
	onRowsPerPageChange,
}) {
	return (
		<Fragment>
			<CustomTableToolbar title={title} headerButtons={headerButtons} />
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
					<CustomTableHead
						headCells={headCells}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>{tableBody}</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 50]}
				labelRowsPerPage={paginationLabel}
				getItemAriaLabel={(type) => {
					if (type === "first") {
						return "Prima pagina";
					} else if (type === "last") {
						return "Ultima pagina";
					} else if (type === "next") {
						return "Pagina successiva";
					} else if (type === "previous") {
						return "Pagina precedente";
					}
				}}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</Fragment>
	);
}
