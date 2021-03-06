/* RIGA DI AMOUNT CARD DELLA PAGINA CUSTOMER */
import { useQuery, gql } from "@apollo/client";
import { ReactSession } from "react-client-session";

import { Box } from "@mui/material/";

import {
	AttachMoneyRounded,
	AssuredWorkloadRounded,
	ReceiptRounded,
	AccessTime,
} from "@mui/icons-material";

import AmountCard from "../../../components/layout/Amount/AmountCard";

import {
	openingAmountCardLabel,
	receiveAmountCardLabel,
	paymentAmountCardLabel,
	outstandingAmountCardLabel,
} from "../../../utils/strings";

/* Query per recuperare gli amount del cliente*/
const amounts = gql`
	query GetAmounts($custCode: String!) {
		customerById(custCode: $custCode) {
			openingAMT
			receiveAMT
			paymentAMT
			outstandingAMT
		}
	}
`;

export default function AmountRow() {
	/* Esecuzione della query */
	const { data, loading, error } = useQuery(amounts, {
		variables: {
			custCode: ReactSession.get("code"),
		},
	});
	return (
		<Box
			sx={{
				display: "grid",
				gap: 2,
				gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
			}}
		>
			<AmountCard
				loading={loading}
				error={error}
				title={openingAmountCardLabel}
				data={!loading && !error && data.customerById.openingAMT}
				icon={<AttachMoneyRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={receiveAmountCardLabel}
				data={!loading && !error && data.customerById.receiveAMT}
				icon={<AssuredWorkloadRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={paymentAmountCardLabel}
				data={!loading && !error && data.customerById.paymentAMT}
				icon={<ReceiptRounded sx={iconStyle} />}
			/>
			<AmountCard
				loading={loading}
				error={error}
				title={outstandingAmountCardLabel}
				data={!loading && !error && data.customerById.outstandingAMT}
				icon={<AccessTime sx={iconStyle} />}
			/>
		</Box>
	);
}

const iconStyle = { fontSize: { xs: 25, sm: 30, md: 40 } };
