import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Badge,
  Popover,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import clearCart from "../../../redux/actions/clearCart";
import Snackbar from "../common/Snackbar";

function Header() {
  const cartCount = useSelector((state) => state.getCartCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackBar, setOpen] = useState(false);
  const [variant, setVariant] = useState("success");
  const [msg, setMsg] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckout = () => {
    fetch("http://localhost:3001/product/productCheckedOut", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId: localStorage.getItem("cartId"),
        userId: localStorage.getItem("userId"),
      }),
    }).then(async (res) => {
      let rsp_data = await res.json();
      setOpen(true);
      setMsg(rsp_data.message);
      dispatch(clearCart());
      if (res.ok) {
        setVariant("success");
      }else{
        setVariant("error");
      }
    });
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };
  return (
    <>
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="h6">David Warner</Typography>
              <Avatar style={{ marginLeft: "6px" }}>DW</Avatar>
              <IconButton
                style={{ marginLeft: "15px" }}
                onClick={handleCartClick}
              >
                <Badge badgeContent={cartCount.count} color="secondary">
                  <ShoppingCartIcon
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </Badge>
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Grid container spacing={1} style={{ margin: "1% 0" }}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </Grid>
                </Grid>
              </Popover>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackBar}
        variant={variant}
        msg={msg}
        handleClose={handleSnackBarClose}
      />
    </>
  );
}

export default Header;
