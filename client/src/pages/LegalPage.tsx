import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import type { LegalDocument, LegalRun } from "@/content/types";

function Runs({ text }: { text: string | LegalRun[] }) {
  if (typeof text === "string") return text;
  return text.map((run, index) =>
    // Runs never reorder, so their position is a stable key.
    // biome-ignore lint/suspicious/noArrayIndexKey: static legal copy
    run.strong ? <strong key={index}>{run.text}</strong> : <span key={index}>{run.text}</span>,
  );
}

export interface LegalPageProps {
  document: LegalDocument;
}

export function LegalPage({ document }: LegalPageProps) {
  return (
    <div className="container-page pt-14 md:pt-20">
      <PageMeta title={document.title} />
      <PageHeader
        kicker={<p className="type-eyebrow">Last updated {document.updated}</p>}
        title={document.title}
      />
      <div className="mt-10 flex max-w-[68ch] flex-col gap-4 text-[0.9375rem] leading-relaxed">
        {document.blocks.map((block, index) => {
          const key = `${block.type}-${index}`;
          if (block.type === "heading") {
            return block.level === 3 ? (
              <h3 key={key} className="type-subheading mt-4">
                {block.text}
              </h3>
            ) : (
              <h2 key={key} className="type-heading mt-8 text-xl">
                {block.text}
              </h2>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={key} className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={key} className="text-muted-foreground">
              <Runs text={block.text} />
            </p>
          );
        })}
      </div>
    </div>
  );
}
