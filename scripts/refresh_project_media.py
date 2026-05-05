from __future__ import annotations

from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public" / "projects"
DOC_PATH = ROOT / "docs" / "project-image-sources.md"


PROJECTS = [
    {
        "title": "Dub",
        "repo": "dubinc/dub",
        "source_page": "https://dub.co",
        "image_url": "https://assets.dub.co/thumbnail.png",
        "filename": "dub.png",
    },
    {
        "title": "Formbricks",
        "repo": "formbricks/formbricks",
        "source_page": "https://github.com/formbricks/formbricks",
        "image_url": "https://github-production-user-asset-6210df.s3.amazonaws.com/675065/249441967-ccb89ea3-82b4-4bf2-8d2c-528721ec313b.png",
        "filename": "formbricks.png",
    },
    {
        "title": "Chatwoot",
        "repo": "chatwoot/chatwoot",
        "source_page": "https://github.com/chatwoot/chatwoot",
        "image_url": "https://raw.githubusercontent.com/chatwoot/chatwoot/master/.github/screenshots/dashboard.png",
        "filename": "chatwoot.png",
    },
    {
        "title": "Papermark",
        "repo": "mfts/papermark",
        "source_page": "https://www.papermark.com",
        "image_url": "https://img.papermarkassets.com/upload/file_7u55u1oLqErWJhWGRkFFVF-document-analytics-Papermark.png",
        "filename": "papermark.png",
    },
    {
        "title": "Cal.com",
        "repo": "calcom/cal.com",
        "source_page": "https://github.com/calcom/cal.com",
        "image_url": "https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png",
        "filename": "calcom.png",
    },
    {
        "title": "Twenty",
        "repo": "twentyhq/twenty",
        "source_page": "https://github.com/twentyhq/twenty",
        "image_url": "https://raw.githubusercontent.com/twentyhq/twenty/main/packages/twenty-website-new/public/images/readme/v2-build-apps-light.png",
        "filename": "twenty.png",
    },
    {
        "title": "Memos",
        "repo": "usememos/memos",
        "source_page": "https://github.com/usememos/memos",
        "image_url": "https://raw.githubusercontent.com/usememos/.github/refs/heads/main/assets/demo.png",
        "filename": "memos.png",
    },
    {
        "title": "AppFlowy",
        "repo": "appflowy-io/AppFlowy",
        "source_page": "https://github.com/AppFlowy-IO/appflowy",
        "image_url": "https://appflowy.com/_next/static/media/tasks.796c753e.png",
        "filename": "appflowy.png",
    },
    {
        "title": "React Hook Form",
        "repo": "react-hook-form/react-hook-form",
        "source_page": "https://react-hook-form.com",
        "image_url": "https://react-hook-form.com/images/react-hook-form-og.png",
        "filename": "react-hook-form.png",
    },
    {
        "title": "TanStack Query",
        "repo": "TanStack/query",
        "source_page": "https://tanstack.com/query/latest",
        "image_url": "https://raw.githubusercontent.com/TanStack/query/main/media/header_query.png",
        "filename": "tanstack-query.png",
    },
    {
        "title": "shadcn/ui",
        "repo": "shadcn-ui/ui",
        "source_page": "https://ui.shadcn.com",
        "image_url": "https://ui.shadcn.com/og?title=The%20Foundation%20for%20your%20Design%20System&description=A%20set%20of%20beautifully%20designed%20components%20that%20you%20can%20customize%2C%20extend%2C%20and%20build%20on.%20Start%20here%20then%20make%20it%20your%20own.%20Open%20Source.%20Open%20Code.",
        "filename": "shadcn-ui.png",
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
