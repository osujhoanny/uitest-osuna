import React from "react";
import GaugeBar from "../components/gaugeBar";

function ListView({
  Showbuttons,
  view,
  data,
  submitVote,
  submitThumbsDown,
  submitThumbsUp,
  dataVotesValidation,
  eyebrowText,
  disableButton,
  buttonText,
  positivevotes,
  negativevotes,
}) {
  return (
    <div className="cardFullWidth">
      <div className="cardFullWidth-background"></div>
      <img src={`assets/img/${data.picture}`} className="containerImage" />
      <div className="cardContent">
        <div className="winningContainer">
          <div
            className="winning"
            style={
              dataVotesValidation()
                ? { backgroundColor: "rgba(60, 187, 180, 0.8)" }
                : { backgroundColor: "#FBBD4A" }
            }
          >
            {dataVotesValidation() ? (
              <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
            ) : (
              <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
            )}
          </div>
        </div>
        <div className="cardContentText">
          <p className="cardTitle">{data.name}</p>
          <p className="cardSubtitle">{data.description}</p>
        </div>
        <div className="voteContainer">
          <p className="eyebrow">{eyebrowText}</p>

          <div className="buttonsContainer">
            {Showbuttons && (
              <>
                <button
                  className="thumbs thumbs-up-button"
                  onClick={() => submitThumbsUp()}
                >
                  <img
                    src="assets/img/thumbs-up.svg"
                    alt="thumbs up"
                    width="24"
                  />
                </button>
                <button
                  className="thumbs thumbs-down-button"
                  onClick={() => submitThumbsDown()}
                >
                  <img
                    src="assets/img/thumbs-down.svg"
                    alt="thumbs down"
                    width="24"
                  />
                </button>
              </>
            )}
            <button
              className="vote-button"
              disabled={disableButton}
              onClick={(e) => submitVote(e)}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <GaugeBar view={view} positive={positivevotes} negative={negativevotes} />
    </div>
  );
}

export default ListView;
