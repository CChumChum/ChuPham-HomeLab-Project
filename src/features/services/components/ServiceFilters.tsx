import type { ServiceCategory } from "../service.types";

export type ServiceCategoryFilter = "all" | ServiceCategory;

interface ServiceFiltersProps {
  searchQuery: string;
  selectedCategory: ServiceCategoryFilter;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: ServiceCategoryFilter) => void;
}

const categories: {
  label: string;
  value: ServiceCategoryFilter;
}[] = [
  { label: "All", value: "all" },
  { label: "Media", value: "media" },
  { label: "Photos", value: "photos" },
  { label: "Requests", value: "requests" },
  { label: "Admin", value: "admin" },
];

function ServiceFilters({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: ServiceFiltersProps) {
  return (
    <div className="mb-10 space-y-4">
      <div>
        <label htmlFor="service-search" className="sr-only">
          Search services
        </label>

        <input
          id="service-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search services..."
          className="
            w-full
            rounded-xl
            border border-zinc-800
            bg-zinc-900
            px-4 py-3
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-zinc-600
            focus:border-zinc-600
          "
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.value;

          return (
            <button
              key={category.value}
              type="button"
              onClick={() => onCategoryChange(category.value)}
              className={`
                rounded-full
                px-4 py-2
                text-sm
                font-medium
                transition
                ${
                  isSelected
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceFilters;
