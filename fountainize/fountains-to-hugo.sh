#!/bin/bash

DB_FOUNTAINS=$(cat .env.json | jq -r '.DB_FOUNTAINS')
DB_HTML_RAW=$(cat .env.json | jq -r '.DB_HTML_RAW')
DB_FM_RAW=$(cat .env.json | jq -r '.DB_FM_RAW')
DB_HTML=$(cat .env.json | jq -r '.DB_HTML')

for F in $(ls ${DB_FOUNTAINS}*.fountain);
do
	echo "processing $F..."
  N=$(basename ${F} | tr "." " "|awk '{print $1}');
textplay <$F >$DB_HTML_RAW$N.html;
cat $DB_FM_RAW$N.json>${DB_HTML}$N.html;
cat $DB_HTML_RAW$N.html>>${DB_HTML}$N.html
done
