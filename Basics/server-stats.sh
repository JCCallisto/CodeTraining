
#!/usr/bin/env bash
#
# server-stats.sh - Basic server performance statistics for any Linux server.
#
# Usage:  ./server-stats.sh
#         sudo ./server-stats.sh   (recommended: enables failed-login stats)
#
# Reports:
#   - Total CPU usage
#   - Memory usage (used vs free, with percentages)
#   - Disk usage (used vs free, with percentages)
#   - Top 5 processes by CPU and by memory
#   - Extras: OS/kernel, uptime, load average, logged-in users, failed logins
 
set -u
export LC_ALL=C   # predictable number/text formatting for parsing
 
# ---------- helpers ----------------------------------------------------------
 
have() { command -v "$1" >/dev/null 2>&1; }
 
header() {
    printf '\n\033[1;36m==== %s ====\033[0m\n' "$1"
}
 
# Convert a value in KiB to a human-readable string (KiB -> MiB/GiB/TiB).
human_kib() {
    awk -v k="$1" 'BEGIN {
        split("KiB MiB GiB TiB PiB", u, " ")
        i = 1
        while (k >= 1024 && i < 5) { k /= 1024; i++ }
        printf "%.2f %s", k, u[i]
    }'
}
 
# percentage of a/b, safe against division by zero
pct() { awk -v a="$1" -v b="$2" 'BEGIN { printf "%.1f", (b > 0) ? a * 100 / b : 0 }'; }
 
# ---------- system info (stretch) --------------------------------------------
 
system_info() {
    header "System Information"
 
    local os="Unknown"
    if [ -r /etc/os-release ]; then
        # shellcheck disable=SC1091
        os=$(. /etc/os-release && printf '%s' "${PRETTY_NAME:-${NAME:-Unknown}}")
    fi
 
    printf 'Hostname      : %s\n' "$(hostname 2>/dev/null || uname -n)"
    printf 'OS version    : %s\n' "$os"
    printf 'Kernel        : %s\n' "$(uname -r)"
    printf 'Architecture  : %s\n' "$(uname -m)"
 
    if have uptime && uptime -p >/dev/null 2>&1; then
        printf 'Uptime        : %s\n' "$(uptime -p | sed 's/^up //')"
    elif [ -r /proc/uptime ]; then
        awk '{ s=int($1); printf "Uptime        : %dd %dh %dm\n", s/86400, (s%86400)/3600, (s%3600)/60 }' /proc/uptime
    fi
 
    if [ -r /proc/loadavg ]; then
        read -r l1 l5 l15 _ < /proc/loadavg
        printf 'Load average  : %s (1m)  %s (5m)  %s (15m)\n' "$l1" "$l5" "$l15"
    fi
}
 
# ---------- CPU --------------------------------------------------------------
 
cpu_usage() {
    header "CPU Usage"
 
    if [ ! -r /proc/stat ]; then
        echo "Cannot read /proc/stat"
        return
    fi
 
    # Sample /proc/stat twice, 1 second apart, and compare the deltas.
    # Fields: user nice system idle iowait irq softirq steal
    local u1 n1 s1 i1 w1 q1 sq1 st1 u2 n2 s2 i2 w2 q2 sq2 st2
    read -r _ u1 n1 s1 i1 w1 q1 sq1 st1 _ < /proc/stat
    sleep 1
    read -r _ u2 n2 s2 i2 w2 q2 sq2 st2 _ < /proc/stat
 
    local idle1=$((i1 + w1))
    local idle2=$((i2 + w2))
    local total1=$((u1 + n1 + s1 + i1 + w1 + q1 + sq1 + st1))
    local total2=$((u2 + n2 + s2 + i2 + w2 + q2 + sq2 + st2))
 
    local dtotal=$((total2 - total1))
    local didle=$((idle2 - idle1))
 
    local usage idle_pct
    usage=$(pct $((dtotal - didle)) "$dtotal")
    idle_pct=$(pct "$didle" "$dtotal")
 
    printf 'CPU cores     : %s\n' "$(nproc 2>/dev/null || grep -c '^processor' /proc/cpuinfo)"
    printf 'Total usage   : %s%%\n' "$usage"
    printf 'Idle          : %s%%\n' "$idle_pct"
}
 
# ---------- memory -----------------------------------------------------------
 
memory_usage() {
    header "Memory Usage"
 
    if [ ! -r /proc/meminfo ]; then
        echo "Cannot read /proc/meminfo"
        return
    fi
 
    local total avail used
    total=$(awk '/^MemTotal:/ {print $2}' /proc/meminfo)
    avail=$(awk '/^MemAvailable:/ {print $2}' /proc/meminfo)
 
    # Very old kernels lack MemAvailable; approximate it.
    if [ -z "$avail" ]; then
        avail=$(awk '/^(MemFree|Buffers|Cached):/ {s+=$2} END {print s}' /proc/meminfo)
    fi
 
    used=$((total - avail))
 
    printf 'Total         : %s\n' "$(human_kib "$total")"
    printf 'Used          : %s (%s%%)\n' "$(human_kib "$used")" "$(pct "$used" "$total")"
    printf 'Free          : %s (%s%%)   [available, incl. reclaimable cache]\n' \
        "$(human_kib "$avail")" "$(pct "$avail" "$total")"
 
    local swap_total swap_free swap_used
    swap_total=$(awk '/^SwapTotal:/ {print $2}' /proc/meminfo)
    swap_free=$(awk '/^SwapFree:/ {print $2}' /proc/meminfo)
    if [ "${swap_total:-0}" -gt 0 ]; then
        swap_used=$((swap_total - swap_free))
        printf 'Swap          : %s used of %s (%s%%)\n' \
            "$(human_kib "$swap_used")" "$(human_kib "$swap_total")" "$(pct "$swap_used" "$swap_total")"
    fi
}
 
