import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/NewItems.css";
import Slider from "react-slick";
import Countdown from "../UI/Countdown.jsx";


const NewItems = () => {
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      <i className="fa fa-chevron-right"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      <i className="fa fa-chevron-left"></i>
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1156,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div data-aos="fade-up" data-aos-delay="250" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-up" data-aos-delay="100" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="list__container"> 
            {loading ? (
            <div className="newitems__skeleton-slider">
              <div className="prev"></div>
              <Slider {...settings}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className="p-2" key={index}>
                    <div className="nft__item">
                      <div
                      className="skeleton newitems__skeleton__author-bubble"
                      style={{margin: "4px", padding: "8px"}}
                      ></div>
                      <div className="skeleton newitems__skeleton__background--img"></div>
                      <div className="newitems__skeleton__info">
                        <div
                          className="skeleton skeleton--text"
                          style={{ width: "60%", marginTop: "8px" }}
                        ></div>
                        <div
                          className="skeleton skeleton--text"
                          style={{ width: "40%", marginTop: "4px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
            <div className="next"></div>
            </div>
          ) : (
            <Slider {...settings}>
              {newItems.map((data, index) => (
                <div className="p-2" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${data.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {data.expiryDate && (
                      <Countdown expiryDate={data.expiryDate} />
                    )}
                    <div className="nft__item_wrap">

                      <Link to={`/item-details/${data.nftId}`}>
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${data.nftId}`}>
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
