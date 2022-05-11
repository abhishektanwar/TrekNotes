import { FC } from "react";

interface AddColorComponentType {
  handleNoteDetailUpdate?: (id: string, value: any) => void;
  handleFn?:(x:string)=>void,
  setShowAddColorComponent: (prev: boolean) => void;
}

const AddColorComponent: FC<AddColorComponentType> = ({
  handleNoteDetailUpdate,
  handleFn,
  setShowAddColorComponent,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        border: "1px solid black",
        height: "100px",
        width: "120px",
        zIndex: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        top: "36px",
      }}
    >
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "green",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "green");
          setShowAddColorComponent(false);
          handleFn?.("green")
        }}
      ></div>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "pink",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "pink");
          setShowAddColorComponent(false);
          handleFn?.("pink")
        }}
      />
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "blue",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "blue");
          setShowAddColorComponent(false);
          handleFn?.("blue")

        }}
      />
      <div
        style={{
          border: "1px solid white",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          backgroundColor: "yellow",
          margin: "auto",
        }}
        id="noteBgColor"
        onClick={(e) => {
          handleNoteDetailUpdate?.("noteBgColor", "yellow");
          setShowAddColorComponent(false);
          handleFn?.("yellow")
        }}
      />
    </div>
  );
};

export default AddColorComponent;