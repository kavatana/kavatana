"""Use SQLite's online backup API; never copy only a live WAL database file."""
import argparse
import sys
from pathlib import Path
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / 'api/src'))
from chnai_api.store import Store
parser = argparse.ArgumentParser()
parser.add_argument('destination', type=Path)
parser.add_argument('--database', type=Path, default=root / '.runtime/chnai.sqlite3')
args = parser.parse_args()
if not args.database.is_file():
    parser.error('Existing database not found; refusing to create an empty source.')
print(Store(args.database).backup(args.destination))
