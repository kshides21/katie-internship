import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/components/TopSellers.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp skeleton top-sellers__skeleton__author-bubble"></div>
                      <div className="author_list_info">
                        <div
                        className="skeleton skeleton--text"
                        style={{ width: "60%", height: "14px"}}
                        ></div>
                        <div
                          className="skeleton skeleton--text"
                          style={{ width: "20%", height: "14px" }}
                        ></div>
                      </div>
                    </li>
                  ))
                : sellers.map((data, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${data.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={data.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${data.authorId}`}>
                          {data.authorName}
                        </Link>
                        <span>{data.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
