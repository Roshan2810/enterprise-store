import Header from "../components/common/Header";
import Carousel from "../components/common/Carousel";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import apiendpoints from "../../config/apiendpoints";
import HOSTNAME from "../../config/apigw";

function App() {
  console.log("host name", HOSTNAME);
  const products = [
    { name: "Laptops", url: "" },
    { name: "Tablets", url: "" },
    { name: "Cameras", url: "" },
  ];
  const history = useHistory();
  const [images, setImages] = useState([]);

  const handleCarouselClick = (productId) => {
    history.push(`${process.env.PUBLIC_URL}/product-detail/${productId}`);
  };

  const getCampaignProducts = () => {
    fetch(`${HOSTNAME}${apiendpoints.campaignProducts}`, {
      method: "get",
    }).then(async (res) => {
      let rsp_data = await res.json();
      if (res.ok) {
        setImages(rsp_data.data);
      } else {
        console.log("No data found");
      }
    });
  };

  useEffect(() => {
    getCampaignProducts();
    sessionStorage.setItem("userId", uuidv4());
    sessionStorage.setItem("cartId", "");
  }, []);

  return (
    <>
      <Header />
      <div style={{ margin: "2% 15%" }}>
        <div
          style={{
            height: "450px",
            border: "1px solid #00000029",
            cursor: "pointer",
          }}
        >
          <Carousel images={images} handleCarouselClick={handleCarouselClick} />
        </div>
        <Grid
          container
          spacing={2}
          style={{ justifyContent: "center", marginTop: "2%" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ textAlign: "center", marginBottom: "1%" }}
          >
            <Typography
              variant="h5"
              color="primary"
              style={{ fontFamily: "inherit" }}
            >
              Trending Products
            </Typography>
          </Grid>
          {products.map((product, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              style={{
                border: "1px solid #00000029",
                height: "200px",
                margin: "0 1%",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${product.url})`,
              }}
            >
              {product.name}
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default App;
