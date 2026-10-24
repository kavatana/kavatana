#!/bin/bash
# General, read-only macOS inventory. No network calls or software installation.
# The sole mutation is a new private output directory and inventory.txt in PWD.
set -euo pipefail
export LC_ALL=C
umask 077

if [[ $# -eq 1 && ( "$1" == "--help" || "$1" == "-h" ) ]]; then
  printf '%s\n' 'Usage: /bin/bash mac_inventory.sh' \
    'Collects OS, chip, CPU counts, memory, available disk and aggregate memory state.' \
    'No downloads, sudo, network, serial numbers, account names or process lists.' \
    'Writes inventory.txt in a new private chnai-mac-check-* folder in the current directory.'
  exit 0
fi
if [[ $# -ne 0 ]]; then
  printf '%s\n' 'Unexpected arguments. Use --help.' >&2
  exit 2
fi
if [[ "$(/usr/bin/uname -s)" != "Darwin" ]]; then
  printf '%s\n' 'Not run: this inventory must be run on the actual Mac. No result folder created.' >&2
  exit 3
fi

chnai_stamp=$(/bin/date -u '+%Y%m%dT%H%M%SZ')
chnai_result_dir=$(/usr/bin/mktemp -d "${PWD}/chnai-mac-check-${chnai_stamp}-XXXXXX")
chnai_report="${chnai_result_dir}/inventory.txt"

chnai_read_sysctl() {
  local chnai_key="$1"
  local chnai_value
  if chnai_value=$(/usr/sbin/sysctl -n "$chnai_key" 2>/dev/null); then
    printf '%s: %s\n' "$chnai_key" "$chnai_value"
  else
    printf '%s: unavailable\n' "$chnai_key"
  fi
}

{
  printf '%s\n' 'CHNAI - actual Mac inventory (not a benchmark)'
  printf 'Captured UTC: %s\n\n' "$chnai_stamp"
  /usr/bin/sw_vers
  printf '\nProcess architecture: %s\n' "$(/usr/bin/uname -m)"
  chnai_read_sysctl hw.model
  chnai_read_sysctl machdep.cpu.brand_string
  chnai_read_sysctl hw.memsize
  chnai_read_sysctl hw.physicalcpu
  chnai_read_sysctl hw.logicalcpu
  chnai_read_sysctl sysctl.proc_translated
  printf '\nSelected GPU fields (display identifiers excluded):\n'
  if [[ -x /usr/sbin/system_profiler ]]; then
    /usr/sbin/system_profiler SPDisplaysDataType -detailLevel mini 2>/dev/null \
      | /usr/bin/awk '/Chipset Model:|Total Number of Cores:|Metal Support:/ {sub(/^[[:space:]]+/, ""); print}' \
      || printf '%s\n' 'GPU fields unavailable; inspect About This Mac manually.'
  else
    printf '%s\n' 'GPU fields unavailable.'
  fi
  printf '\nAvailable storage on the output volume:\n'
  /bin/df -k "$chnai_result_dir" \
    | /usr/bin/awk 'NR == 2 {printf "Available_1KiB_blocks: %s\nAvailable_GiB_approx: %.2f\n", $4, $4/1048576}'
  printf '\nAggregate memory snapshot (includes VM page size):\n'
  /usr/bin/vm_stat || printf '%s\n' 'vm_stat unavailable'
  printf '\nSystem swap snapshot:\n'
  /usr/sbin/sysctl vm.swapusage || printf '%s\n' 'Swap snapshot unavailable'
  printf '\nManual fields to add before sharing:\n'
  printf '%s\n' \
    'Power: plugged in / battery / unknown' \
    'Low Power Mode: on / off / unknown' \
    'Activity Monitor Memory Pressure: green / yellow / red / unknown' \
    'Normal workload (generic description, no private names):' \
    'Browser name/version and zoom if known:' \
    'Notes:' \
    '' \
    'A nonzero swap value is not, by itself, a failure.' \
    'Unknown fields remain unknown. This record does not pass G02 or G09.'
} > "$chnai_report"

printf 'Saved locally: %s\n' "$chnai_report"
printf '%s\n' 'Review the text before sharing. No data was sent.'
