import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid";

//Tooltip styles
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip placement="bottom-start"  {...props} classes={{ popper: className }} arrow/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      maxWidth: 100,
      padding:10,
      fontSize:13
    },
  }));

function EditInputCell(props: GridRenderEditCellParams) {
    const { error, alert } = props;
    return (
      <StyledTooltip open={error} title={alert}>
        <GridEditInputCell {...props} />
      </StyledTooltip>
    );
}
export default EditInputCell;