const LoadingSkeleton = () => {
  return (new Array(8)
            .fill(0)
            .map((_, index) => (
              <div className="p-2 skeleton-explore__wrapper" key={index}>
                <div className="nft__item">
                  <div
                    className="skeleton newitems__skeleton__author-bubble"
                    style={{ margin: "4px", padding: "8px" }}
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
            )))
}

export default LoadingSkeleton;