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
        "title": "Open WebUI",
        "repo": "open-webui/open-webui",
        "source_page": "https://github.com/open-webui/open-webui",
        "image_url": "https://raw.githubusercontent.com/open-webui/open-webui/main/demo.png",
        "filename": "open-webui.png",
    },
    {
        "title": "Lobe Chat",
        "repo": "lobehub/lobe-chat",
        "source_page": "https://github.com/lobehub/lobe-chat",
        "image_url": "https://hub-apac-1.lobeobjects.space/blog/assets/2204cde2228fb3f583f3f2c090bc49fb.webp",
        "filename": "lobe-chat.webp",
    },
    {
        "title": "Ente",
        "repo": "ente-io/ente",
        "source_page": "https://github.com/ente-io/ente",
        "image_url": "https://raw.githubusercontent.com/ente-io/ente/main/.github/assets/photos.png",
        "filename": "ente.png",
    },
    {
        "title": "Saleor Storefront",
        "repo": "saleor/storefront",
        "source_page": "https://github.com/saleor/storefront",
        "image_url": "https://github.com/user-attachments/assets/a8e37c20-35c8-42e0-a9c5-5c0b6097b921",
        "filename": "saleor-storefront.png",
    },
    {
        "title": "Mercur B2C Storefront",
        "repo": "mercurjs/b2c-marketplace-storefront",
        "source_page": "https://github.com/mercurjs/b2c-marketplace-storefront",
        "image_url": "https://cdn.prod.website-files.com/6790aeffc4b432ccaf1b56e5/67a21bd27b4ac8b812c1d84f_B2C%20Storefront%20Cover.png",
        "filename": "mercur-storefront.png",
    },
    {
        "title": "rotki",
        "repo": "rotki/rotki",
        "source_page": "https://docs.rotki.com/latest/usage-guides/customization.html",
        "image_url": "https://docs.rotki.com/latest/images/sc_general_settings.png",
        "filename": "rotki.png",
    },
    {
        "title": "openIMIS",
        "repo": "openimis/openimis-fe_js",
        "source_page": "https://openimis.org/health-insurance",
        "image_url": "https://openimis.org/sites/default/files/2022-09/healthinsuranceworkflow.jpeg",
        "filename": "openimis-health-insurance.jpeg",
    },
    {
        "title": "Autorizz",
        "repo": "Defcon27/Autorizz-Car-Dealership-System-using-NodeJS-Express-MongoDB",
        "source_page": "https://github.com/Defcon27/Autorizz-Car-Dealership-System-using-NodeJS-Express-MongoDB",
        "image_url": "https://raw.githubusercontent.com/Defcon27/Autorizz-Car-Dealership-System-using-NodeJS-Express-MongoDB/master/docs/assets/admin_home_.png",
        "filename": "autorizz.png",
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
