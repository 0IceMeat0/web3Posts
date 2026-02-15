"use client";

import { useState } from "react";
import { SearchIcon } from "../icons/icons";
import s from "./search-input.module.scss";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={s.wrapper}>
      <span className={s.icon}>
        <SearchIcon active={isFocused} size={18} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={s.input}
      />
      {value && (
        <button onClick={() => onChange("")} className={s.clear}>
          ESC
        </button>
      )}
    </div>
  );
}
