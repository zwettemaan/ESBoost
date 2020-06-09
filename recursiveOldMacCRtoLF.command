#!/bin/bash
export scriptDir=`dirname "$0"`
cd "$scriptDir"
export scriptDir=`pwd`

# Find all CR, LF, CRLF and replace them with just LF
# Find all Unicode UTF-8 BOM markers and remove them. We process the file as plain text,
# (i.e. not UTF-8) so Perl won't decode the UTF-8 multi-char sequences, and we use a hex 
# string to grab and remove the UTF-8 BOM.

find . -name "*.jsx" | while read a; do 
  perl -p -e 's/\r\n|\n|\r/\n/g;s/^\xEF\xBB\xBF//' < "$a" > "$a.clean"
  diff "$a" "$a.clean" 2>&1 > /dev/null
  export result=$?
  if [ $result == "0" ]; then
    echo "No change in " $a
    rm "$a.clean"
  else 
    echo "Cleaned up " $a
    mv "$a.clean" "$a"
  fi
done
