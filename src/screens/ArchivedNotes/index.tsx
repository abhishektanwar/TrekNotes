import { FC } from 'react'
import Note from '../../components/Note';
import { useNotes } from '../../contexts/NotesContext';

const ArchivedNotes:FC = () => {
  const {notesData:{archivedNotes}} = useNotes()
  return (
    <div>
      <div className="page-heading">

        <h2>Archived notes</h2>
      </div>
      {archivedNotes.length === 0 ? (
        <div className="flex-row flex-justify-content-center margin-top-20">
          <h3 style={{ textAlign: "center" }}>No archived notes found.</h3>
        </div>
      ) : (
        <div className="notes-listing-container" style={{width:'100%'}}>
          {archivedNotes.map((archivedNote: any) => {
            return (
              <Note
                noteTitle={archivedNote.noteTitle}
                text={archivedNote.text}
                id={archivedNote._id}
                priority={archivedNote.priority}
                bgColor={archivedNote.noteBgColor}
                labels={archivedNote.labels}
                date={archivedNote.date}
                isArchivedNote={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ArchivedNotes
