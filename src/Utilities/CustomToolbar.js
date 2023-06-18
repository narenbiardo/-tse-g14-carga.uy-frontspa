import { GridToolbarContainer } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
	"& .MuiInputBase-root": {
		height: "32px",
	},
});

const SearchContainer = styled("div")({
	display: "flex",
	alignItems: "center",
});

export const CustomToolbar = props => {
	return (
		<div>
			<GridToolbarContainer>
				<SearchContainer>
					<IconButton disabled /*Disabled to prevent mouse hover 'hand'*/>
						<SearchIcon />
					</IconButton>
					<CustomTextField
						fullWidth
						placeholder={props.placeholder}
						onChange={event => {
							props.setQuickFilter(event.target.value);
						}}
					/>
				</SearchContainer>
			</GridToolbarContainer>
		</div>
	);
};
