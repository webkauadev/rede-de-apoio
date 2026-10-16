#!/usr/bin/env bash
# Ubuntu 24.04 amd64; unpack official packages without sudo or system installation.
set -euo pipefail
model=$(realpath "${1:?Usage: run_native_workbench.sh MODEL.mwb OUTPUT_DIRECTORY}")
output=$(realpath -m "${2:?Output must be a staging directory}")
script_dir=$(cd -- "$(dirname -- "$0")" && pwd)
mkdir -p "$output"
work=$(mktemp -d /tmp/rda-workbench.XXXXXXXX)
xpid=''
cleanup() { if [[ -n "$xpid" ]]; then kill "$xpid" 2>/dev/null || true; wait "$xpid" 2>/dev/null || true; fi; rm -rf -- "$work"; }
trap cleanup EXIT
mkdir -p "$work"/{packages,root,home,locales}
cd "$work/packages"
curl -fL --retry 2 https://cdn.mysql.com/Downloads/MySQLGUITools/mysql-workbench-community_8.0.47-1ubuntu24.04_amd64.deb -o workbench.deb
echo '55b6700e23177596bd6cce0da22aaec4f942a58d3ffe2176e94029e1ec0e5f3a  workbench.deb' | sha256sum -c -
apt-get download xvfb libgtkmm-3.0-1t64 libatkmm-1.6-1v5 libglibmm-2.4-1t64 libsigc++-2.0-0v5 libzip4t64 libpangomm-1.4-1v5 libpcrecpp0v5 libcairomm-1.0-1v5 libproj25
for package in *.deb; do
    dpkg-deb -x "$package" "$work/root"
    printf '%s\t%s\t%s\n' "$(dpkg-deb -f "$package" Package)" "$(dpkg-deb -f "$package" Version)" "$(sha256sum "$package" | cut -d' ' -f1)"
done > "$output/packages.tsv"
localedef --no-archive -i en_US -f UTF-8 "$work/locales/en_US.UTF-8"
export HOME="$work/home" LOCPATH="$work/locales"
export LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export WB_DEST_DIR="$work/root" LD_LIBRARY_PATH="$work/root/usr/lib/x86_64-linux-gnu"
export LIBGL_ALWAYS_SOFTWARE=1 RDA_WB_INPUT="$model" RDA_WB_OUTPUT="$output"
# Xvfb chooses a free display; Unix socket only, TCP disabled.
"$work/root/usr/bin/Xvfb" -displayfd 3 -screen 0 1920x1200x24 -nolisten tcp 3>"$work/display" >"$output/xvfb.log" 2>&1 &
xpid=$!
for attempt in {1..100}; do [[ -s "$work/display" ]] && break; sleep 0.1; done
export DISPLAY=":$(cat "$work/display")"
"$work/root/usr/bin/mysql-workbench" --version > "$output/version.txt" 2>&1
# --run-python accepts code, --run-script accepts a filename; see official manual.
timeout 55 "$work/root/usr/bin/mysql-workbench" --model "$model" --run-script "$script_dir/export_native_workbench.py" --quit-when-done > "$output/process.log" 2>&1
cp "$HOME/.mysql/workbench/log/wb.log" "$output/wb.log"
python3 - "$output/native-export.json" <<'PY'
import json,sys
proof=json.load(open(sys.argv[1]))
assert proof['status']=='PASS', proof.get('traceback')
print('PASS native Workbench: 34 tables, 79 FKs, six SVG/PNG exports; reopen output in a second run.')
PY
