#!/usr/bin/env bash

SCRIPT_PATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

echo "Fetching the latest laji-cli tools"
docker pull luomus/laji-cli >/dev/null 2>&1

echo "Getting vieraslajit.fi translations..."
docker run --rm --env-file ${SCRIPT_PATH}/.env -v ${SCRIPT_PATH}/../src/assets/i18n:/data luomus/laji-cli \
  crowdin:get:json VIERAS \
  fi:/data/fi.json  \
  en-GB:/data/en.json \
  sv-FI:/data/sv.json

echo "All done"
