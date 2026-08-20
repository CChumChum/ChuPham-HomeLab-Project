import type { ServiceCategory } from "../service.types";

export type ServiceCategoryFilterValue = "all" | ServiceCategory;

interface ServiceCategoryFilterProps {
  selectedCategory: ServiceCategoryFilterValue;
  onCategoryChange: (category: ServiceCategoryFilterValue) => void;
  showAdmin: boolean;
}

const baseCategories: {
  label: string;
  value: ServiceCategoryFilterValue;
}[] = [
  { label: "All", value: "all" },
  { label: "Media", value: "media" },
  { label: "Photos", value: "photos" },
  { label: "Requests", value: "requests" },
];

function ServiceCategoryFilter({
  selectedCategory,
  onCategoryChange,
  showAdmin,
}: ServiceCategoryFilterProps) {
  const categories = showAdmin
    ? [
        ...baseCategories,
        {
          label: "Admin",
          value: "admin" as ServiceCategoryFilterValue,
        },
      ]
    : baseCategories;

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => onCategoryChange(category.value)}
            className={`
              rounded-full
              border
              px-4 py-2
              text-sm
              font-medium
              transition
              ${
                isSelected
                  ? "border-white bg-white text-zinc-950"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              }
            `}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export default ServiceCategoryFilter;
