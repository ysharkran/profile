from __future__ import annotations

import re
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
PUBLIC_BLOG_DIR = ROOT / "public" / "blog"
SOURCES_DOC = ROOT / "docs" / "blog-image-sources.md"


IMAGE_SOURCES = {
    "better-observability-for-teams-that-move-fast": "https://unsplash.com/photos/server-rack-with-blinking-green-lights-VHmBX7FnXw0",
    "building-portfolio-projects-that-look-like-product-work": "https://unsplash.com/photos/developer-working-on-multiple-screens-in-a-dark-office-v9iowyOH7QQ",
    "debugging-async-javascript-without-guesswork": "https://unsplash.com/photos/hands-typing-on-a-laptop-with-code-on-screen-Bn4L8oSTIjc",
    "designing-ai-features-people-can-actually-trust": "https://unsplash.com/photos/open-laptop-with-code-on-screen-neon-lighting-RdeKfL3w344",
    "designing-review-loops-for-llm-automation": "https://unsplash.com/photos/team-collaborating-around-a-whiteboard-in-a-modern-office-K0aM-ztA76Q",
    "event-driven-workflows-without-turning-systems-into-puzzles": "https://unsplash.com/photos/a-rack-of-servers-in-a-server-room-2JJ3wBHu4_0",
    "fast-apis-without-cleverness-debt": "https://unsplash.com/photos/coding-on-a-dark-theme-computer-screen-9-U8xW54Le0",
    "feature-flags-as-an-engineering-safety-system": "https://unsplash.com/photos/a-modern-laptop-displaying-a-dark-themed-dashboard-6-0ajRI1cgs",
    "from-prototype-to-platform-growing-a-python-service-safely": "https://unsplash.com/photos/a-computer-monitor-displaying-text-in-a-dimly-lit-room-syUMhuT40X0",
    "how-i-evaluate-a-nextjs-architecture": "https://unsplash.com/photos/architectural-blueprints-spread-out-on-a-surface-fNxmdlYHRm8",
    "how-i-review-pull-requests-in-high-context-codebases": "https://unsplash.com/photos/a-computer-desk-with-lamps-and-post-it-notes-gyjvB5A5PPs",
    "how-i-think-about-reliability-in-payment-flows": "https://unsplash.com/photos/laptop-phone-and-coins-on-a-green-surface-29KolnrEtDY",
    "making-dashboards-useful-instead-of-decorative": "https://unsplash.com/photos/laptop-and-phone-displaying-financial-data-_rAKDw1Fd54",
    "practical-caching-for-full-stack-apps": "https://unsplash.com/photos/black-imgix-server-system-pgdaAwf6IJg",
    "refactoring-nodejs-services-without-freezing-delivery": "https://unsplash.com/photos/person-typing-on-a-laptop-with-code-displayed-43d76nNY2YU",
    "remote-engineering-habits-that-scale-across-time-zones": "https://unsplash.com/photos/laptop-screen-shows-a-video-conference-with-multiple-participants-LCDQCcENnc8",
    "rust-on-solana-where-performance-actually-matters": "https://unsplash.com/photos/an-electrical-device-laying-on-top-of-a-blueprint-Gz5eVQzkNrs",
    "shipping-internal-tools-people-want-to-open-again": "https://unsplash.com/photos/a-man-sitting-in-front-of-a-laptop-computer-0c_Y8Xbkbi4",
    "taming-react-state-before-it-turns-into-architecture": "https://unsplash.com/photos/computer-screens-displaying-code-with-neon-lighting-WD7S-Lz12Es",
    "the-gap-between-ai-demos-and-ai-products": "https://unsplash.com/photos/desk-with-multiple-computer-monitors-and-plants-thpCFCYfoqA",
    "the-real-cost-of-weak-api-boundaries": "https://unsplash.com/photos/7ZhvsCAOERs",
    "what-changed-my-mind-about-microservices": "https://unsplash.com/photos/two-server-racks-filled-with-electronic-components-and-wires-k27hkqXuveo",
    "when-to-use-postgres-redis-and-mongo-together": "https://unsplash.com/photos/green-and-white-electric-device-eVWWr6nmDf8",
    "why-product-engineers-should-own-data-contracts": "https://unsplash.com/photos/architectural-models-of-buildings-and-trees-on-display-XAk-tvhwaxE",
    "writing-docs-that-reduce-onboarding-time": "https://unsplash.com/photos/a-tablet-a-pen-and-a-notebook-on-a-desk-qJzbSan66Rk",
    "writing-tests-that-catch-regressions-instead-of-chasing-coverage": "https://unsplash.com/photos/a-desk-with-a-keyboard-mouse-cell-phone-and-notepad-2PLFgAKVpe0",
}


FRONTMATTER_IMAGE_RE = re.compile(r'^heroImage:\s*".*?"\s*$', re.MULTILINE)
PHOTO_ID_RE = re.compile(r"([A-Za-z0-9_-]{11})$")
TITLE_RE = re.compile(r'^title:\s*"(.*?)"\s*$', re.MULTILINE)


def extract_photo_id(source_url: str) -> str:
    last_segment = source_url.rstrip("/").split("/")[-1]
    match = PHOTO_ID_RE.search(last_segment)
    if not match:
        raise ValueError(f"Could not extract photo id from {source_url}")
    return match.group(1)


def download_image(source_url: str, destination: Path) -> None:
    photo_id = extract_photo_id(source_url)
    download_url = f"https://unsplash.com/photos/{photo_id}/download?force=true&w=1280"
    request = Request(download_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=60) as response:
        destination.write_bytes(response.read())


def update_frontmatter(file_path: Path, hero_path: str) -> str:
    raw = file_path.read_text()
    updated = FRONTMATTER_IMAGE_RE.sub(f'heroImage: "{hero_path}"', raw, count=1)
    file_path.write_text(updated)
    title_match = TITLE_RE.search(updated)
    return title_match.group(1) if title_match else file_path.stem


def main() -> None:
    PUBLIC_BLOG_DIR.mkdir(parents=True, exist_ok=True)
    SOURCES_DOC.parent.mkdir(parents=True, exist_ok=True)

    source_lines = [
        "# Blog Image Sources",
        "",
        "These blog hero images were sourced from public Unsplash image pages and cached locally into `public/blog`.",
        "",
    ]

    for slug, source_url in IMAGE_SOURCES.items():
        file_path = BLOG_DIR / f"{slug}.md"
        image_path = PUBLIC_BLOG_DIR / f"{slug}.jpg"
        hero_path = f"/blog/{slug}.jpg"

        if not file_path.exists():
            raise FileNotFoundError(f"Missing blog file: {file_path}")

        download_image(source_url, image_path)
        title = update_frontmatter(file_path, hero_path)
        source_lines.append(f"- **{title}**: {source_url}")

    SOURCES_DOC.write_text("\n".join(source_lines) + "\n")


if __name__ == "__main__":
    main()
