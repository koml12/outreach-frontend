import React, { useState } from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import QuestionItem from "./QuestionItem";
import EditingQuestionItem from "./EditingQuestionItem";

const QuestionList = ({ questions, type, onSave, onDelete, addingQuestion, onAddCancel }) => {
  const [editingQuestions, setEditingQuestions] = useState([]);

  const onEdit = (question) => {
    setEditingQuestions([...editingQuestions, question]);
  };

  const onCancel = (question) => {
    const foundIndex = editingQuestions.findIndex((q) => q === question);
    setEditingQuestions([...editingQuestions.slice(0, foundIndex), ...editingQuestions.slice(foundIndex + 1)]);
    if (!question.id) {
      onAddCancel();
    }
  };

  const saveQuestion = (question) => {
    const foundIndex = editingQuestions.findIndex((q) => q === question);
    setEditingQuestions([...editingQuestions.slice(0, foundIndex), ...editingQuestions.slice(foundIndex + 1)]);

    onSave(question);
  };

  return (
    <List>
      {questions &&
        questions.map((question) => (
          <div>
            <Divider />
            {editingQuestions.includes(question) ? (
              <EditingQuestionItem
                question={question}
                type={type}
                onSave={saveQuestion}
                onCancel={() => onCancel(question)}
              />
            ) : (
              <QuestionItem
                question={question}
                type={type}
                onEditClicked={() => onEdit(question)}
                onDeleteClicked={() => onDelete(question)}
              />
            )}
          </div>
        ))}
      {addingQuestion && (
        <div>
          <Divider />
          <EditingQuestionItem type={type} onSave={saveQuestion} onCancel={onCancel} />
        </div>
      )}
      <Divider style={{ marginTop: "5px" }} />
    </List>
  );
};

export default QuestionList;
