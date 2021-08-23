import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Header() {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container>
          <Grid
            item
            xs={6}
            sm={6}
            md={8}
            lg={9}
            xl={9}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h5"
              component="strong"
              color="inherit"
              style={{ fontFamily: "inherit" }}
            >
              Enterprise Store
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            style={{ display: "flex", alignItems: "center",justifyContent:'flex-end' }}
          >
            <Typography variant="h6">David Warner</Typography>
            <Avatar style={{ marginLeft: "6px" }}>DW</Avatar>
            <IconButton style={{ marginLeft: "15px" }}>
              <ShoppingCartIcon style={{ color: "white" }} fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
