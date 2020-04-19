import React from "react";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slider from "@material-ui/core/Slider";

const EvaluatorQuestionResponses = ({ savedAnswers }) => {
  const sliderValues = [
    {
      value: 0,
      label: "Poor",
    },
    {
      value: 1,
      label: "Below Average",
    },
    {
      value: 2,
      label: "Average",
    },
    {
      value: 3,
      label: "Above Average",
    },
    {
      value: 4,
      label: "Excellent",
    },
  ];

  return (
    <div>
      <Typography variant="h6">Evaluation Questions:</Typography>
      <List>
        {savedAnswers.map((savedAnswer) => (
          <ListItem divider key={`answer-${savedAnswer.id}`}>
            <ListItemText>
              <Typography variant="body1">{savedAnswer.question.text}</Typography>
              <Slider value={savedAnswer.answer} marks={sliderValues} step={1} min={0} max={4}></Slider>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EvaluatorQuestionResponses;
