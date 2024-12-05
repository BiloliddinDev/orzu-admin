import { useState } from "react";
import { Combobox } from "@headlessui/react";

interface TagSelectProps {
  initialTags?: string[]; // Boshlang'ich tanlangan taglar
  initialOptions?: string[]; // Boshlang'ich mavjud options
  onChange?: (tags: string[]) => void; // Taglar o'zgarganda callback
}

const TagSelect: React.FC<TagSelectProps> = ({
  initialTags = [],
  initialOptions = [],
  onChange,
}) => {
  const [query, setQuery] = useState<string>(""); // Qidiruv qiymati
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags); // Tanlangan taglar
  const [options, setOptions] = useState<string[]>(initialOptions); // Mavjud options

  const addTag = (tag: string): void => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      if (onChange) onChange(newTags); // Callbackni chaqirish
    }
    if (!options.includes(tag)) {
      setOptions((prev) => [...prev, tag]); // Optionsga yangi qiymat qo'shish
    }
    setQuery(""); // Qidiruvni tozalash
  };

  const removeTag = (tag: string): void => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    if (onChange) onChange(newTags); // Callbackni chaqirish
  };

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          // option.toLowerCase().includes(query.toLowerCase())
          option.includes(query.toLowerCase())
        );

  return (
    <div className="w-full ">
      {/* Combobox qismi */}
      <Combobox value={query} onChange={addTag}>
        <Combobox.Input
          placeholder="Select or add tags"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main-200"
        />
        <Combobox.Options className="border mt-1 rounded-md shadow-lg bg-white">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option}
              value={option}
              className="cursor-pointer p-2 hover:bg-main-200 hover:text-white"
            >
              {option}
            </Combobox.Option>
          ))}
          {query && !options.includes(query) && (
            <Combobox.Option
              value={query}
              className="cursor-pointer p-2 text-main-200 hover:bg-main-200 hover:text-white"
            >
              Add "{query}"
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox>

      {/* Tanlangan taglar qismi */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center bg-main-200 text-white px-2 py-1 rounded"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-sm text-white hover:text-gray-200"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
