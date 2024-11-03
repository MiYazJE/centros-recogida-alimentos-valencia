import { Chip } from "@/components/ui/chip";
import { TAGS } from "@/enums";

export function TagsFilter({ selectedTags, setSelectedTags }) {
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {TAGS.map((tag) => (
        <Chip
          key={tag.value}
          label={tag.label}
          selected={selectedTags.includes(tag.value)}
          onPressedChange={() => toggleTag(tag.value)}
        />
      ))}
    </div>
  );
}
