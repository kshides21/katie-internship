import React from "react";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../UI/LoadingSkeleton";

const AuthorItems = ({ authorItems = [], authorImage, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            authorItems.map((data, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <a href="#">
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </a>
                  </div>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
