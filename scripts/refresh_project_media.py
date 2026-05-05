from __future__ import annotations

from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public" / "projects"
DOC_PATH = ROOT / "docs" / "project-image-sources.md"


PROJECTS = [
    {
        "title": "Dify",
        "repo": "langgenius/dify",
        "source_page": "https://github.com/langgenius/dify",
        "image_url": "https://raw.githubusercontent.com/langgenius/dify/main/images/GitHub_README_if.png",
        "filename": "dify.png",
    },
    {
        "title": "RAGFlow",
        "repo": "infiniflow/ragflow",
        "source_page": "https://github.com/infiniflow/ragflow",
        "image_url": "https://raw.githubusercontent.com/infiniflow/ragflow-docs/refs/heads/image/image/ragflow-octoverse.png",
        "filename": "ragflow.png",
    },
    {
        "title": "n8n",
        "repo": "n8n-io/n8n",
        "source_page": "https://github.com/n8n-io/n8n",
        "image_url": "https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png",
        "filename": "n8n.png",
    },
    {
        "title": "Appsmith",
        "repo": "appsmithorg/appsmith",
        "source_page": "https://www.appsmith.com",
        "image_url": "https://images.ctfassets.net/lpvian6u6i39/7H0JO69qvMnaWyjVwT06NZ/c12ccb59485642991f2d528a4d3d9204/conversion_panel.webp",
        "filename": "appsmith.webp",
    },
    {
        "title": "ToolJet",
        "repo": "ToolJet/ToolJet",
        "source_page": "https://github.com/ToolJet/ToolJet",
        "image_url": "https://user-images.githubusercontent.com/7828962/211444352-4d6d2e4a-13c9-4980-9e16-4aed4af9811b.png",
        "filename": "tooljet.png",
    },
    {
        "title": "Flagsmith",
        "repo": "Flagsmith/flagsmith",
        "source_page": "https://github.com/Flagsmith/flagsmith",
        "image_url": "https://raw.githubusercontent.com/Flagsmith/flagsmith/main/static-files/screenshot.png",
        "filename": "flagsmith.png",
    },
    {
        "title": "Plane",
        "repo": "makeplane/plane",
        "source_page": "https://github.com/makeplane/plane",
        "image_url": "https://media.docs.plane.so/GitHub-readme/github-work-items.webp",
        "filename": "plane.webp",
    },
    {
        "title": "OneUptime",
        "repo": "OneUptime/oneuptime",
        "source_page": "https://github.com/OneUptime/oneuptime",
        "image_url": "https://raw.githubusercontent.com/OneUptime/oneuptime/master/Home/Static/img/readme/monitoring.png",
        "filename": "oneuptime.png",
    },
    {
        "title": "Metabase",
        "repo": "metabase/metabase",
        "source_page": "https://github.com/metabase/metabase",
        "image_url": "https://www.metabase.com/images/metabase-product-screenshot-updated.png",
        "filename": "metabase.png",
    },
    {
        "title": "Cal.com",
        "repo": "calcom/cal.com",
        "source_page": "https://github.com/calcom/cal.com",
        "image_url": "https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png",
        "filename": "calcom.png",
    },
    {
        "title": "Squads Protocol v4",
        "repo": "Squads-Protocol/v4",
        "source_page": "https://github.com/Squads-Protocol/v4",
        "image_url": "https://user-images.githubusercontent.com/81624955/182874414-98d63f58-450d-4520-a440-4bfda8f5329f.png",
        "filename": "squads-v4.png",
    },
]


def download_file(url: str, destination: Path) -> None:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=60) as response:
        destination.write_bytes(response.read())


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    DOC_PATH.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        "# Project Image Sources",
        "",
        "These project images are cached locally into `public/projects` and sourced from official repo README assets or official product sites.",
        "",
    ]

    for project in PROJECTS:
        target = PUBLIC_DIR / project["filename"]
        download_file(project["image_url"], target)
        lines.append(
            f"- **{project['title']}** (`{project['repo']}`): repo {project['source_page']} | image {project['image_url']}"
        )

    DOC_PATH.write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