# ---------- disk -------------------------------------------------------------
 
disk_usage() {
    header "Disk Usage (all local filesystems)"
 
    # -P: POSIX output (one line per fs). Skip pseudo/virtual filesystems.
    # Only count each underlying device once (bind mounts, btrfs subvolumes).
    local out
    out=$(df -P -k -x tmpfs -x devtmpfs -x squashfs -x overlay -x efivarfs 2>/dev/null) \
        || out=$(df -P -k 2>/dev/null)
 
    if [ -z "$out" ]; then
        echo "df not available"
        return
    fi
 
    local totals total used free
    totals=$(printf '%s\n' "$out" | awk 'NR > 1 && $1 ~ /^\// && !seen[$1]++ {
        t += $2; u += $3; f += $4
    } END { printf "%d %d %d", t, u, f }')
    read -r total used free <<< "$totals"
 
    # Like df's Use%, measure against used+available so the two percentages
    # add up to 100% (filesystems reserve some blocks, e.g. ext4's 5% for root).
    total=$((used + free))
 
    printf 'Total         : %s\n' "$(human_kib "$total")"
    printf 'Used          : %s (%s%%)\n' "$(human_kib "$used")" "$(pct "$used" "$total")"
    printf 'Free          : %s (%s%%)\n' "$(human_kib "$free")" "$(pct "$free" "$total")"
 
    printf '\nPer filesystem:\n'
    printf '%s\n' "$out" | awk 'NR == 1 { next }
        $1 ~ /^\// && !seen[$1]++ { printf "  %-24s %-8s used  %s\n", $6, $5, $1 }'
}
 
# ---------- top processes ----------------------------------------------------
 
top_processes() {
    if ! have ps; then
        header "Top Processes"
        echo "ps not available"
        return
    fi
 
    header "Top 5 Processes by CPU Usage"
    ps -eo pid,user:12,pcpu,pmem,comm --sort=-pcpu 2>/dev/null | head -n 6 \
        | awk 'NR == 1 { printf "%-8s %-12s %6s %6s  %s\n", "PID", "USER", "%CPU", "%MEM", "COMMAND"; next }
               { printf "%-8s %-12s %6s %6s  %s\n", $1, $2, $3, $4, $5 }'
 
    header "Top 5 Processes by Memory Usage"
    ps -eo pid,user:12,pcpu,pmem,comm --sort=-pmem 2>/dev/null | head -n 6 \
        | awk 'NR == 1 { printf "%-8s %-12s %6s %6s  %s\n", "PID", "USER", "%CPU", "%MEM", "COMMAND"; next }
               { printf "%-8s %-12s %6s %6s  %s\n", $1, $2, $3, $4, $5 }'
}
 
# ---------- users & security (stretch) ---------------------------------------
 
users_and_logins() {
    header "Logged-in Users"
    if have who; then
        local n
        n=$(who | wc -l)
        printf 'Active sessions: %s\n' "$n"
        if [ "$n" -gt 0 ]; then
            who | awk '{ printf "  %-12s %-8s since %s %s\n", $1, $2, $3, $4 }'
        fi
    else
        echo "who not available"
    fi
 
    header "Failed Login Attempts"
    local count=""
 
    if have lastb && lastb -n 1 >/dev/null 2>&1; then
        count=$(lastb 2>/dev/null | grep -Evc '^$|^btmp begins')
        printf 'Failed logins (btmp): %s\n' "$count"
    else
        local logfile
        for logfile in /var/log/auth.log /var/log/secure; do
            if [ -r "$logfile" ]; then
                count=$(grep -c 'Failed password' "$logfile" 2>/dev/null)
                printf 'Failed password entries in %s: %s\n' "$logfile" "$count"
                break
            fi
        done
    fi
 
    if [ -z "$count" ]; then
        if have journalctl && journalctl -q -n 1 >/dev/null 2>&1; then
            count=$(journalctl -q --since "7 days ago" 2>/dev/null | grep -c 'Failed password')
            printf 'Failed password entries (journal, last 7 days): %s\n' "$count"
        else
            echo "Unavailable (try running with sudo)"
        fi
    fi
}
 
# ---------- main -------------------------------------------------------------
 
main() {
    if [ "$(uname -s)" != "Linux" ]; then
        echo "This script only supports Linux." >&2
        exit 1
    fi
 
    printf '\033[1mServer Performance Stats\033[0m - %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')"
 
    system_info
    cpu_usage
    memory_usage
    disk_usage
    top_processes
    users_and_logins
    echo
}
 
main "$@"