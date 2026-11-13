"""Build or verify the distributable Agent Skill ZIP."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, BadZipFile, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "learning-coach"
ARCHIVE = ROOT / "dist" / "learning-coach.zip"
SKILL_FILES = (
    "SKILL.md",
    "agents/openai.yaml",
    "assets/antibody-question.html",
    "references/project-instructions.md",
    "references/question-format.md",
    "references/whole-subject-learning.md",
    "scripts/test_question_card.cjs",
    "templates/goal-contract.md",
    "templates/progress-log.md",
)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="verify the existing ZIP")
    args = parser.parse_args()

    try:
        files = {
            f"{SKILL.name}/{name}": (SKILL / name).read_bytes()
            for name in SKILL_FILES
        }
        if not args.check:
            ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
            with ZipFile(ARCHIVE, "w") as archive:
                for name, content in files.items():
                    entry = ZipInfo(name)
                    entry.external_attr = 0o100644 << 16
                    archive.writestr(entry, content, compress_type=ZIP_DEFLATED)

        with ZipFile(ARCHIVE) as archive:
            if sorted(archive.namelist()) != sorted(files):
                parser.exit(1, "Archive entries differ from the skill files. Rebuild the ZIP.\n")
            for name, content in files.items():
                if archive.read(name) != content:
                    parser.exit(1, f"Archive content differs from the source: {name}.\n")
    except (OSError, BadZipFile) as error:
        parser.exit(1, f"Could not package or verify the skill: {error}\n")

    print(f"Verified {len(files)} files in {ARCHIVE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
