import { DownloadIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router";

import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function ResumePage() {
  return (
    <div className="container-page pt-14 md:pt-20">
      <PageMeta
        title="Résumé"
        description={`${profile.name}'s résumé: design systems, frontend architecture, accessibility, and AI product surfaces.`}
      />
      <PageHeader
        kicker={<p className="type-eyebrow">Résumé</p>}
        title="Résumé"
        lede="A one-page summary of my work history, skills, and education. For the story behind the work, the case studies go further."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg">
            <a href={profile.resumePath}>
              <FileTextIcon aria-hidden="true" />
              Open the PDF
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={profile.resumePath} download>
              <DownloadIcon aria-hidden="true" />
              Download
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link to="/work" viewTransition>
              Case studies
            </Link>
          </Button>
        </div>
      </PageHeader>
    </div>
  );
}
