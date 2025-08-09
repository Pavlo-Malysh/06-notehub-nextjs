'use client'
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { Toaster, toast } from 'react-hot-toast';



const NotesClient = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ['notes', currentPage, searchQuery],
        queryFn: () => fetchNotes(currentPage, searchQuery),
        placeholderData: keepPreviousData,
        refetchOnMount: false,

    })
    const totalPages = data?.totalPages ?? 0;

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };


    const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => {
        setSearchQuery(newSearchQuery);
        setCurrentPage(1);
    }, 300);


    useEffect(() => {
        if (isSuccess && (data.notes.length === 0)) {
            toast.error("No notes found for your request.");
        }
    }, [isSuccess, data])



    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
                    {isSuccess && totalPages > 1 && <Pagination page={currentPage} onChange={setCurrentPage} total_page={totalPages} />}
                    <button className={css.button} onClick={openModal}>Create note +</button>
                    {isModalOpen && <Modal onClose={closeModal}>
                        <NoteForm onClose={closeModal} />
                    </Modal>}
                </header>
                <Toaster />
                {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

            </div>

        </>
    )
}

export default NotesClient