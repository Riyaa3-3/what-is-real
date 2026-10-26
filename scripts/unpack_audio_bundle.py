#!/usr/bin/env python3
"""Unpack the nine owner-approved MP3s from the original user audio pack or ZIP.

The audio is copied only into known public/audio paths. Hash checks make it
impossible for an arbitrary ZIP to inject extra files into the site build.
"""
import hashlib
import json
import struct
from pathlib import Path
from zipfile import ZipFile, BadZipFile

BUNDLE = Path("WHAT_IS_REAL_V2_audio_for_GitHub.zip")
LOCAL_PACK = Path("WHAT_IS_REAL_audio_pack.wiraudio")
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


def read_zip() -> dict[str, bytes]:
    if BUNDLE.stat().st_size > 12_000_000:
        raise ValueError("Unexpected audio ZIP size; release cancelled.")
    try:
        with ZipFile(BUNDLE) as archive:
            names = archive.namelist()
            if len(names) != len(set(names)):
                raise ValueError("Audio ZIP contains duplicate entries.")
            if set(names) - {OPTIONAL_METADATA} != set(APPROVED_SHA256):
                raise ValueError("ZIP must contain exactly the nine approved MP3 paths.")
            return {name: archive.read(name) for name in APPROVED_SHA256}
    except BadZipFile as exc:
        raise ValueError("The uploaded soundtrack is not a valid ZIP file.") from exc


def read_local_pack() -> dict[str, bytes]:
    # The exact, previously confirmed 4.1MB WHAT_IS_REAL_audio_pack.wiraudio
    # already present on the user's computer is accepted without re-downloading.
    if not 100_000 < LOCAL_PACK.stat().st_size < 12_000_000:
        raise ValueError("Unexpected .wiraudio pack size.")
    blob = LOCAL_PACK.read_bytes()
    length = struct.unpack_from("<I", blob)[0]
    if not 40 < length < 15_000 or length + 4 >= len(blob):
        raise ValueError("Invalid audio pack header.")
    try:
        manifest = json.loads(blob[4 : 4 + length])
    except (ValueError, UnicodeDecodeError) as exc:
        raise ValueError("Audio pack manifest is unreadable.") from exc
    if manifest.get("magic") != "WHAT_IS_REAL_AUDIO_PACK_V1":
        raise ValueError("Invalid WHAT IS REAL audio pack format.")
    entries = manifest.get("files")
    if not isinstance(entries, list) or len(entries) != 9:
        raise ValueError("Audio pack must contain precisely nine tracks.")
    result = {}
    for entry in entries:
        if not isinstance(entry, dict) or not isinstance(entry.get("key"), str):
            raise ValueError("Invalid audio pack entry.")
        path = "public/audio/" + entry["key"]
        if path not in APPROVED_SHA256 or path in result:
            raise ValueError("Unexpected or duplicate audio file key.")
        offset, length = entry.get("offset"), entry.get("length")
        if type(offset) is not int or type(length) is not int or offset < 0 or length <= 0:
            raise ValueError("Invalid audio pack offset or length.")
        # Use the original encoded manifest length, never a reserialized size.
        start = 4 + struct.unpack_from("<I", blob)[0] + offset
        if start + length > len(blob):
            raise ValueError("Audio pack references data outside its payload.")
        result[path] = blob[start : start + length]
    if set(result) != set(APPROVED_SHA256):
        raise ValueError("Audio pack is incomplete.")
    return result


def prepare() -> None:
    if BUNDLE.is_file():
        validated = read_zip()
        print("Using approved ZIP soundtrack bundle.")
    elif LOCAL_PACK.is_file():
        validated = read_local_pack()
        print("Using original WHAT IS REAL audio pack; no ChatGPT ZIP download needed.")
    else:
        print("No soundtrack bundle uploaded yet. Website still supports local audio import.")
        return
    for path, expected_hash in APPROVED_SHA256.items():
        content = validated[path]
        if not 1000 < len(content) < 8_000_000:
            raise ValueError(f"Unexpected audio file size: {path}")
        if hashlib.sha256(content).hexdigest() != expected_hash:
            raise ValueError(f"Audio differs from the approved recording: {path}")
    for path, content in validated.items():
        destination = Path(path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content)
        print(f"Verified and installed {destination}: {len(content)} bytes")
    print("All nine approved audio tracks installed for this website build.")


if __name__ == "__main__":
    prepare()
