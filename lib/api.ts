import axios from "axios";
import type { NewNote, Note } from "../types/note";


interface fetchNotesResponse {
    notes: Note[];
    totalPages: number;
}
interface Params {
    page: number;
    perPage: number;
    search: string;
}


const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;


export const fetchNotes = async (page: number, search: string): Promise<fetchNotesResponse> => {

    const params: Params = {
        page,
        perPage: 10,
        search,
    };

    const response = await axios.get<fetchNotesResponse>("/notes", {
        params,
    })

    console.log(response.data);

    return response.data;

}

export const createNote = async (newNote: NewNote) => {
    const res = await axios.post<Note>("/notes", newNote)
    return res.data
}

export const deleteNote = async (noteId: string) => {
    const res = await axios.delete(`/notes/${noteId}`);
    return res.data
}

export const fetchNoteById = async (noteId: string) => {
    const res = await axios.get<Note>(`/notes/${noteId}`)
    return res.data
}