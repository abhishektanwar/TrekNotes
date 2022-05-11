import { FC, useState } from "react";
import Button from "../Buttons/Button";
import InputField from "../InputField";

interface AddLabelComponentType {
  handleNoteDetailUpdate: (id: string, value: any) => void;
  labels: string[];
}

const AddLabelComponent: FC<AddLabelComponentType> = ({
  handleNoteDetailUpdate,
  labels,
}) => {
  const [newNoteLabel, setNewNoteLabel] = useState("");
  // const [labels,setLabelsLocal] = useState<string[]>([]);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        border: "1px solid black",
        left: "20px",
        padding: "10px",
      }}
    >
      <InputField
        type="text"
        id="labels"
        value={newNoteLabel}
        onChange={(e) => setNewNoteLabel(e.target.value)}
        placeholder="Label..."
        required
        validation={true}
        name="new-note-label"
        customClass="add-label-input-field"
      />
      <Button
        buttonText="Add"
        onClick={() => {
          setNewNoteLabel('')
          handleNoteDetailUpdate("labels", [...labels, newNoteLabel]);
        }}
        buttonStyle={`btn-outline-primary add-label-button ${
          newNoteLabel === "" ? "btn-disabled" : ""
        }`}
      />
    </div>
  );
};

export default AddLabelComponent;
