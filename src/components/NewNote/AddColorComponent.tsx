import { FC } from "react";

interface AddColorComponentType {
  handleNoteDetailUpdate?: (id: string, value: any) => void;
  handleFn?: (x: string) => void;
  setShowAddColorComponent: (prev: boolean) => void;
}

const AddColorComponent: FC<AddColorComponentType> = ({
  handleNoteDetailUpdate,
  handleFn,
  setShowAddColorComponent,
}) => {
  return (
    <div className="add-color-container">
      <div
        className="color"
        style={{
          backgroundColor: "#38975d",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "#38975d");
          setShowAddColorComponent(false);
          handleFn?.("#38975d");
        }}
      ></div>
      <div
        className="color"
        style={{
          backgroundColor: "#d366c4",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "#d366c4");
          setShowAddColorComponent(false);
          handleFn?.("#d366c4");
        }}
      />
      <div
        className="color"
        style={{
          backgroundColor: "#66d3cd",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "#66d3cd");
          setShowAddColorComponent(false);
          handleFn?.("#66d3cd");
        }}
      />
      <div
        className="color"
        style={{
          backgroundColor: "#dad760",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "#dad760");
          setShowAddColorComponent(false);
          handleFn?.("#dad760");
        }}
      />
    </div>
  );
};

export default AddColorComponent;
