import React, { useState, useEffect } from "react";
import ListView from "../components/listView";
import GridView from "../components/gridView";
import moment from "moment";
import { useMediaQuery } from "react-responsive";

function Card({ data, view }) {
  const isMobile = useMediaQuery({ query: "(max-width: 670px)" });
  const eyebrow = `${moment(data.lastUpdated).fromNow()} in ${data.category}`;
  const [disableButton, setDisableButton] = useState(true);
  const [buttonText, setButtonText] = useState("Vote Now");
  const [eyebrowText, setEyebrowText] = useState(eyebrow);
  const [positivevotes, setPositiveVotes] = useState(null);
  const [negativevotes, setNegativevotes] = useState(null);
  const [Showbuttons, setshowbuttons] = useState(true);
  const [vote, setVote] = useState(null);

  useEffect(() => {
    setPositiveVotes(getValuesVotes("positive"));
    setNegativevotes(getValuesVotes("negative"));
  }, [vote]);

  const getValuesVotes = (value) => {
    let votes = localStorage.getItem(data.name);

    if (value === "positive") {
      if (!votes) {
        return data.votes.positive;
      }
      if (votes[0] === "{") {
        votes = JSON.parse(votes);
      }
      return votes.positive;
    } else {
      if (!votes) {
        return data.votes.negative;
      }
      if (votes[0] === "{") {
        votes = JSON.parse(votes);
      }
      return votes.negative;
    }
  };

  const dataVotesValidation = () => {
    if (positivevotes > negativevotes) {
      return true;
    }
    return false;
  };

  const submitThumbsUp = () => {
    setVote("positive");
    setDisableButton(false);
  };

  const submitThumbsDown = () => {
    setVote("negative");
    setDisableButton(false);
  };

  const submitVote = (e) => {
    if (e.target.innerText !== "Vote Again") {
      setButtonText("Vote Again");
      setEyebrowText("Thank you for your vote!");
      setshowbuttons(false);

      var votesObject = {
        positive: positivevotes,
        negative: negativevotes,
      };

      if (vote === "positive") {
        votesObject.positive = positivevotes + 1;
      } else {
        votesObject.negative = negativevotes + 1;
      }

      localStorage.setItem(data.name, JSON.stringify(votesObject));
      setPositiveVotes(getValuesVotes("positive"));
      setNegativevotes(getValuesVotes("negative"));
    } else {
      setButtonText("Vote Now");
      setEyebrowText(eyebrow);
      setDisableButton(true);
      setshowbuttons(true);
    }
  };

  return !isMobile && view === "List" ? (
    <ListView
      view={view}
      data={data}
      submitVote={submitVote}
      submitThumbsDown={submitThumbsDown}
      submitThumbsUp={submitThumbsUp}
      dataVotesValidation={dataVotesValidation}
      eyebrowText={eyebrowText}
      disableButton={disableButton}
      buttonText={buttonText}
      positivevotes={positivevotes}
      negativevotes={negativevotes}
      Showbuttons={Showbuttons}
    />
  ) : (
    <GridView
      view={view}
      data={data}
      submitVote={submitVote}
      submitThumbsDown={submitThumbsDown}
      submitThumbsUp={submitThumbsUp}
      dataVotesValidation={dataVotesValidation}
      eyebrowText={eyebrowText}
      disableButton={disableButton}
      buttonText={buttonText}
      positivevotes={positivevotes}
      negativevotes={negativevotes}
      Showbuttons={Showbuttons}
    />
  );
}

export default Card;
