"use client";

import React, { useCallback, useState } from "react";
import { Search } from "lucide-react";
import qs from "query-string";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  type: any;
}

const SearchBar = ({ type }: SearchBarProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedUpdateUrl = useDebounceCallback((searchValue: string) => {
    const url = qs.stringifyUrl(
      {
        url: `${type === 'files' ? '/dashboard/':'/settings/'}`,
        query: { search: searchValue },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);
      debouncedUpdateUrl(inputValue);
    },
    [debouncedUpdateUrl]
  );

  return (
    <div className="relative mx-2">
      {/* Search Icon */}
      <Search
        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground h-4 w-4"
        aria-hidden="true"
      />
      {/* Search Input */}
      <Input
        className="w-full border pl-9 h-9"
        placeholder="Search"
        value={value}
        onChange={handleInputChange}
        aria-label="Search dashboard"
      />
    </div>
  );
};

export default SearchBar;
