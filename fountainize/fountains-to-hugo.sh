#!/bin/bash



for F in $(ls ${DB_FOUNTAINS}f11.fountain);
do
  # N="${$(basename ${F})%.*}";
  N=$(basename ${F} | tr "." " "|awk '{print $1}');
textplay <$F >$DB_HTML_RAW$N.html;
cat $DB_FM_RAW$N.json>${DB_HTML}$N.html;
cat $DB_HTML_RAW$N.html>>${DB_HTML}$N.html
done
