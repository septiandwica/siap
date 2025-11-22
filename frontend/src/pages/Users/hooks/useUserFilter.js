import { useState } from "react";

export default function useUserFilter() {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    return { filterStatus, searchQuery, setFilterStatus, setSearchQuery };
}
