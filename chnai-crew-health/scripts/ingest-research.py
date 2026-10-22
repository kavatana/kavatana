"""Verify/import the allowlisted retained research files, without network access."""
import argparse
import json
import sys
from pathlib import Path
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / 'api/src'))
from chnai_api.engine import DomainError
from chnai_api.research import ResearchStore
parser = argparse.ArgumentParser()
parser.add_argument('--directory', type=Path, default=root / '.runtime/chnai.research')
parser.add_argument('--inspect-only', action='store_true', help='Show catalog/latest import without importing files')
args = parser.parse_args()
store = ResearchStore(args.directory)
try:
    result = store.overview() if args.inspect_only else store.import_retained()
    print(json.dumps(result, indent=2))
except DomainError as error:
    print(json.dumps({'error': error.code, 'message': error.message, 'attemptId': getattr(error, 'attempt_id', None)}))
    sys.exit(1)
