import { Grid, Button, Typography } from "@material-ui/core";
import Header from "../components/common/Header";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import "../../style/ProductDetails.css";
import { useDispatch } from "react-redux";
import addToCart from "../../redux/actions/addToCart";
import { useState } from "react";
import { useEffect } from "react";
import Snackbar from "../components/common/Snackbar";

const ProductDetail = (props) => {
  const [src, setSrc] = useState("");
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("success");
  const [msg, setMsg] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (productId) => {
    fetch("http://localhost:3001/product/addToCart", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: params.productId,
        userId: localStorage.getItem("userId"),
      }),
    }).then(async (res) => {
      let rsp_data = await res.json();
      setOpen(true);
      setMsg(rsp_data.message);
      getProductDetails();
      if (res.ok) {
        dispatch(addToCart(productId));
        setVariant("success");
        localStorage.setItem("cartId", rsp_data.data.cartId);
      } else {
        setVariant("error");
      }
    });
  };

  const getProductDetails = () => {
    fetch(
      `http://localhost:3001/product/getProductDetails/${params.productId}`,
      {
        method: "get",
      }
    ).then(async (res) => {
      let rsp_data = await res.json();
      if (res.ok) {
        let src = rsp_data.data.filter(
          (data) => data.productId === params.productId
        );
        setSrc(...src);
      }
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Header />
      {src && (
        <Grid container className="container">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <img
              src={src.url}
              alt={src.desc}
              width="500rem"
              className="prodDetailImg"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Typography variant="h5">{src.desc}</Typography>
            <ReactStars
              count={5}
              size={24}
              value={src.rating}
              color2={"#ffd700"}
            />
            <Typography variant="body1">
              M.R.P.:{" "}
              <span style={{ textDecoration: "line-through" }}>{src.mrp}</span>
            </Typography>
            <Typography variant="body1">
              Price:{" "}
              <span style={{ color: "red", fontSize: "18px" }}>
                {src.discountedPrice}
              </span>
            </Typography>
            <Typography
              variant="h6"
              style={{ color: src.quantity ? "green" : "red" }}
            >
              {src.quantity ? "In-stock" : "Out of stock"}
            </Typography>
            <br />
            <Typography variant="body2">Description:</Typography>
            {src.productDesc.map((desc, i) => {
              return (
                <Grid container key={i}>
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Typography variant="body1">
                      <strong>{desc.name}</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{desc.value}</Typography>
                  </Grid>
                </Grid>
              );
            })}
            <br />
            <Typography variant="body1">
              <strong>About item</strong>
            </Typography>
            <ul>
              {src.aboutItem.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={src.quantity ? false : true}
              onClick={() => handleAddToCart(params.productId)}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={open}
        variant={variant}
        msg={msg}
        handleClose={handleClose}
      />
    </>
  );
};

export default ProductDetail;
