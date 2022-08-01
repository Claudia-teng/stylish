/* eslint-disable no-undef */
import axios from "axios";
import styles from "./ProductPage.module.sass";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  let navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(0);
  const [selectedColor, setColor] = useState({});
  const [selectedSize, setSize] = useState("S");
  const [stock, setStock] = useState(0);
  const [searchParams] = useSearchParams();
  const [hasProduct, setHasProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const id = searchParams.get("id");

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@gmail.com");
  const [address, setAddress] = useState("市政府站");
  const [phone, setPhone] = useState("0927389243");
  const [time, setTime] = useState("morning");
  const cardNumber = useRef(null);
  const cardExpirationDate = useRef(null);
  const ccv = useRef(null);

  async function getProductDetail() {
    try {
      setLoading(true);
      const result = await axios.get(`https://claudia-teng.com/api/1.0/products/details?id=${id}`);
      setHasProduct(true);
      setProduct(result.data.data ? result.data.data : null);
      setColor(result.data.data.colors[0]);
      setSize(result.data.data.sizes[0]);
      checkStock(result.data.data.colors[0], result.data.data.sizes[0], result.data.data);
      setLoading(false);
    } catch (err) {
      navigate("/not-found", { replace: true });
      setHasProduct(false);
    }
  }

  function checkStock(color, size, product) {
    // console.log("color, size", color, size);
    let index = product.variants.findIndex((variant) => {
      return variant.color_code === color.code && variant.size === size;
    });
    // console.log("stock", product.variants[index].stock);
    setStock(product.variants[index].stock);
  }

  function handleCounter(event, type) {
    if (type === "plus") {
      setCounter((counter) => counter + 1);
    } else {
      setCounter((counter) => counter - 1);
    }
  }

  function onSelectSize(event, size) {
    setSize(size);
    setCounter(0);
    checkStock(selectedColor, size, product);
  }

  function onSelectColor(event, color) {
    setColor(color);
    setCounter(0);
    checkStock(color, selectedSize, product);
  }

  function paymentSetUp() {
    getTPDirect().then((TPDirect) => {
      TPDirect.setupSDK(12348, "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF", "sandbox");
      TPDirect.card.setup({
        fields: {
          number: {
            // css selector
            element: cardNumber.current,
            placeholder: "**** **** **** ****",
          },
          expirationDate: {
            // DOM object
            element: cardExpirationDate.current,
            placeholder: "MM / YY",
          },
          ccv: {
            element: ccv.current,
            placeholder: "ccv",
          },
        },
        styles: {
          // Style all elements
          input: {
            color: "gray",
          },
          // Styling ccv field
          "input.ccv": {
            // 'font-size': '16px'
          },
          // Styling expiration-date field
          "input.expiration-date": {
            // 'font-size': '16px'
          },
          // Styling card-number field
          "input.card-number": {
            // 'font-size': '16px'
          },
          // style focus state
          ":focus": {
            // 'color': 'black'
          },
          // style valid state
          ".valid": {
            color: "green",
          },
          // style invalid state
          ".invalid": {
            color: "red",
          },
          // Media queries
          // Note that these apply to the iframe, not the root window.
          "@media screen and (max-width: 400px)": {
            input: {
              color: "orange",
            },
          },
        },
      });
    });
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(phone) {
    return /((?=(09))[0-9]{10})$/.test(phone);
  }

  function onSubmit() {
    setError("");
    if (counter === 0) {
      return setError("請購買至少一個商品");
    }

    if (!name || !email || !address || !phone || !time) {
      return setError("請輸入完整收件者資訊");
    }

    if (!isValidEmail(email)) {
      return setError("Email格式不符");
    }

    if (!isValidPhone(phone)) {
      return setError("電話格式不符（09xxxxxxxx）");
    }

    const times = ["morning", "afternoon", "anytime"];
    if (!times.includes(time)) {
      return setError("收件時間格式不符");
    }

    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    if (tappayStatus.canGetPrime === false) {
      return setError("信用卡資料有誤");
    }

    if (!localStorage.getItem("jwt")) {
      setError("請先登入，畫面即將跳轉至登入頁");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
      return;
    }

    TPDirect.card.getPrime(async (result) => {
      if (result?.status !== 0) {
        return setError("交易失敗");
      }
      // console.log(result.card.prime);

      const data = {
        prime: result.card.prime,
        order: {
          shipping: "delivery",
          payment: "credit_card",
          subtotal: product.price * counter,
          freight: 20,
          total: product.price * counter + 20,
          recipient: {
            name: name,
            phone: phone,
            email: email,
            address: address,
            time: time,
          },
          list: [
            {
              id: product.id,
              name: product.title,
              price: product.price,
              color: {
                code: selectedColor.code,
                name: selectedColor.name,
              },
              size: selectedSize,
              qty: counter,
            },
          ],
        },
      };
      // console.log("data", data);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };

      axios
        .post("https://claudia-teng.com/api/1.0/order/checkout", data, {
          headers: headers,
        })
        .then((response) => {
          setSuccess("購買成功！");
          navigate("/thankyou", { replace: true });
        })
        .catch((error) => {
          setError("購買失敗！");
        });
    });
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    if (hasProduct) paymentSetUp();
  }, [hasProduct]);

  return (
    <>
      <div className={styles.container}>
        {!hasProduct && !loading && <p className={styles.notFound}>找不到商品</p>}
        {hasProduct && (
          <>
            <div className={styles.contents}>
              <img alt="main_image" src={product.main_image} />
              <div>
                <h1>{product.title}</h1>
                <h6>{product.id}</h6>
                <h2>TWD.{product.price}</h2>
                <div className={styles.color}>
                  <span>顏色</span>
                  <div className={styles.colorBoxes}>
                    {product?.colors?.map((color, i) => {
                      return (
                        <div
                          key={i}
                          onClick={(event) => onSelectColor(event, color)}
                          className={color.code === selectedColor.code ? styles.colorActive : ""}
                          style={{ backgroundColor: `#${color.code}` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.size}>
                  <span>尺寸</span>
                  <div className={styles.sizesBoxes}>
                    {product?.sizes?.map((size, i) => {
                      return (
                        <div
                          key={i}
                          className={size === selectedSize ? styles.sizeActive : ""}
                          onClick={(event) => onSelectSize(event, size)}
                        >
                          {size}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.count}>
                  <span>數量</span>
                  <div className={`${styles.counter}`}>
                    <button onClick={(event) => handleCounter(event, "minus")} disabled={counter === 0}>
                      -
                    </button>
                    <p>{counter}</p>
                    <button onClick={(event) => handleCounter(event, "plus")} disabled={counter === stock}>
                      +
                    </button>
                  </div>
                </div>
                <button className={styles.cartBtn} disabled={counter === 0}>
                  加入購物車
                </button>
                <h3>{product.note}</h3>
                <h3 className={styles.texture}>{product.texture}</h3>
                <h3 className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }}></h3>
                <h3>清洗：{product.wash}</h3>
                <h3>產地：{product.place}</h3>
              </div>
            </div>
            <div className={styles.checkoutTitle}>結帳</div>
            <div className={styles.checkout}>
              <form>
                <label>收件者姓名</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <label>收件者Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>收件者地址</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
                <label>收件者電話</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label>收件時間（morning / afternoon / anytime）</label>
                <input value={time} onChange={(e) => setTime(e.target.value)} />
                <div id="product ID"></div>
                <label>Card Number</label>
                <div id="cardview-container"></div>
                <div className={styles.tpfield} ref={cardNumber}></div>
                <label>Expiration Date</label>
                <div className={styles.tpfield} ref={cardExpirationDate}></div>
                <label>CCV</label>
                <div className={styles.tpfield} ref={ccv}></div>
                <button className={styles.payBtn} type="button" id="submit" onClick={onSubmit}>
                  送出
                </button>
                <p className={styles.error}>{error}</p>
                <p className={styles.success}>{success}</p>
              </form>
            </div>
            <div className={styles.moreDetail}>更多產品資訊</div>
            <p>{product.story}</p>
            <img alt="other_image1" src={product?.images?.length ? product.images[0] : null} />
            <img alt="other_image2" src={product?.images?.length ? product.images[1] : null} />
          </>
        )}
      </div>
    </>
  );
}

export default ProductPage;

export function getTPDirect() {
  return new Promise((resolve, reject) => {
    if (typeof window.TPDirect !== "undefined") {
      return resolve(window.TPDirect);
    } else {
      const script = window.document.createElement("script");
      script.src = "https://js.tappaysdk.com/tpdirect/v5.8.0";
      script.async = true;
      script.onload = () => {
        if (typeof window.TPDirect !== "undefined") {
          resolve(window.TPDirect);
        } else {
          reject(new Error("failed to load TapPay sdk"));
        }
      };
      script.onerror = reject;
      window.document.body.appendChild(script);
    }
  });
}
