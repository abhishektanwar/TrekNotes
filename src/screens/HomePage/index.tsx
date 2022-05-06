import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const HomePage: FC = () => {
  const toolbarModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
    ],
  };

  return (
    <div>
      <div className="new-note-container">
        <div className="text-editor">
          <ReactQuill
            modules={toolbarModules}
            value={"noteText"}
            placeholder="Take a note..."
            // onChange={}
            // className={darkThemeEditor}
            // style={{
            //   backgroundColor: "blue",
            // }}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
