import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown.jsx";
import LoadingSkeleton from "../UI/LoadingSkeleton.jsx"

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState(8);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
        );
        setExploreItems(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filterValue]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleData((prev) => prev + 4);
  };

  const handleFilterValue = (e) => {
    setFilterValue(e.target.value);
  }

  const slicedData = exploreItems.slice(0, visibleData);

  return (
    <>
      <div>
        <select value={filterValue} onChange={handleFilterValue} id="filter-items">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? <LoadingSkeleton />
        : slicedData.map((data, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${data.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={data.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {data.expiryDate && <Countdown expiryDate={data.expiryDate} />}

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
      <div className="col-md-12 text-center">
        {visibleData < exploreItems.length && (
          <Link
            data-aos="fade-in" data-aos-delay="100"
            onClick={handleLoadMore}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
