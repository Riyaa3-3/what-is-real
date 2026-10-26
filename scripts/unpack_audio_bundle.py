#!/usr/bin/env python3
"""Unpack the nine owner-approved MP3s from a single uploaded GitHub ZIP.

The audio is copied only into known public/audio paths. Hash checks make it
impossible for an arbitrary ZIP to inject extra files into the site build.
"""
import hashlib
from pathlib import Path
from zipfile import ZipFile, BadZipFile

BUNDLE = Path("WHAT_IS_REAL_V2_audio_for_GitHub.zip")
APPROVED_SHA256 = {
    "public/audio/background/atmosphere-loop.mp3": "27c5fa1fcfdde176b70b654eaca4ea9665f61e1a97100fca53243dd0d0d4aa1a",
    "public/audio/baseline/cells-01-institution.mp3": "8fe89102c1d0ba3702b608cb17f7c8c241e7fea2125b47bb01548ffa12692260",
    "public/audio/baseline/cells-02-cell.mp3": "afe78ceb003a099bc33607ff6471d1087741f5b27ba3d39ffc79addf66e97206",
    "public/audio/baseline/cells-03-duties.mp3": "85c3225fe640f08d732ce240314a077f8f624a0fe94caafebd6c3cee0e623a04",
    "public/audio/baseline/interlinked-01-hold-hand.mp3": "ba24abcff130c353b3edb30c864dcab2da85983e376971dff3925e3391ed8aa7",
    "public/audio/baseline/interlinked-02-finger.mp3": "dfa62482dbca3714f7398229f07b5742a332a581327a771083fc029d6bda62fc",
    "public/audio/baseline/interlinked-03-heart.mp3": "64fff97499077f861abfc3ad0d83a2dabcada6a06bfe3f99a5ec17fcbed5f452",
    "public/audio/baseline/interlinked-04-dream.mp3": "ba8f79a7cf6da2bce94cec08cdc7361d3d40fb7894927ee64068a5a9658648d1",
    "public/audio/baseline/within-cells-interlinked.mp3": "6d9ca8ceb1bb7db96232b45bf76a5186265ebf1a59da30fb8a911cb987a4aba1",
}
OPTIONAL_METADATA = "public/audio/TRACK_MANIFEST.json"


def prepare() -> None:
    if not BUNDLE.is_file():
        print("No approved audio ZIP uploaded yet. Build remains playable with the browser-local audio pack.")
        return
    if BUNDLE.stat().st_size > 12_000_000:
        raise ValueError("Unexpected audio ZIP size; release cancelled.")
    try:
        with ZipFile(BUNDLE) as archive:
            files = archive.namelist()
            if len(files) != len(set(files)):
                raise ValueError("Audio bundle contains duplicate entries.")
            present = set(files)
            if present - {OPTIONAL_METADATA} != set(APPROVED_SHA256):
                raise ValueError("Audio ZIP does not contain exactly the nine approved MP3 files.")
            validated = {}
            for path, digest in APPROVED_SHA256.items():
                info = archive.getinfo(path)
                if not 1000 < info.file_size < 8_000_000:
                    raise ValueError(f"Unexpected audio size: {path}")
                content = archive.read(path)
                if hashlib.sha256(content).hexdigest() != digest:
                    raise ValueError(f"Audio differs from the approved file: {path}")
                validated[path] = content
    except BadZipFile as exc:
        raise ValueError("The uploaded soundtrack is not a valid ZIP file.") from exc
    for path, content in validated.items():
        destination = Path(path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)
        print(f"Verified and installed {destination}: {len(content)} bytes")
    print("All 9 approved soundtracks installed for this production build.")


if __name__ == "__main__":
    prepare()
