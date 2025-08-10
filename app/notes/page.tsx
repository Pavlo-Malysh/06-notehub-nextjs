

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';


const Notes = async () => {
    const currentPage = 1;
    const searchQuery = '';

    const data = await fetchNotes(currentPage, searchQuery)


    return (
        <>
            <NotesClient initialData={data} />
        </>
    )
}

export default Notes

