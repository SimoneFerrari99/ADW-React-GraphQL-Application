/* TABELLA ORDINI PRESENTE NELLA TABELLA ORDINI */
import { Fragment, useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import { Box, TableCell, Paper, TableRow } from "@mui/material";

import { DeleteRounded } from "@mui/icons-material";

import HomepageTableBody from "../../../components/layout/Table/HomepageTableBody";
import OpenPersonInfoDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenPersonInfoDialogButton";
import OpenConfirmationDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenConfirmationDialogButton";

import { getComparator } from "../../../utils/functions/sorting";
import {
	ordersTableTitle,
	customerTablePaginationLabel,
	confirmationDeleteTitle,
	confirmationDeleteText,
	cancelLabel,
	confirmDeleteLabel,
	deleteOrderSuccessSnackText,
	actionCancelledSnackText,
} from "../../../utils/strings";

import OpenEditOrderDialogButton from "../../../components/layout/Dialog/DialogOpener/OpenEditOrderDialogButton";
import SnackMessage from "../../../components/layout/Snack/SnackMessage";

/* Celle della tabella */
const headCells = [
	{
		id: "ordNum",
		label: "Ordine",
	},
	{
		id: "ordAMT",
		label: "Totale",
	},
	{
		id: "advanceAMT",
		label: "Anticipo",
	},
	{
		id: "ordDate",
		label: "Data",
	},
	{
		id: "customer.custCode",
		label: "Cliente",
	},
	{
		id: "agent.agentCode",
		label: "Agente",
	},
	{
		id: "ordDescription",
		label: "Descrizione",
	},
	{
		id: "actions",
		label: "Azioni",
	},
];

export default function ManagerOrdersTable() {
	const client = useApolloClient();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("ordNum");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [deleteResult, setDeleteResult] = useState("");

	/* Query per recuperare gli ordini */
	const GET_ORDERS = gql`
		query GetOrders {
			getOrders {
				ordNum
				ordAMT
				advanceAMT
				ordDate
				customer {
					custCode
				}
				agent {
					agentCode
				}
				ordDescription
			}
		}
	`;

	/* Query per cancellare un ordine */
	const DELETE_ORDER = gql`
		mutation DeleteOrder($ordNum: Int!) {
			deleteOrder(ordNum: $ordNum)
		}
	`;

	const { data, loading, error, refetch } = useQuery(GET_ORDERS);
	const rows = !loading && !error && data.getOrders;

	return (
		<Fragment>
			<Box sx={{ width: "100%", boxShadow: 4 }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<HomepageTableBody
						tableTitle={ordersTableTitle}
						headerButtons={null}
						headCells={headCells}
						loading={loading}
						error={error}
						rows={rows}
						tableRows={
							!loading &&
							!error &&
							rows
								.slice()
								.sort(getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `RigaOrdine-${index}`;

									return (
										<TableRow hover tabIndex={-1} key={row.ordNum}>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="normal"
												align="center"
												sx={{ fontWeight: "bold" }}
											>
												{row.ordNum}
											</TableCell>
											<TableCell align="center">{row.ordAMT}</TableCell>
											<TableCell align="center">{row.advanceAMT}</TableCell>
											<TableCell align="center">{row.ordDate}</TableCell>
											<TableCell align="center">
												<OpenPersonInfoDialogButton custCode={row.customer.custCode} />
											</TableCell>
											<TableCell align="center">
												<OpenPersonInfoDialogButton agentCode={row.agent.agentCode} />
											</TableCell>
											<TableCell align="center">{row.ordDescription}</TableCell>
											<TableCell align="center">
												<Box sx={{ display: "flex" }}>
													<OpenEditOrderDialogButton data={row} refetch={refetch} />
													<OpenConfirmationDialogButton
														iconButton={<DeleteRounded color="error" />}
														ariaLabel="elimina ordine"
														confirmationTitle={confirmationDeleteTitle}
														confirmationText={confirmationDeleteText}
														handleConfirmation={async () => {
															await client.mutate({
																mutation: DELETE_ORDER,
																variables: {
																	ordNum: row.ordNum,
																},
															});
															refetch();
														}}
														noText={cancelLabel}
														yesText={confirmDeleteLabel}
														startIconYes={<DeleteRounded />}
														setResult={setDeleteResult}
													/>
												</Box>
											</TableCell>
										</TableRow>
									);
								})
						}
						tablePaginationLabel={customerTablePaginationLabel}
						order={order}
						orderBy={orderBy}
						page={page}
						rowsPerPage={rowsPerPage}
						setOrder={setOrder}
						setOrderBy={setOrderBy}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
					/>
				</Paper>
			</Box>
			{deleteResult === "confirmed" && (
				<SnackMessage
					text={deleteOrderSuccessSnackText}
					variant="filled"
					severity="success"
					reset={setDeleteResult}
				/>
			)}
			{deleteResult === "cancelled" && (
				<SnackMessage
					text={actionCancelledSnackText}
					variant="filled"
					severity="warning"
					reset={setDeleteResult}
				/>
			)}
		</Fragment>
	);
}
