import { useState, useMemo, useEffect } from "react";

export default function useUserPagination(data, itemsPerPage) {
    const [page, setPage] = useState(1);

    // Hitung total halaman
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

    // Reset page jika page melebihi total halaman
    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [totalPages]);

    // Data yang ditampilkan
    const paginated = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, page, itemsPerPage]);

    return { page, setPage, totalPages, paginated };
}
