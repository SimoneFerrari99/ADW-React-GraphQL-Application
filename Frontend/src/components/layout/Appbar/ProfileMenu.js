import { Menu, MenuItem, ListItemIcon, Divider, Avatar } from "@mui/material";

import { Settings } from "@mui/icons-material";

import Logout from "../../../pages/login/components/Logout";

export default function ProfileMenu({ anchorEl, open, handleClose, setAuth }) {
	return (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			PaperProps={menuProps}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
		>
			<MenuItem>
				<Avatar /> Il mio profilo
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Tema chiaro/scuro
			</MenuItem>
			<Logout setAuth={setAuth} />
		</Menu>
	);
}

const menuProps = {
	elevation: 0,
	sx: {
		overflow: "visible",
		filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
		mt: 1.5,
		"& .MuiAvatar-root": {
			width: 32,
			height: 32,
			ml: -0.5,
			mr: 1,
		},
		"&:before": {
			content: '""',
			display: "block",
			position: "absolute",
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			bgcolor: "background.paper",
			transform: "translateY(-50%) rotate(45deg)",
			zIndex: 0,
		},
	},
};
