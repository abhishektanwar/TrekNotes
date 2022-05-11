import { FC } from "react";
import { useNotesFilter } from "../../contexts/FilterContext";
import { useNotes } from "../../contexts/NotesContext";
import { dispatchActionTypes } from "../../reducers/dispatchActionTypes";
import Button from "../Buttons/Button";
import "./filter.css";

const Filter: FC = () => {
  const { showFilter, filterState, filterDispatch } = useNotesFilter();
  const {
    notesData: { allLabels },
  } = useNotes();
  const {
    SET_FILTER_NOTES_PRIORITY,
    SET_FILTER_NOTES_DATE,
    SET_FILTER_NOTES_LABEL,
    RESET_NOTES_FILTER,
  } = dispatchActionTypes;
  return (
    <>
      <h3>Priority:{filterState.priority}</h3>
      <h3>Date:{filterState.date}</h3>
      <h3>Label:{filterState.label}</h3>

      {true ? (
        <div className="">
          <div className="filter-main-container flex-row flex-justify-content-space-between">
            <div className="flex-align-item-center filter flex-row">
              <label
                htmlFor="priority"
                className={"typo-xs"}
                style={{ paddingRight: "10px" }}
              >
                Priority
              </label>
              <select
                onChange={(e) =>
                  filterDispatch({
                    type: SET_FILTER_NOTES_PRIORITY,
                    payload: e.target.value,
                  })
                }
                id="priority"
                name="priority"
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex-align-item-center filter flex-row">
              <label
                htmlFor="date"
                className={"typo-xs"}
                style={{ paddingRight: "10px" }}
              >
                Date
              </label>
              <select
                onChange={(e) =>
                  filterDispatch({
                    type: SET_FILTER_NOTES_DATE,
                    payload: e.target.value,
                  })
                }
                id="date"
                name="date"
              >
                {/* <option value="all">All</option> */}
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            {/* label filter */}
            <div className="flex-align-item-center filter flex-row">
              <label
                htmlFor="priority"
                className={"typo-xs"}
                style={{ paddingRight: "10px" }}
              >
                Label
              </label>
              <select
                onChange={(e) =>
                  filterDispatch({
                    type: SET_FILTER_NOTES_LABEL,
                    payload: e.target.value,
                  })
                }
                id="priority"
                name="priority"
              >
                {allLabels.map((label: string) => {
                  return <option value={label}>{label}</option>;
                })}
              </select>
            </div>
            <Button
              buttonText="Reset Filter"
              onClick={() => filterDispatch({ type: RESET_NOTES_FILTER })}
              buttonStyle={"secondary-button"}
            ></Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Filter;
