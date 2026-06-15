import { ProseParagraph } from "@/components/ui/typography";
import type { StructuredOverviewBlock } from "@/lib/internship-description";
import { type } from "@/lib/typography";

const bulletListClass = `list-disc space-y-2 pl-5 marker:text-foreground ${type.bodyLarge}`;

export function StructuredOverview({ blocks }: { blocks: StructuredOverviewBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return (
              <h3
                key={index}
                className={`${type.titleLarge} text-foreground text-balance pt-2 first:pt-0`}
              >
                {block.text}
              </h3>
            );
          case "group":
            return (
              <div key={index} className="space-y-2">
                <p className={`${type.titleMedium} text-foreground text-pretty`}>{block.title}</p>
                {block.items.length > 0 ? (
                  <ul className={bulletListClass}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-pretty text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          case "bullets":
            return (
              <ul key={index} className={bulletListClass}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-pretty text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "paragraph":
            return <ProseParagraph key={index}>{block.text}</ProseParagraph>;
          default:
            return null;
        }
      })}
    </div>
  );
}
