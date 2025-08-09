

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


const Notes = async () => {
    const currentPage = 1;
    const searchQuery = '';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", currentPage, searchQuery],
        queryFn: () => fetchNotes(currentPage, searchQuery)

    })


    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient />
            </HydrationBoundary>

        </>
    )
}

export default Notes

